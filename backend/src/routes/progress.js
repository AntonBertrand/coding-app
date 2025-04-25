const express = require("express");
const router = express.Router();
const UserProgress = require("../models/UserProgress");

// Get user progress
router.get("/:userId", async (req, res) => {
  try {
    const progress = await UserProgress.findOne({ userId: req.params.userId });
    if (!progress) {
      // Return empty progress object instead of 404
      return res.json({
        userId: req.params.userId,
        progress: [],
      });
    }
    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update user progress
router.post("/:userId", async (req, res) => {
  try {
    const { languageId, topicId, completed } = req.body;

    let userProgress = await UserProgress.findOne({
      userId: req.params.userId,
    });

    if (!userProgress) {
      userProgress = new UserProgress({
        userId: req.params.userId,
        progress: [],
      });
    }

    // Find or create language progress
    let languageProgress = userProgress.progress.find(
      (p) => p.languageId === languageId
    );
    if (!languageProgress) {
      languageProgress = {
        languageId,
        progress: 0,
        completedTopics: [],
      };
      userProgress.progress.push(languageProgress);
    }

    // Update topic completion status
    const topicProgress = languageProgress.completedTopics.find(
      (t) => t.topicId === topicId
    );
    if (topicProgress) {
      topicProgress.completed = completed;
    } else {
      languageProgress.completedTopics.push({ topicId, completed });
    }

    // Calculate overall progress
    const totalTopics = languageProgress.completedTopics.length;
    const completedTopics = languageProgress.completedTopics.filter(
      (t) => t.completed
    ).length;
    languageProgress.progress =
      totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0;

    await userProgress.save();
    res.json(userProgress);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Mark lesson as completed
router.post("/:userId/complete-lesson", async (req, res) => {
  try {
    const { languageId, topicId, lessonId, score } = req.body;
    const userId = req.params.userId;
    const PASSING_SCORE = 3; // Minimum score to pass a lesson

    // First, get the current progress
    let userProgress = await UserProgress.findOne({ userId });

    if (!userProgress) {
      // Create new progress document if it doesn't exist
      userProgress = new UserProgress({
        userId,
        progress: [
          {
            languageId,
            progress: score >= PASSING_SCORE ? 25 : 0, // Assuming 4 topics per language initially
            completedTopics: [
              {
                topicId,
                completed: score >= PASSING_SCORE,
                completedLessons: [
                  {
                    lessonId,
                    completedAt: new Date(),
                    score: score || null,
                  },
                ],
              },
            ],
          },
        ],
      });
    } else {
      // Find or create language progress
      let languageProgress = userProgress.progress.find(
        (p) => p.languageId === languageId
      );

      if (!languageProgress) {
        // Add new language progress
        userProgress.progress.push({
          languageId,
          progress: score >= PASSING_SCORE ? 25 : 0, // Assuming 4 topics per language initially
          completedTopics: [
            {
              topicId,
              completed: score >= PASSING_SCORE,
              completedLessons: [
                {
                  lessonId,
                  completedAt: new Date(),
                  score: score || null,
                },
              ],
            },
          ],
        });
      } else {
        // Find or create topic progress
        let topicProgress = languageProgress.completedTopics.find(
          (t) => t.topicId === topicId
        );

        if (!topicProgress) {
          // Add new topic progress
          languageProgress.completedTopics.push({
            topicId,
            completed: score >= PASSING_SCORE,
            completedLessons: [
              {
                lessonId,
                completedAt: new Date(),
                score: score || null,
              },
            ],
          });
        } else {
          // Add new lesson to existing topic
          topicProgress.completedLessons.push({
            lessonId,
            completedAt: new Date(),
            score: score || null,
          });
          // Only mark as completed if passed
          topicProgress.completed = score >= PASSING_SCORE;
        }

        // Update language progress based on completed topics
        const totalTopics = 4; // Assuming 4 topics per language
        const completedTopics = languageProgress.completedTopics.filter(
          (t) => t.completed
        ).length;
        languageProgress.progress = (completedTopics / totalTopics) * 100;
      }
    }

    // Save the updated progress
    const savedProgress = await userProgress.save();
    res.json(savedProgress);
  } catch (err) {
    console.error("Error saving progress:", err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
