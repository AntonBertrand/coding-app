require("dotenv").config();
const mongoose = require("mongoose");
const { languages } = require("../data/mockData");
const Language = require("../models/Language");
const Topic = require("../models/Topic");
const Question = require("../models/Question");

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("Error: MONGODB_URI is not defined in .env file");
  process.exit(1);
}

console.log("Attempting to connect to MongoDB at:", MONGODB_URI);

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", async () => {
  console.log("Connected to MongoDB successfully");

  try {
    // Clear existing data
    console.log("Clearing existing data...");
    const deleteResults = await Promise.all([
      Language.deleteMany({}),
      Topic.deleteMany({}),
      Question.deleteMany({}),
    ]);
    console.log("Delete results:", deleteResults);

    // Migrate questions first
    console.log("Starting question migration...");
    const questionMap = new Map();
    for (const language of languages) {
      for (const topic of language.topics) {
        for (const question of topic.questions) {
          console.log(`Creating question: ${question.id}`);
          const newQuestion = new Question({
            id: question.id,
            text: question.text,
            code: question.code,
            options: question.options,
            correctOptionId: question.correctOptionId,
          });
          const savedQuestion = await newQuestion.save();
          console.log(`Saved question with _id: ${savedQuestion._id}`);
          questionMap.set(question.id, savedQuestion._id);
        }
      }
    }
    console.log(
      "Question migration completed. Total questions:",
      questionMap.size
    );

    // Migrate topics
    console.log("Starting topic migration...");
    const topicMap = new Map();
    for (const language of languages) {
      for (const topic of language.topics) {
        console.log(`Creating topic: ${topic.id}`);
        const questionIds = topic.questions.map((q) => questionMap.get(q.id));
        const newTopic = new Topic({
          id: topic.id,
          title: topic.title,
          description: topic.description,
          questions: questionIds,
        });
        const savedTopic = await newTopic.save();
        console.log(`Saved topic with _id: ${savedTopic._id}`);
        topicMap.set(topic.id, savedTopic._id);
      }
    }
    console.log("Topic migration completed. Total topics:", topicMap.size);

    // Migrate languages
    console.log("Starting language migration...");
    for (const language of languages) {
      console.log(`Creating language: ${language.id}`);
      const topicIds = language.topics.map((t) => topicMap.get(t.id));
      const newLanguage = new Language({
        id: language.id,
        name: language.name,
        icon: language.icon,
        topics: topicIds,
      });
      const savedLanguage = await newLanguage.save();
      console.log(`Saved language with _id: ${savedLanguage._id}`);
    }
    console.log("Language migration completed");

    // Verify data was saved
    const [languageCount, topicCount, questionCount] = await Promise.all([
      Language.countDocuments(),
      Topic.countDocuments(),
      Question.countDocuments(),
    ]);

    console.log("\nFinal database counts:");
    console.log(`Languages: ${languageCount}`);
    console.log(`Topics: ${topicCount}`);
    console.log(`Questions: ${questionCount}`);

    console.log("\nMigration completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Migration failed with error:", error);
    process.exit(1);
  }
});
