import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, phone } = req.body;
  const payload = phone ? { phone: +phone } : { email };
  const user = await client.user.upsert({
    where: {
      ...payload,
    },
    create: {
      name: "알 수 없는 유저",
      ...payload,
    },
    update: {},
  });
  console.log(user);

  return res.json({ ok: true });
}

export default withHandler("POST", handler);
