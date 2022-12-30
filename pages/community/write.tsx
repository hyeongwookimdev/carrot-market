import type { NextPage } from "next";
import Button from "@components/button";
import Layout from "@components/layout";
import TextArea from "@components/textarea";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { useEffect } from "react";
import { Post } from "@prisma/client";
import { useRouter } from "next/router";

interface WritrForm {
  question: string;
}

interface WriteResponse {
  ok: boolean;
  post: Post;
}

const Write: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<WritrForm>();
  const [post, { loading, data }] = useMutation<WriteResponse>("/api/posts");
  const onvalid = (data: WritrForm) => {
    if (loading) return;
    post(data);
  };
  useEffect(() => {
    if (data && data?.ok) {
      router.push(`/community/${data?.post?.id}`);
    }
  }, [data, router]);
  return (
    <Layout canGoBack title="Write Post">
      <form onSubmit={handleSubmit(onvalid)} className="px-4 py-10">
        <TextArea
          register={register("question", { required: true, minLength: 3 })}
          required
          placeholder="Ask a question!"
        />
        <Button text={loading ? "Loading..." : "Submit"} />
      </form>
    </Layout>
  );
};

export default Write;
