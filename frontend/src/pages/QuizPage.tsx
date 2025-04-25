import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowDown, Book, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import ProgressBar from "@/components/ProgressBar";
import QuizQuestion from "@/components/QuizQuestion";
import {
  getLanguageById,
  getTopicById,
  markLessonComplete,
  Language,
  Topic,
} from "@/services/api";
import { useAuth } from "@/lib/auth-context";

const QuizPage: React.FC = () => {
  const { languageId, topicId } = useParams<{
    languageId: string;
    topicId: string;
  }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentUser } = useAuth();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionsCompleted, setQuestionsCompleted] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState<boolean[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [topic, setTopic] = useState<Topic | null>(null);
  const [language, setLanguage] = useState<Language | null>(null);
  const [isAnswering, setIsAnswering] = useState(false);
  const [shouldComplete, setShouldComplete] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!languageId || !topicId || !currentUser) return;

      try {
        const [languageData, topicData] = await Promise.all([
          getLanguageById(languageId, currentUser.uid),
          getTopicById(languageId, topicId),
        ]);
        setLanguage(languageData);
        setTopic(topicData);
        setCorrectAnswers(new Array(topicData.questions.length).fill(false));
      } catch (err) {
        setError("Failed to load quiz data. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [languageId, topicId, currentUser]);

  const questions = topic?.questions || [];
  const currentQuestion = questions[currentQuestionIndex];
  const totalCorrect = correctAnswers.filter(Boolean).length;

  useEffect(() => {
    if (!loading && (!topic || !language)) {
      navigate("/dashboard");
    }
  }, [topic, language, navigate, loading]);

  useEffect(() => {
    if (shouldComplete) {
      const currentTotalCorrect = correctAnswers.filter(Boolean).length;
      const passThreshold = Math.ceil(questions.length * 0.75);
      const currentPassed = currentTotalCorrect >= passThreshold;

      setIsComplete(true);
      setIsFailed(!currentPassed);

      if (currentPassed && languageId && topicId && currentUser?.uid) {
        try {
          const lessonId = `${topicId}-${Date.now()}`;
          markLessonComplete(
            currentUser.uid,
            languageId,
            topicId,
            lessonId,
            currentTotalCorrect
          );
        } catch (error) {
          console.error("Failed to mark lesson as complete:", error);
          toast({
            title: "Error",
            description:
              "Failed to save your progress. Please try again later.",
            variant: "destructive",
          });
        }
      }

      toast({
        title: currentPassed ? "Topic Completed!" : "Lesson Failed",
        description: `You got ${currentTotalCorrect} of ${questions.length} questions correct.`,
        className: currentPassed
          ? "bg-quiz-success text-white"
          : "bg-quiz-error text-white",
      });

      setShouldComplete(false);
    }
  }, [
    shouldComplete,
    correctAnswers,
    questions.length,
    languageId,
    topicId,
    currentUser,
  ]);

  const handleCorrectAnswer = () => {
    if (isAnswering) return;
    setIsAnswering(true);

    setCorrectAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[currentQuestionIndex] = true;
      return newAnswers;
    });
    setQuestionsCompleted((prev) => prev + 1);

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsAnswering(false);
    } else {
      setTimeout(() => {
        completeTopic();
        setIsAnswering(false);
      }, 0);
    }
  };

  const handleWrongAnswer = () => {
    if (isAnswering) return;
    setIsAnswering(true);

    setCorrectAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[currentQuestionIndex] = false;
      return newAnswers;
    });
    setQuestionsCompleted((prev) => prev + 1);

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsAnswering(false);
    } else {
      setTimeout(() => {
        completeTopic();
        setIsAnswering(false);
      }, 0);
    }
  };

  const goToNextQuestion = () => {
    const newIndex = currentQuestionIndex + 1;
    setQuestionsCompleted((prev) => prev + 1);

    if (newIndex < questions.length) {
      setCurrentQuestionIndex(newIndex);
    } else {
      completeTopic();
    }
  };

  const completeTopic = async () => {
    setShouldComplete(true);
  };

  const retryQuiz = () => {
    setCurrentQuestionIndex(0);
    setQuestionsCompleted(0);
    setCorrectAnswers(new Array(questions.length).fill(false));
    setIsComplete(false);
    setIsFailed(false);
    setIsAnswering(false);
    setShouldComplete(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-quiz-primary mx-auto"></div>
          <p className="mt-4 text-quiz-neutral">Loading quiz...</p>
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

  if (!topic || !language) {
    return <div>Loading...</div>;
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

      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center text-sm">
            <Link
              to="/dashboard"
              className="text-quiz-neutral hover:text-quiz-primary"
            >
              Dashboard
            </Link>
            <ArrowDown className="w-3 h-3 mx-2 rotate-[-90deg]" />
            <Link
              to={`/language/${languageId}`}
              className="text-quiz-neutral hover:text-quiz-primary"
            >
              {language.name}
            </Link>
            <ArrowDown className="w-3 h-3 mx-2 rotate-[-90deg]" />
            <span className="text-quiz-dark">{topic.title}</span>
          </div>
        </div>
      </div>

      {/* Quiz Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-3xl mx-auto">
          {isComplete ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center text-white mx-auto mb-6 ${
                  isFailed ? "bg-quiz-error" : "bg-quiz-success"
                }`}
              >
                {isFailed ? (
                  <X className="w-8 h-8" />
                ) : (
                  <Check className="w-8 h-8" />
                )}
              </div>
              <h2 className="text-2xl font-bold text-quiz-dark mb-2">
                {isFailed ? "Lesson Failed" : "Topic Completed!"}
              </h2>
              <p className="text-quiz-neutral mb-6">
                You got {totalCorrect} out of {questions.length} question
                correct.
              </p>
              <div className="progress-bar mb-8">
                <div
                  className="progress-bar-fill"
                  style={{
                    width: `${(totalCorrect / questions.length) * 100}%`,
                  }}
                ></div>
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                {isFailed ? (
                  <Button
                    onClick={retryQuiz}
                    className="bg-quiz-primary hover:bg-quiz-secondary"
                  >
                    Try Again
                  </Button>
                ) : (
                  <>
                    <Button
                      asChild
                      variant="outline"
                      className="text-quiz-primary border-quiz-primary hover:bg-quiz-primary hover:text-white"
                    >
                      <Link to={`/language/${languageId}`}>Back to Topics</Link>
                    </Button>
                    <Button
                      asChild
                      className="bg-quiz-primary hover:bg-quiz-secondary"
                    >
                      <Link to="/dashboard">Go to Dashboard</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-quiz-dark mb-6">
                {topic.title}
              </h1>
              <ProgressBar
                current={currentQuestionIndex + 1}
                total={questions.length}
              />

              {currentQuestion && (
                <div className="bg-white rounded-xl shadow-md p-6">
                  <QuizQuestion
                    question={currentQuestion}
                    onCorrectAnswer={handleCorrectAnswer}
                    onWrongAnswer={handleWrongAnswer}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default QuizPage;
