import React from "react";
import { Link } from "react-router-dom";
import { Language } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import {
  Javascript,
  Python,
  Java as JavaIcon,
  ReactIcon,
} from "@/components/icons/ProgrammingIcons";

const LanguageCard: React.FC<{ language: Language }> = ({ language }) => {
  const getIcon = () => {
    switch (language.icon) {
      case "javascript":
        return <Javascript className="w-12 h-12 text-yellow-400" />;
      case "python":
        return <Python className="w-12 h-12 text-blue-500" />;
      case "java":
        return <JavaIcon className="w-12 h-12 text-red-500" />;
      case "react":
        return <ReactIcon className="w-12 h-12 text-blue-400" />;
      default:
        return <div className="w-12 h-12 bg-gray-200 rounded-full" />;
    }
  };

  // Calculate total lessons and completed lessons
  const totalLessons = language.topics.reduce((total, topic) => total + 1, 0);
  const completedLessons = language.topics.reduce((total, topic) => {
    // Check if topic is marked as completed
    if (topic.completed) return total + 1;

    // Check if topic has completed lessons
    if (topic.completedLessons && topic.completedLessons.length > 0) {
      return total + 1;
    }

    return total;
  }, 0);

  return (
    <Link to={`/language/${language.id}`} className="block">
      <div className="bg-white rounded-xl shadow-md p-6 card-hover">
        <div className="flex items-center mb-4">
          <div className="mr-4">{getIcon()}</div>
          <div>
            <h3 className="text-lg font-semibold text-quiz-dark">
              {language.name}
            </h3>
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="bg-quiz-secondary text-white"
              >
                {completedLessons}/{totalLessons} Lessons
              </Badge>
              {language.progress > 0 && (
                <Badge
                  variant="secondary"
                  className="bg-quiz-secondary text-white"
                >
                  {Math.round(language.progress)}% Complete
                </Badge>
              )}
            </div>
          </div>
        </div>
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${language.progress}%` }}
          ></div>
        </div>
      </div>
    </Link>
  );
};

export default LanguageCard;
