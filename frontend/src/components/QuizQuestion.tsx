import React, { useState } from "react";
import { Question } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface QuizQuestionProps {
  question: Question;
  onCorrectAnswer: () => void;
  onWrongAnswer: () => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  onCorrectAnswer,
  onWrongAnswer,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { toast } = useToast();

  const handleOptionClick = (optionId: string) => {
    if (!hasSubmitted) {
      setSelectedOptionId(optionId);
    }
  };

  const handleSubmit = () => {
    if (!selectedOptionId) {
      toast({
        title: "Select an option",
        description: "Please select an answer before submitting",
        variant: "destructive",
      });
      return;
    }

    setHasSubmitted(true);

    if (selectedOptionId === question.correctOptionId) {
      toast({
        title: "Correct!",
        description: "Great job! You got it right.",
        variant: "default",
        className: "bg-quiz-success text-white",
      });
      // Wait a moment before proceeding
      setTimeout(() => {
        onCorrectAnswer();
        setSelectedOptionId(null);
        setHasSubmitted(false);
      }, 1000);
    } else {
      toast({
        title: "Incorrect",
        description: "That's not right. Try again on the next question.",
        variant: "destructive",
      });
      setTimeout(() => {
        onWrongAnswer();
        setSelectedOptionId(null);
        setHasSubmitted(false);
      }, 1000);
    }
  };

  const getOptionClassName = (optionId: string) => {
    let className = "quiz-option mb-3";

    if (selectedOptionId === optionId) {
      className += " quiz-option-selected";

      if (hasSubmitted) {
        className +=
          optionId === question.correctOptionId
            ? " quiz-option-correct"
            : " quiz-option-incorrect";
      }
    } else if (hasSubmitted && optionId === question.correctOptionId) {
      className += " quiz-option-correct";
    }

    return className;
  };

  return (
    <div className="animate-fade-in">
      <h3 className="text-xl font-semibold mb-4">{question.text}</h3>

      {question.code && (
        <pre className="bg-gray-900 text-white p-4 rounded-md mb-4 overflow-x-auto text-sm">
          <code>{question.code}</code>
        </pre>
      )}

      <div className="space-y-2">
        {question.options.map((option) => (
          <div
            key={option.id}
            className={getOptionClassName(option.id)}
            onClick={() => handleOptionClick(option.id)}
          >
            {option.text}
          </div>
        ))}
      </div>

      <Button
        onClick={handleSubmit}
        disabled={hasSubmitted || !selectedOptionId}
        className="mt-6 bg-quiz-primary hover:bg-quiz-secondary"
      >
        Submit Answer
      </Button>

      {hasSubmitted && (
        <Button
          onClick={() => {
            setSelectedOptionId(null);
            setHasSubmitted(false);
          }}
          className="mt-6 ml-4 bg-quiz-secondary hover:bg-quiz-primary"
        >
          Next Question
        </Button>
      )}
    </div>
  );
};

export default QuizQuestion;
