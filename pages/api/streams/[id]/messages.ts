import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    body,
    session: { user },
  } = req;

  const message = await client.message.create({
    data: {
      message: body.message,
      stream: {
        connect: { id: Number(id) },
      },
      user: {
        connect: { id: user?.id },
      },
    },
  });

  res.json({ ok: true });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
