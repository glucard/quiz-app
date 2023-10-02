"use client"

import { useState, useEffect, FormEventHandler } from "react";

import { useRouter, useSearchParams } from "next/navigation";

export default function EditQuiz() {
    const searchParams = useSearchParams()
    const router = useRouter();

    const [quiz, setQuiz] = useState({});

    const [error, setError] = useState("");
    const [newQuestionStatement, setNewQuestionStatement] = useState("");
    const [newQuestionCorrectAnswer, setNewQuestionCorrectAnswer] = useState("");
    const [newAnswer, setNewAnswer] = useState("");

    useEffect(()=>{
        loadQuiz();
    },[]);

    function loadQuiz(){
        
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
                        console.log(quiz_res)
                        setQuiz(quiz_res);
                    })();    
                } catch (error) {
                    console.error(error);
                }
            } else {
                setError("All fields are required");
                return;
            }
        }
    }

    async function requestCreateAnswer(question_id: String, value: String){
        console.log(question_id);
        console.log(value);
        setError("");
            
        if (question_id && value) {
            try {
                const body = { 
                    question_id: question_id,
                    value: value,
                };
                const res = await fetch(`/api/answer/create`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(body),
                });

                const answer_res = await res.json();
                console.log(answer_res);
                loadQuiz()

            } catch (error) {
                console.error(error);
            }
        } else {
            setError("All fields are required");
            return;
        }
    }

    async function handleAddNewQuestion(e: any){
        e.preventDefault();
        console.log(newQuestionStatement);
        console.log(newQuestionCorrectAnswer);
        setError("");
            
        if (newQuestionStatement && newQuestionCorrectAnswer) {
            try {
                const body = { 
                    statement: newQuestionStatement,
                    correct_answer: newQuestionCorrectAnswer,
                    quiz_id: quiz.id,
                };
                const res = await fetch(`/api/question/create`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(body),
                });

                const question_res = await res.json();
                console.log(question_res);

                requestCreateAnswer(question_res.id, newQuestionCorrectAnswer);

            } catch (error) {
                console.error(error);
            }
        } else {
            setError("All fields are required");
            return;
        }
    }
    
    function handleAddNewAnswer(question_id: String){
        requestCreateAnswer(question_id, newAnswer);
    }

    return (
        <div className="flex justify-center">
            { quiz.id ? (
                <div className="flex flex-col w-96 gap-10">
                    Editing Quiz {quiz.subject}
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-5">
                            { 
                                quiz.questions.map((q, q_idx) => (
                                    <div key={q_idx} className="flex flex-col align-middle rounded-lg p-2 gap-3 bg-blue-900 text-white">
                                        <h1 className="text-xl font-bold">{q.statement}</h1>
                                        {
                                            q.answers.map((a, a_idx) => (
                                                <div key={a_idx} className="bg-blue-700 text-white p-1 rounded-md">
                                                    {a_idx}: {a.value}
                                                </div>
                                            ))
                                        }
                                        <div className="flex flex-col bg-blue-950 p-2 rounded-md gap-2">
                                            New answer
                                            <input onChange={e => setNewAnswer(e.target.value)} className="bg-slate-900 rounded-sm" />
                                            <button onClick={(e) => handleAddNewAnswer(q.id)} className="bg-slate-900 hover:bg-slate-500 p-1 rounded-lg">
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="flex flex-col bg-blue-900 p-3 gap-3 rounded-lg">
                            New question:
                            <div>
                                Statement: <input className="text-black rounded-sm" name="new_question_statement" value={newQuestionStatement} onChange={e => setNewQuestionStatement(e.target.value)} />
                            </div>
                            
                            <div>
                                Correct Answer: <input className="text-black rounded-sm" name="new_question_correct_answer" value={newQuestionCorrectAnswer} onChange={e => setNewQuestionCorrectAnswer(e.target.value)} />
                            </div>

                            <button className="bg-slate-900 hover:bg-slate-500 p-2 rounded-full" onClick={handleAddNewQuestion}>
                                Add Question
                            </button>
                        </div>
                    </div>
                </div>
            ):(
                "Loading"
            )}
        </div>
    )
}