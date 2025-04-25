import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowDown, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import TopicCard from "@/components/TopicCard";
import { getLanguageById, Language } from "@/services/api";
import { useAuth } from "@/lib/auth-context";

const LanguageTopics: React.FC = () => {
  const { languageId } = useParams<{ languageId: string }>();
  const { currentUser } = useAuth();
  const [language, setLanguage] = useState<Language | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!languageId || !currentUser) return;

      try {
        const data = await getLanguageById(languageId, currentUser.uid);
        setLanguage(data);
      } catch (err) {
        setError("Failed to load language. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [languageId, currentUser]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-quiz-primary mx-auto"></div>
          <p className="mt-4 text-quiz-neutral">Loading language...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">{error}</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!language) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Language not found</h2>
          <Link to="/dashboard" className="text-quiz-primary hover:underline">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Book className="h-6 w-6 text-quiz-primary" />
              <span className="text-xl font-bold text-quiz-dark">
                CodeQuizly
              </span>
            </Link>
            <Link to="/dashboard">
              <Button variant="ghost" className="text-quiz-neutral">
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Language Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <div className="flex items-center mb-4">
                <Link
                  to="/dashboard"
                  className="text-quiz-neutral hover:text-quiz-primary mr-2"
                >
                  Dashboard
                </Link>
                <ArrowDown className="w-3 h-3 mx-1 rotate-[-90deg]" />
                <span className="text-quiz-dark">{language.name}</span>
              </div>
              <h1 className="text-3xl font-bold text-quiz-dark">
                {language.name} Topics
              </h1>
              <p className="text-quiz-neutral mt-2">
                Select a topic to start learning
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex items-center">
                <div className="mr-4">
                  <div className="text-sm text-quiz-neutral mb-1">
                    Your Progress
                  </div>
                  <div className="font-semibold text-quiz-dark">
                    {language?.progress !== undefined
                      ? `${Math.round(language.progress)}% Complete`
                      : "0% Complete"}
                  </div>
                </div>
                <div className="w-24">
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${language?.progress || 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Topic Cards */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {language.topics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} languageId={language.id} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default LanguageTopics;
