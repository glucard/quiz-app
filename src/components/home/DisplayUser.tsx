"use client"

import { useGlobalContext } from "../not_sure";

export default function DisplayUser(){
    const { newName, setNewName, newEmail, setNewEmail } = useGlobalContext();

    return (
        <p>Olá, {newName}.</p>
    );
}