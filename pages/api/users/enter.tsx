import mail from "@sendgrid/mail";
import twilio from "twilio";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

mail.setApiKey(process.env.SENDGRID_API_KEY!);

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { email, phone } = req.body;
  const user = phone ? { phone: +phone } : email ? { email } : null;
  if (!user) return res.status(400).json({ ok: false });
  const payload = Math.floor(100000 + Math.random() * 900000) + "";
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "알 수 없는 유저",
            ...user,
          },
        },
      },
    },
  });
  if (phone) {
    const message = await twilioClient.messages.create({
      messagingServiceSid: process.env.TWILIO_MSID,
      to: process.env.TWILIO_MY_PHONE!, // phone
      body: `당신의 로그인 토큰은 ${payload} 입니다.`,
    });
    console.log(message);
  } else if (email) {
    const email = await mail.send({
      from: "hyeongwookim.dev@gmail.com",
      to: "hyeongwookim.dev@gmail.com",
      subject: "캐럿마켓 인증 메일입니다.",
      text: `당신의 로그인 토큰은 ${payload} 입니다.`,
      html: `<strong>당신의 로그인 토큰은 ${payload} 입니다.</strong>`,
    });
    console.log(email);
  }
  return res.json({
    ok: true,
  });
}

export default withHandler("POST", handler);
