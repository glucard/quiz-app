import prisma from "../../../lib/prisma";

export default async function createQuiz(req, res) {
    const { subject } = req.body

    const result = await prisma.quiz.create({
        data: {
            subject: subject,
        },
    });
    console.log(result);
    res.json(result);

}