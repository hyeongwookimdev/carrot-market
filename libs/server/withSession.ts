import { withIronSessionApiRoute } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const cookieOptions = {
  cookieName: "carrotsession",
  password: process.env.COOKIE_PASSWORD!,
};

// API route애서 session을 받아오기 위한 함수
export function withApiSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions);
}

// 페이지를 렌더링할 때 Next.js의 Server Side Rendering에서 세션을 받아오는 함수
