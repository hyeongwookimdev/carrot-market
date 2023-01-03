import { NextPage } from "next";
import Input from "@components/input";
import Layout from "@components/layout";
import useUser from "@libs/client/useUser";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Button from "@components/button";
import useMutation from "@libs/client/useMutation";

interface EditProfileForm {
  name?: string;
  email?: string;
  phone?: string;
  formErrors?: string;
  avatar?: FileList;
}

interface EditProfileResponse {
  ok: boolean;
  error?: string;
}

const Edit: NextPage = () => {
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
    watch,
  } = useForm<EditProfileForm>();

  useEffect(() => {
    if (user?.email) setValue("email", user.email);
    if (user?.phone) setValue("phone", user.phone);
    if (user?.name) setValue("name", user.name);
    if (user?.avatar)
      setAvatarPreview(
        `https://imagedelivery.net/lnVuxhDkMDETw9i7jrccNA/${user?.avatar}/avatar`
      );
  }, [user, setValue]);

  const [editProfile, { data, loading }] =
    useMutation<EditProfileResponse>("/api/users/me");

  const onValid = async ({ email, phone, name, avatar }: EditProfileForm) => {
    if (loading) return;
    if (email === "" && phone === "" && name === "") {
      return setError("formErrors", {
        message: "이메일 또는 전화번호를 입력해주세요.",
      });
    }
    if (avatar && avatar.length > 0 && user) {
      const { uploadURL } = await (await fetch(`/api/files`)).json();
      const form = new FormData();
      form.append("file", avatar[0], user?.id + "");
      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: "POST",
          body: form,
        })
      ).json();
      editProfile({
        email,
        phone,
        name,
        avatarId: id,
      });
    } else {
      editProfile({
        email,
        phone,
        name,
      });
    }
  };

  useEffect(() => {
    if (data && !data.ok) {
      return setError("formErrors", {
        message: data.error,
      });
    }
  }, [data, setError]);

  const [avatarPreview, setAvatarPreview] = useState("");
  const avatar = watch("avatar");

  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setAvatarPreview(URL.createObjectURL(file));
    }
  }, [avatar]);

  return (
    <Layout canGoBack title="Edit Profile">
      <form onSubmit={handleSubmit(onValid)} className="py-10 px-4 space-y-4">
        <div className="flex items-center space-x-3">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              className="w-14 h-14 rounded-full bg-slate-300"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-slate-300" />
          )}
          <label
            htmlFor="picture"
            className="cursor-pointer py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-gray-700"
          >
            Change
            <input
              {...register("avatar")}
              id="picture"
              type="file"
              accept="image/*"
              className="hidden"
            />
          </label>
        </div>
        <Input
          register={register("name")}
          label="Name"
          name="name"
          type="text"
          required={false}
        />
        <Input
          register={register("email")}
          label="Email address"
          name="email"
          type="email"
          required={false}
        />
        <Input
          register={register("phone")}
          label="Phone number"
          name="phone"
          type="number"
          kind="phone"
          required={false}
        />
        {errors.formErrors ? (
          <span className="my-2 text-red-600 font-semibold text-center block">
            {errors.formErrors.message}
          </span>
        ) : null}
        <Button text={loading ? "Loading..." : "Upadte profile"} />
      </form>
    </Layout>
  );
};

export default Edit;
