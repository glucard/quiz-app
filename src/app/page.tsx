"use client";

import { useGlobalContext } from "@/context/main";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";

export default function Home() {
  // const [newName, setNewName] = useState("");
  // const [newEmail, setNewEmail] = useState("");

  const { newName, setNewName, newEmail, setNewEmail } = useGlobalContext();

  const router = useRouter();

  const handleSubmitIniciar: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(newName, newEmail);
    // Ir para pagina do quiz
    router.push("/QuizAppMenu");
  };

  return (
    <main className="flex flex-col items-center gap-3">
      <p className="text-white text-lg px-5 text-center">
        Teste seus conhecimentos sobre Ciência da Computação!
      </p>
      <div>
        <form
          onSubmit={handleSubmitIniciar}
          className="flex flex-col items-center gap-2"
        >
          <div>
            <label htmlFor="newName">Nome:</label>
            <input
              type="text"
              name="newName"
              id="newName"
              className="text-black p-2"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="newEmail">Email:</label>
            <input
              type="email"
              name="newEmail"
              id="newEmail"
              className="text-black p-2"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-orange-400 hover:bg-orange-600 font-bold py-2 px-4 rounded-full"
            >
              Start Quiz
            </button>
          </div>
        </form>
      </div>
      {/* <Link href="/quiz">
        <button className="bg-orange-400 hover:bg-orange-600 font-bold py-2 px-4 rounded-full">
          Start Quiz
        </button>
      </Link> */}
    </main>
  );
}
