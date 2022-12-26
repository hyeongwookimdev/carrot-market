import { NextPage } from "next";
import Layout from "@components/layout";
import Message from "@components/message";

const LiveDetail: NextPage = () => {
  return (
    <Layout canGoBack>
      <div className="px-4 py-10 space-y-4">
        <div className="bg-slate-300 w-full rounded-md shadow-sm aspect-video" />
        <div className="mt-5">
          <h1 className="text-3xl font-bold text-gray-900">리자몽 스티커</h1>
          <span className="text-2xl block mt-3 text-gray-900">$20</span>
          <p className=" my-6 text-gray-700">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius nam,
            nobis reprehenderit dicta impedit nemo, hic, quia porro officia
            assumenda deserunt quibusdam nostrum magnam fugiat. Beatae atque
            quisquam fugit nemo? Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Nam adipisci molestiae cupiditate incidunt aut
            magni, dolorum laborum optio facere placeat labore exercitationem
            accusantium quasi magnam est voluptatibus explicabo, non deleniti.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Live Chat</h2>
          <div className="py-10 pb-16 h-[50vh] overflow-y-scroll px-4 space-y-4">
            <Message message="리자몽 스티커 얼만가요?" />
            <Message message="2만원이요" reversed />
            <Message message="안사요" />
          </div>
          <div className="fixed w-full mx-auto max-w-md bottom-2 inset-x-0">
            <div className="flex relative items-center">
              <input
                type="text"
                className="pr-12 shadow-sm rounded-full w-full border-gray-300 focus:ring-orange-500 focus:outline-none focus:border-orange-500"
              />
              <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
                <button className="flex items-center text-sm text-white cursor-pointer bg-orange-500 rounded-full px-3 hover:bg-orange-600 focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                  &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LiveDetail;
