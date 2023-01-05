import { NextFetchEvent, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  console.log("I'm global");

  if (req.nextUrl.pathname.startsWith("/chats")) {
    console.log("Chat!!!");
  }
}
