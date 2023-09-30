"use client"

import Image from "next/image";
import Link from "next/link";
import {  GlobalContextProvider } from "../components/not_sure";
import SetContextComponent from "@/components/splash/setContextComponent";

export default function Splash() {

  return (
    
    <main className="flex flex-col items-center gap-3">
      <GlobalContextProvider>
        <SetContextComponent />
      </GlobalContextProvider>
      <Link href="/home">
        <button>Enter</button>
      </Link>
    </main>
  );
}
