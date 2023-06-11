import prisma from "../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

// POST /api/diagnosis
// Required fields in body: title
// Optional fields in body: content
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { answer, answer_2, answered_user } = req.body;
  console.log("-----", req.body);
  const result = await prisma.diagnosis.create({
    data: {
      answer: answer,
      answer_2: answer_2,
      answered_user: answered_user,
      // answeredUserId: answeredUserId,
    },
  });
  res.json(result);
}
