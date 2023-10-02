import prisma from "../../../lib/prisma";

export default async function getById(req, res) {
    const { id } = req.body

    const result = await prisma.quiz.findFirst({
        where: {
            id: id,
        },
        include: {
            questions: {
                include: {
                    answers: true,
                }
            }
        }
    });
    console.log(result);
    res.json(result);

}