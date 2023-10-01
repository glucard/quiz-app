"use client"

import Image from "next/image";
import Link from "next/link";
import SetContextComponent from "@/components/splash/SetContextComponent";

export default function Splash() {

  return (
    
    <main className="flex flex-col items-center gap-3">
      <SetContextComponent />
      <Link href="/home">
        <button>Enter</button>
      </Link>
    </main>
  );
}
