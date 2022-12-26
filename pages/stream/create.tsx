import type { NextPage } from "next";
import Button from "@components/button";
import Input from "@components/input";
import Layout from "@components/layout";
import TextArea from "@components/textarea";

const Create: NextPage = () => {
  return (
    <Layout canGoBack title="Go Live">
      <form className="space-y-4 px-4 py-10">
        <Input label="Name" name="name" type="text" required />
        <Input
          label="Price"
          name="price"
          type="text"
          kind="price"
          placeholder="0.00"
          required
        />
        <TextArea label="Description" name="description" />
        <Button text="Go Live!" />
      </form>
    </Layout>
  );
};

export default Create;
