import type { NextPage } from "next";
import Link from "next/link";
import Layout from "@components/layout";

const Chats: NextPage = () => {
  return (
    <Layout title="채팅" hasTabBar>
      <div className="divide-y-[1px]">
        {[1, 2, 3, 4, 5, 6, 7].map((_, index) => (
          <Link href={`/chats/${index}`} legacyBehavior key={index}>
            <a className="px-4 flex cursor-pointer py-3 items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-slate-300" />
              <div>
                <p className="text-gray-700">Daegil</p>
                <p className="text-sm text-gray-500">안사요</p>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Chats;
