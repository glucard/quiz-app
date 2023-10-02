import prisma from "../../../lib/prisma";

export default async function createQuestion(req, res) {
    const { statement, correct_answer, quiz_id } = req.body;

    const result = await prisma.question.create({
        data: {
            statement: statement,
            correct_answer: correct_answer,
            quiz_id: quiz_id,
        },
    });
    console.log(result);
    res.json(result);

}