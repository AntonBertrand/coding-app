import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Topic } from "@/data/mockData";
import { getUserProgress } from "@/services/api";
import { useAuth } from "@/lib/auth-context";

interface TopicCardProps {
  topic: Topic;
  languageId: string;
}

const TopicCard: React.FC<TopicCardProps> = ({ topic, languageId }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const checkCompletionStatus = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        const progress = await getUserProgress(currentUser.uid);

        const languageProgress = progress.progress.find(
          (p) => p.languageId === languageId
        );

        if (languageProgress) {
          const topicProgress = languageProgress.completedTopics.find(
            (t) => t.topicId === topic.id
          );

          // Check if the topic has any completed lessons
          const hasCompletedLessons =
            topicProgress?.completedLessons?.length > 0;
          setIsCompleted(
            hasCompletedLessons || topicProgress?.completed || false
          );
        }
      } catch (error) {
        console.error("Failed to fetch completion status:", error);
      } finally {
        setLoading(false);
      }
    };

    checkCompletionStatus();
  }, [topic.id, languageId, currentUser]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 relative animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
        <div className="h-10 bg-gray-200 rounded w-1/3"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 relative">
      {isCompleted && (
        <div className="completed-badge flex items-center gap-1">
          <Check className="w-3 h-3" /> Completed
        </div>
      )}

      <h3 className="text-lg font-semibold mb-2 text-quiz-dark">
        {topic.title}
      </h3>

      <p className="text-quiz-neutral mb-4 text-sm">{topic.description}</p>

      {isCompleted ? (
        <div className="text-gray-400 inline-block py-2 px-4 rounded-lg border border-gray-200 cursor-not-allowed">
          Completed
        </div>
      ) : (
        <Link
          to={`/language/${languageId}/topic/${topic.id}`}
          className="inline-block bg-quiz-primary hover:bg-quiz-secondary text-white py-2 px-4 rounded-lg transition-colors"
        >
          Start Lesson
        </Link>
      )}
    </div>
  );
};

export default TopicCard;
