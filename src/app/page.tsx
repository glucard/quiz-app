"use client"

import Image from "next/image";
import Link from "next/link";
import { useGlobalContext } from "./not_sure";

export default function Home() {

  function start_handler() {
    let testando = useGlobalContext;
    console.log(testando());
    console.log("Aasdasdasokosk")
  }

  return (
    <main className="flex flex-col items-center gap-3">
        <p className="text-white text-lg px-5 text-center">
          Teste seus conhecimentos sobre Ciência da Computação!
        </p>

        <div className="flex flex-col gap-3 items-center">
          <div>
            <label htmlFor="username">seu nome: </label>
            <input name="username" />
          </div>
          <div>
            <label htmlFor="email">seu e-mail: </label>
            <input name="email" />
          </div>
        </div>

        <Link href="/quiz">
          <button onClick={start_handler} className="bg-orange-400 hover:bg-orange-600 font-bold py-2 px-4 rounded-full">
            Start Quiz
          </button>
        </Link>
    </main>
  );
}
