"use client";

import { quiz } from "@/data/quiz";
import { useState } from "react";

export default function PageQuiz() {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(false);
  const [checked, setChecked] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  // Desestruturação
  const { questions } = quiz;
  const { id, question, answers } = questions[activeQuestion];

  return (
    <div className="flex justify-center">
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-100">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 text-black">{question}</div>
          <div className="text-gray-700 text-base flex flex-col gap-1">
            {answers.map((answer, idx) => (
              <button
                key={idx}
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                {answer}
              </button>
            ))}
          </div>
        </div>
        <div className="px-6 pt-4 pb-2 flex justify-center">
          <button className="bg-gray-400 hover:bg-gray-600 font-bold py-2 px-4 rounded-full select-none">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
