import type { NextPage } from "next";
import Layout from "../../components/layout";

const Chats: NextPage = () => {
  return (
    <Layout title="채팅" hasTabBar>
      <div className="py-10 divide-y-[1px]">
        {[1, 2, 3, 4, 5, 6, 7].map((_, index) => (
          <div
            key={index}
            className="px-4 flex cursor-pointer py-3 items-center space-x-3"
          >
            <div className="w-12 h-12 rounded-full bg-slate-300" />
            <div>
              <p className="text-gray-700">Steve Jebs</p>
              <p className="text-sm text-gray-500">상대방의 마지막 메세지</p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Chats;
