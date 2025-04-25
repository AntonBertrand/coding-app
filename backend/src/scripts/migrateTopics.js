require("dotenv").config();
const mongoose = require("mongoose");
const Language = require("../models/Language");
const Topic = require("../models/Topic");
const Question = require("../models/Question");

async function migrateTopics() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Get all languages
    const languages = await Language.find();
    console.log(`Found ${languages.length} languages`);

    // For each language, update its topics
    for (const language of languages) {
      console.log(`Processing language: ${language.name}`);

      // Find all topics that belong to this language using the topics array which contains ObjectIds
      const topics = await Topic.find({ _id: { $in: language.topics } });
      console.log(`Found ${topics.length} topics for ${language.name}`);

      // Update each topic with the language reference
      for (const topic of topics) {
        // If the topic already has a language reference, skip it
        if (topic.language) {
          console.log(`Topic ${topic.title} already has a language reference`);
          continue;
        }

        // Update the topic with the language reference
        topic.language = language._id;
        await topic.save();
        console.log(`Updated topic ${topic.title} with language reference`);
      }
    }

    console.log("Migration completed successfully");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    // Close the MongoDB connection
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

// Run the migration
migrateTopics();
