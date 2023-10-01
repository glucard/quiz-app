"use client";

import { quiz } from "@/data/quiz";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/main";

export default function PageQuiz() {
  const [showCorrect, setShowCorrect] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [checked, setChecked] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  // Desestruturação
  const { questions, subject, totalQuestions } = quiz;
  const { id, question, answers, correctAnswer } = questions[activeQuestion];

  const { newName, newEmail } = useGlobalContext();

  const router = useRouter();

  function onAnswerSelected(answer: any, idx: any) {
    setChecked(true);
    setSelectedAnswerIndex(idx);
    if (answer === correctAnswer) {
      setSelectedAnswer(true);
      console.log("true");
    } else {
      setSelectedAnswer(false);
      console.log("false");
    }
  }

  function nextQuestionHandler() {
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );
    setShowCorrect(true);
    nexQuestionTimer(2);
  }

  async function nexQuestionTimer (seconds: number){

    await new Promise(resolve => setTimeout(resolve, seconds * 1000));

    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }
    setChecked(false);
    setShowCorrect(false);
    setSelectedAnswerIndex(null);
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="pb-2">
        <p>Olá <span className="font-bold">{newName}</span> , seja bem vindo! </p>
      </div>
      <div className="flex flex-col">
        <h2>Assunto: {subject}</h2>
        <h2>
          Questão: {activeQuestion + 1}/{totalQuestions}
        </h2>
      </div>
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-100">
        {!showResult ? (
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 text-black">{question}</div>
            <div className="text-gray-700 text-base flex flex-col gap-1">
              {answers.map((answer, idx) => (
                <button
                  key={idx}
                  className={`
                 hover:bg-blue-500 
                text-blue-700 font-semibold hover:text-white 
                py-2 px-4 border border-blue-500 
                hover:border-transparent rounded

                ${showCorrect ? (
                  selectedAnswerIndex === idx
                  ? (
                    correctAnswer === answer ? 
                    (
                      "bg-green-700 text-white"
                    ):(
                      "bg-red-700 text-white"
                    )
                  ):(
                    correctAnswer === answer ?
                    (
                      "bg-green-700 text-white"
                    ):
                    (
                      ""
                    )
                  )
                ):(
                  selectedAnswerIndex === idx 
                    ? (
                      "bg-blue-700 text-white"
                    )
                  : (
                    ""
                  )
                )}
              `}
                  onClick={() => onAnswerSelected(answer, idx)}
                >
                  {answer}
                </button>
              ))}
            </div>
            <div className="px-6 pt-4 pb-2 flex justify-center">
              <button
                disabled={!checked}
                className={`
            bg-gray-400 
              font-bold py-2 px-4 rounded-full select-none
              ${
                checked
                  ? "hover:bg-gray-600 "
                  : "bg-gray-200 cursor-not-allowed"
              }
            `}
                onClick={() => nextQuestionHandler()}
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <div className="px-6 py-4 text-black">
            <h1 className="font-bold text-xl text-blue-600">Resultados</h1>
            <h3>Porcentagem de acerto: {(result.score / 25) * 100}% </h3>
            <h3>
              Total de Questões: <span> {questions.length}</span>
            </h3>
            <h3>
              Total de Pontos: <span> {result.score}</span>
            </h3>
            <h3>
              Respostas Certas: <span> {result.correctAnswers}</span>
            </h3>
            <h3>
              Respostas Erradas: <span> {result.wrongAnswers}</span>
            </h3>
            <div className="px-6 pt-4 pb-2 flex justify-center">
              <button
                className={`
            bg-gray-400 
              font-bold py-2 px-4 rounded-full select-none
             
            `}
                onClick={() => router.push("/")}
              >
                Restart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
