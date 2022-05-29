import { PrismaClient } from '@prisma/client'

export default async function handle(req: any, res: any) {
    const { predictData, predictedValue } = req.body;
    const prisma = new PrismaClient()
    const result = await prisma.soldItems.create({data:{price: predictData.price, amount: predictedValue}})
    res.json(result);
}