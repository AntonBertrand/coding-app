const express = require("express");
const router = express.Router();
const Language = require("../models/Language");
const Topic = require("../models/Topic");
const UserProgress = require("../models/UserProgress");

// Get all languages
router.get("/", async (req, res) => {
  try {
    const languages = await Language.find().populate("topics");
    const userId = req.query.userId;

    if (userId) {
      const userProgress = await UserProgress.findOne({ userId });

      if (userProgress) {
        // Map through languages and add progress for each
        const languagesWithProgress = await Promise.all(
          languages.map(async (language) => {
            // Convert Mongoose document to plain object
            const languageObj = language.toObject();

            const languageProgress = userProgress.progress.find(
              (p) => p.languageId === language.id
            );

            if (languageProgress) {
              // Calculate total topics and completed topics
              const totalTopics = language.topics.length;
              const completedTopics = languageProgress.completedTopics.filter(
                (topic) =>
                  topic.completed ||
                  (topic.completedLessons && topic.completedLessons.length > 0)
              ).length;

              // Add progress and completed topics to the language object
              languageObj.progress =
                totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0;

              // Add completed status to topics
              languageObj.topics = languageObj.topics.map((topic) => {
                const topicProgress = languageProgress.completedTopics.find(
                  (t) => t.topicId === topic.id
                );

                return {
                  ...topic,
                  completed: topicProgress?.completed || false,
                  completedLessons: topicProgress?.completedLessons || [],
                };
              });
            } else {
              languageObj.progress = 0;
            }

            return languageObj;
          })
        );

        return res.json(languagesWithProgress);
      }
    }

    // Convert all languages to plain objects if no user progress
    const plainLanguages = languages.map((lang) => lang.toObject());
    res.json(plainLanguages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single language
router.get("/:id", async (req, res) => {
  try {
    const languageDoc = await Language.findOne({ id: req.params.id }).populate(
      "topics"
    );
    if (!languageDoc) {
      return res.status(404).json({ message: "Language not found" });
    }

    // Convert Mongoose document to plain object
    const language = languageDoc.toObject();

    // Get user progress for this language
    const userId = req.query.userId;

    if (userId) {
      const userProgress = await UserProgress.findOne({ userId });

      if (userProgress) {
        const languageProgress = userProgress.progress.find(
          (p) => p.languageId === req.params.id
        );

        if (languageProgress) {
          // Calculate total topics and completed topics
          const totalTopics = language.topics.length;
          // Consider a topic completed if it has any completed lessons
          const completedTopics = languageProgress.completedTopics.filter(
            (topic) =>
              topic.completed ||
              (topic.completedLessons && topic.completedLessons.length > 0)
          ).length;

          // Calculate progress percentage
          language.progress =
            totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0;
        } else {
          language.progress = 0;
        }
      } else {
        language.progress = 0;
      }
    } else {
      language.progress = 0;
    }

    res.json(language);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a topic by language ID and topic ID
router.get("/:languageId/topics/:topicId", async (req, res) => {
  try {
    const language = await Language.findOne({ id: req.params.languageId });
    if (!language) {
      return res.status(404).json({ message: "Language not found" });
    }

    const topic = await Topic.findOne({
      id: req.params.topicId,
      language: language._id,
    }).populate("questions");

    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    res.json(topic);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new language
router.post("/", async (req, res) => {
  const language = new Language({
    id: req.body.id,
    name: req.body.name,
    icon: req.body.icon,
    topics: req.body.topics || [],
  });

  try {
    const newLanguage = await language.save();
    res.status(201).json(newLanguage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
