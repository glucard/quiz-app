"use client"

import Image from "next/image";
import Link from "next/link";
import { useGlobalContext } from "../../components/not_sure";

export default function Home() {
    
    const { newName, setNewName, newEmail, setNewEmail } = useGlobalContext();

    console.log(newName);

    return (
        <main className="flex flex-col items-center gap-3">
            <p className="text-white text-lg px-5 text-center">
            Teste seus conhecimentos sobre Ciência da Computação!
            </p>

            <Link href="/quiz">
            <button className="bg-orange-400 hover:bg-orange-600 font-bold py-2 px-4 rounded-full">
                Start Quiz
            </button>
            </Link>
        </main>
    );
}
