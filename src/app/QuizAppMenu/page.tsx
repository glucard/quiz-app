"use client"

import Link from "next/link";
import { useEffect, useState } from "react"

export default function QuizAppMenu() {

    const [quizes, setQuizes] = useState([]);

    useEffect(()=>{
        try {
            (async ()=> {
                const body = {};
                const res = await fetch(`/api/quiz/get_all`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(body),
                });
                const quizes_res = await res.json();
                console.log(quizes_res)
                setQuizes(quizes_res);
            })();    
        } catch (error) {
            console.error(error);
        }
    }, []);

    return (
        <div className="flex flex-col items-center gap-5">
            <Link href="/quiz/create">
                <button className="bg-blue-950 p-2 rounded-lg hover:bg-white hover:text-black">
                    Create new Quiz
                </button>
            </Link>
            {
                quizes.map((quiz, quiz_idx) => (
                    <div key={quiz_idx} className="flex flex-row gap-5 p-3 bg-blue-900 items-center rounded-xl">
                        {quiz.subject}
                        <Link href={"/quiz?quiz_id="+quiz.id}>
                            <button className="bg-blue-950 p-2 rounded-lg hover:bg-white hover:text-black">
                                Take quiz
                            </button>
                        </Link>
                        <Link href={"/quiz/edit?quiz_id="+quiz.id}>
                            <button className="bg-blue-950 p-2 rounded-lg hover:bg-white hover:text-black">
                                Edit
                            </button>
                        </Link>
                    </div>
                ))
            }
        </div>
    )
}