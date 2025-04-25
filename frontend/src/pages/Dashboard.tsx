import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Book, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getLanguages, Language } from "@/services/api";
import LanguageCard from "@/components/LanguageCard";
import { useAuth } from "@/lib/auth-context";

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const data = await getLanguages(currentUser?.uid);
        setLanguages(data);
      } catch (err) {
        setError("Failed to load languages. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLanguages();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-quiz-primary mx-auto"></div>
          <p className="mt-4 text-quiz-neutral">Loading languages...</p>
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
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-quiz-neutral flex items-center"
              >
                <User className="h-4 w-4 mr-2" />
                <span>Profile</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-quiz-dark">
            Your Learning Dashboard
          </h1>
          <p className="text-quiz-neutral mt-2">
            Pick a language to continue your learning journey
          </p>
        </div>

        {/* Language Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {languages.map((language) => (
            <LanguageCard key={language.id} language={language} />
          ))}
        </div>

        {/* Trending Topics */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-quiz-dark mb-6">
            Recommended Topics
          </h2>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                <div>
                  <h3 className="font-medium text-quiz-dark">
                    JavaScript Error Handling
                  </h3>
                  <p className="text-sm text-quiz-neutral">
                    Learn how to handle errors efficiently
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="text-quiz-primary border-quiz-primary hover:bg-quiz-primary hover:text-white"
                >
                  Start
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                <div>
                  <h3 className="font-medium text-quiz-dark">
                    React Hooks Deep Dive
                  </h3>
                  <p className="text-sm text-quiz-neutral">
                    Master the power of React Hooks
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="text-quiz-primary border-quiz-primary hover:bg-quiz-primary hover:text-white"
                >
                  Start
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                <div>
                  <h3 className="font-medium text-quiz-dark">
                    Python Data Structures
                  </h3>
                  <p className="text-sm text-quiz-neutral">
                    Understand lists, dictionaries, tuples and sets
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="text-quiz-primary border-quiz-primary hover:bg-quiz-primary hover:text-white"
                >
                  Start
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
