"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGlobalContext } from "@/context/main";
import Link from "next/link";

export default function PageQuiz() {

  
  const searchParams = useSearchParams()


  const [quiz, setQuiz] = useState({});
  const [error, setError] = useState("");
  const [questions, setQuestions] = useState([]);
  const [subject, setSubject] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [ranking, setRanking] = useState([]);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);

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

  window.onblur = function () {
    setTabSwitchCount(tabSwitchCount + 1);
    console.log(tabSwitchCount);
  };

  document.addEventListener("visibilitychange", (event) => {
    if (document.visibilityState == "visible") {
      console.log("tab is active")
    } else {
      console.log("tab is inactive")
      setTabSwitchCount(tabSwitchCount + 1)
      console.log(tabSwitchCount)
    }
  });

  useEffect(()=> {
    if (searchParams){
        const id = searchParams.get('quiz_id');
        if (id){
            try {
                (async ()=> {
                    const body = { id };
                    const res = await fetch(`/api/quiz/get_by_id`, {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(body),
                    });
                    const quiz_res = await res.json();
                    console.log(quiz_res);
                    setQuiz(quiz_res);

                    setQuestions(quiz_res.questions);
                    setSubject(quiz_res.subject);
                    setTotalQuestions(quiz_res.questions.length);
                })();
            } catch (error) {
                console.error(error);
            }
        } else {
            setError("All fields are required");
            return;
        }
    }
  }, []);

  // Desestruturação
  // const { questions, subject, totalQuestions } = quiz;
  // const { id, question, answers, correctAnswer } = questions[activeQuestion];
  // let id;
  let question;
  let answers;
  let correctAnswer;

  console.log("AQUI")
  if (questions[activeQuestion]) {
    
    console.log("AQUI2")
    question = questions[activeQuestion].statement;
    answers = questions[activeQuestion].answers.map(a => a.value);
    correctAnswer = questions[activeQuestion].correct_answer;
  }

  const { newName, newEmail } = useGlobalContext();

  const router = useRouter();

  if (!newName || !newEmail){
    router.push("/");
  }

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
    nexQuestionTimer(1);
  }

  async function nexQuestionTimer (seconds: number){

    await new Promise(resolve => setTimeout(resolve, seconds * 1000));

    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
      handleUserRankCreate();
    }
    setChecked(false);
    setShowCorrect(false);
    setSelectedAnswerIndex(null);
  }

  async function handleUserRankCreate() {
    console.log(newName, newEmail, result.score, quiz.id)
    if (newName && newEmail && quiz.id){
      const score = (result.correctAnswers*5).toString();
      console.log("1111111111111111111111111111", score);
      try {
        (async ()=> {
          const body = {
            name: newName,
            email: newEmail,
            score: score,
            quiz_id: quiz.id,
          };
          console.log("RESLTSCORE   ", result.score);
          const res = await fetch(`/api/user_rank/create`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body),
          });
          const userrank_res = await res.json();
          console.log("ISJADFIAJSDIASJI");
          console.log(userrank_res);
          setRanking(userrank_res);


        })();
      } catch (error) {
      console.error(error);
    }
    } else {
      console
      setError("All fields are required");
      return;
    }
  }

  return (
    questions[activeQuestion] ? (
      tabSwitchCount < 2 ? (
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
        <div className="max-[900px] rounded overflow-hidden shadow-lg bg-gray-100">
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
              <h3>Porcentagem de acerto: {(result.score / (5*totalQuestions)) * 100}% </h3>
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
              <div className="flex flex-col bg-blue-900 text-white gap-3 p-5 rounded-lg">
                Ranking
                {
                  ranking.map((user_rank, user_rank_id) => (
                    <div key={user_rank_id} className="flex flex-row gap-3 p-1">
                      <p>{user_rank.name}</p>
                      <p>{user_rank.email}</p>
                      <p>{user_rank.score}</p>
                    </div>
                  ))
                }
              </div>
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
      ):(
        <Link href="/">
          <button className="bg-blue-950 p-2 rounded-lg hover:bg-white hover:text-black">
            Max tab count reached, click here to return
          </button>
        </Link>
      )
    ):(
      quiz.id ? (
        <div className="flex flex-row justify-center">
          <Link href={"/quiz/edit?quiz_id="+quiz.id}>
            <button className="bg-blue-950 p-2 rounded-lg hover:bg-white hover:text-black">
              No questions found, try adding them here
            </button>
          </Link>
        </div>
      ) : (
        "Loading"
      )
    )
  );
}
