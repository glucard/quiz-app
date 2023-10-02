import prisma from "../../../lib/prisma";

export default async function getAll(req, res) {

    const result = await prisma.quiz.findMany();
    console.log(result);
    res.json(result);

}