import React from "react";
import { Link } from "react-router-dom";
import { Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";

const LandingPage: React.FC = () => {
  const { currentUser, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-quiz-light">
      {/* Navigation */}
      <nav className="container mx-auto p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Book className="h-8 w-8 text-quiz-primary" />
            <span className="text-2xl font-bold text-quiz-dark">
              CodeQuizly
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/dashboard"
              className="text-quiz-dark hover:text-quiz-primary transition-colors"
            >
              Dashboard
            </Link>
            {currentUser ? (
              <Button
                onClick={logout}
                variant="outline"
                className="border-quiz-primary text-quiz-primary hover:bg-quiz-primary hover:text-white"
              >
                Sign Out
              </Button>
            ) : (
              <Button
                asChild
                variant="outline"
                className="border-quiz-primary text-quiz-primary hover:bg-quiz-primary hover:text-white"
              >
                <Link to="/dashboard">Sign In</Link>
              </Button>
            )}
          </div>
          <Button
            asChild
            className="bg-quiz-primary hover:bg-quiz-secondary md:hidden"
          >
            <Link to="/dashboard">Get Started</Link>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-quiz-dark leading-tight mb-6">
              Learn to code with bite-sized drills & quizzes
            </h1>
            <p className="text-lg text-quiz-neutral mb-8 max-w-lg">
              Master programming languages through interactive lessons, track
              your progress, and build your coding skills one quiz at a time.
            </p>
            <Button
              asChild
              className="bg-quiz-primary hover:bg-quiz-secondary text-white px-8 py-6 text-lg rounded-xl"
            >
              {currentUser ? (
                <Link to="/dashboard">Get Started</Link>
              ) : (
                <Link to="/signup">Get Started</Link>
              )}
            </Button>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100 transform rotate-2">
                <pre className="bg-gray-900 rounded-lg p-4 text-green-400 text-sm">
                  <code>
                    {`function greet() {
  console.log("Hello, CodeQuizly!");
}

// Call the function
greet();`}
                  </code>
                </pre>
              </div>
              <div className="absolute top-8 -right-4 bg-quiz-primary text-white p-4 rounded-lg shadow-lg transform rotate-6">
                <p className="font-semibold">What will this code output?</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-quiz-dark mb-12">
            Why CodeQuizly?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-quiz-light p-6 rounded-xl">
              <div className="bg-quiz-primary w-12 h-12 rounded-full flex items-center justify-center text-white mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick Learning</h3>
              <p className="text-quiz-neutral">
                Bite-sized lessons that fit into your busy schedule
              </p>
            </div>
            <div className="bg-quiz-light p-6 rounded-xl">
              <div className="bg-quiz-primary w-12 h-12 rounded-full flex items-center justify-center text-white mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Multiple Languages</h3>
              <p className="text-quiz-neutral">
                Learn JavaScript, Python, Java, React, and more
              </p>
            </div>
            <div className="bg-quiz-light p-6 rounded-xl">
              <div className="bg-quiz-primary w-12 h-12 rounded-full flex items-center justify-center text-white mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
              <p className="text-quiz-neutral">
                Monitor your learning journey with visual progress indicators
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-quiz-dark text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Book className="h-6 w-6 text-quiz-primary" />
              <span className="text-lg font-bold">CodeQuizly</span>
            </div>
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} CodeQuizly. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
