import type { NextPage } from "next";
import Item from "../../components/item";
import Layout from "../../components/layout";

const Sold: NextPage = () => {
  return (
    <Layout title="판매 내역" canGoBack>
      <div className="flex flex-col space-y-5 pb-10 divide-y">
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, index) => (
          <Item
            key={index}
            id={index}
            title="리자몽 스티커"
            price={20}
            comments={3}
            hearts={1}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Sold;
