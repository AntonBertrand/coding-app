const mongoose = require("mongoose");

const userProgressSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  progress: {
    type: [
      {
        languageId: {
          type: String,
          required: true,
        },
        progress: {
          type: Number,
          default: 0,
        },
        completedTopics: {
          type: [
            {
              topicId: String,
              completed: {
                type: Boolean,
                default: false,
              },
              completedLessons: {
                type: [
                  {
                    lessonId: String,
                    completedAt: {
                      type: Date,
                      default: Date.now,
                    },
                    score: Number,
                  },
                ],
                default: [],
              },
            },
          ],
          default: [],
        },
      },
    ],
    default: [],
  },
});

module.exports = mongoose.model("UserProgress", userProgressSchema);
