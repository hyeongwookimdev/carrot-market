import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    session: { user },
  } = req;

  const purchases = await client?.purchase.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      product: {
        include: {
          _count: {
            select: { favorites: true },
          },
        },
      },
    },
  });
  res.json({
    ok: true,
    purchases,
  });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
