import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    session: { user },
    body: { name, price, description },
  } = req;

  if (req.method === "POST") {
    const stream = await client.stream.create({
      data: {
        name,
        price,
        description,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({
      ok: true,
      stream,
    });
  } else if (req.method === "GET") {
    const { page } = req.query;

    const streamCount = await client.product.count();

    const streams = await client.stream.findMany({
      take: 10,
      skip: (Number(page) - 1) * 10,
    });
    res.json({ ok: true, streams, pages: Math.ceil(streamCount / 10) });
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);
