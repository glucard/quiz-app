import prisma from "../../../lib/prisma";

export default async function createUserRank(req, res) {
    const { name, email, score, quiz_id } = req.body

    const result = await prisma.UserRank.create({
        data: { name, email, score, quiz_id},
    });

    const result_all = await prisma.UserRank.findMany({
        where: {
            quiz_id: quiz_id
        },
        orderBy: {
          score: 'desc',
        }
    });

    console.log("KSDAOKADOASKDOASKO", result);
    res.json(result_all);

}