"use client"

import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { useGlobalContext } from "../not_sure";

export default function SetContextComponent() {
  const { newName, setNewName, newEmail, setNewEmail } = useGlobalContext();
  
  return (
    <div className="flex flex-col gap-3 items-center">
    <div>
        <label htmlFor="username">seu nome: </label>
        <input className="text-black" name="username" value={newName}  onChange={e => setNewName(e.target.value)}/>
    </div>
    <div>
        <label htmlFor="email">seu e-mail: </label>
        <input className="text-black" name="email" type="text" value={newEmail} onChange={e => setNewEmail(e.target.value)}/>
    </div>
    </div>
  );
}
