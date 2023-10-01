"use client"

import { useState } from "react";

export default function CreateQuiz () {
    
    const [subject, setSubject] = useState("");
    const [error, setError] = useState("");

    async function handleCreate(e: any) {
        e.preventDefault();
        console.log(subject);
        setError("");

        if (subject) {
            try {
                const body = { subject };
                await fetch(`/api/createQuiz`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(body),
                });
            } catch (error) {
                console.error(error);
            }
        } else {
            setError("All fields are required");
            return;
        }
    }
    
    return (
        <div>
            Creating new Quiz

            <form>
                Subject: <input className="text-black" name="quiz_subject" value={subject} onChange={e => setSubject(e.target.value)}/>
                <button onClick={handleCreate}>
                    Create
                </button>
            </form>
        </div>
    );
}