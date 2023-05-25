import prisma from "../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next"
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req: NextApiRequest, res: NextApiResponse) {

  const session = await getServerSession(req, res, authOptions)
  const { title, content } = req.body;
  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: { connect: { email: session?.user?.email } },
    },
  });
  res.json(result);
}
