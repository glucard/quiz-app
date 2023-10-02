import prisma from "../../../lib/prisma";

export default async function createAnswer(req, res) {
    const { question_id, value } = req.body;

    const result = await prisma.answer.create({
        data: {
            question_id: question_id,
            value: value,
        },
    });
    console.log(result);
    res.json(result);

}