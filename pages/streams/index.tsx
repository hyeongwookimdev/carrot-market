import { NextPage } from "next";
import Link from "next/link";
import FloatingButton from "@components/floating-button";
import Layout from "@components/layout";
import { Stream } from "@prisma/client";
import useSWR from "swr";
import { useEffect } from "react";
import useSWRInfinite from "swr/infinite";

interface StreamsResponse {
  ok: boolean;
  streams: Stream[];
  pages: number;
}

const Live: NextPage = () => {
  const getKey = (pageIndex: number, previousPageData: StreamsResponse) => {
    if (pageIndex === 0) return `/api/streams?page=1`;
    if (pageIndex + 1 > previousPageData.pages) return null;
    return `/api/streams?page=${pageIndex + 1}`;
  };
  const { data, size, setSize } = useSWRInfinite<StreamsResponse>(getKey);

  const streams = data ? data.map((stream) => stream.streams).flat() : [];

  function handleScroll() {
    if (
      document.documentElement.scrollTop + window.innerHeight ===
      document.documentElement.scrollHeight
    ) {
      setSize((p) => p + 1);
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Layout title="라이브" hasTabBar>
      <div className="divide-y-[1px] space-y-4">
        {streams.map((stream) => (
          <Link href={`/streams/${stream.id}`} legacyBehavior key={stream.id}>
            <a className="px-4 block pt-4">
              <div className="bg-slate-300 w-full rounded-md shadow-sm aspect-video" />
              <h1 className="text-2xl mt-2 font-bold text-gray-900">
                {stream.name}
              </h1>
            </a>
          </Link>
        ))}

        <FloatingButton href="/streams/create">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
};

export default Live;
