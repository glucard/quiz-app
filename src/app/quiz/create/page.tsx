"use client"

import { useState } from "react";

import { useRouter } from 'next/navigation'

export default function CreateQuiz () {
    
    const [subject, setSubject] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();
    async function handleCreate(e: any) {
        e.preventDefault();
        console.log(subject);
        setError("");
            
        if (subject) {
            try {
                const body = { subject };
                const res = await fetch(`/api/quiz/create`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(body),
                });

                const quiz = await res.json();
                console.log(quiz);

                router.push(`/quiz/edit?quiz_id=${quiz.id}`);

            } catch (error) {
                console.error(error);
            }
        } else {
            setError("All fields are required");
            return;
        }
    }
    
    return (
        <div className="flex flex-col bg-blue-900 items-center justify-center gap-3 p-3">
            Creating new Quiz

            <div>
                Subject: <input className="text-black" name="quiz_subject" value={subject} onChange={e => setSubject(e.target.value)}/>
            </div>
            <button className="bg-blue-950 p-2 rounded-lg hover:bg-white hover:text-black" onClick={handleCreate}>
                Create
            </button>
        </div>
    );
}