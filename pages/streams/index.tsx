import { NextPage } from "next";
import Link from "next/link";
import FloatingButton from "@components/floating-button";
import Layout from "@components/layout";
import { Stream } from "@prisma/client";
import useSWR from "swr";
import { useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";

interface StreamsResponse {
  ok: boolean;
  streams: Stream[];
}

const Live: NextPage = () => {
  const [page, setPage] = useState(1);
  const { data } = useSWR<StreamsResponse>(`/api/streams?page=${page}`);

  const onNextPageClick = () => {
    setPage((prev) => prev + 1);
  };

  const onPrevPageClick = () => {
    if (page === 1) return;
    setPage((prev) => prev - 1);
  };

  return (
    <Layout title="라이브" hasTabBar>
      <div className="divide-y-[1px] space-y-4">
        {data?.streams?.map((stream) => (
          <Link href={`/streams/${stream.id}`} legacyBehavior key={stream.id}>
            <a className="px-4 block pt-4">
              <div className="bg-slate-300 w-full rounded-md shadow-sm aspect-video" />
              <h1 className="text-2xl mt-2 font-bold text-gray-900">
                {stream.name}
              </h1>
            </a>
          </Link>
        ))}
        <div className="flex justify-center space-x-20 text-2xl">
          <button onClick={onPrevPageClick}>⬅️</button>
          <button onClick={onNextPageClick}>➡️</button>
        </div>

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
