import { FieldErrors, useForm } from "react-hook-form";

interface LoginForm {
  username: string;
  password: string;
  email: string;
}

export default function Forms() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginForm>({ mode: "onBlur" });
  const onValid = (data: LoginForm) => {
    console.log("I'm ballad");
    reset();
  };
  const onInvalid = (errors: FieldErrors) => {
    console.log("errors");
  };

  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
      <input
        {...register("username", {
          required: "Username은 필수 항목입니다!",
          minLength: {
            value: 2,
            message: "Username은 두 글자 이상 입력해주세요!",
          },
        })}
        type="text"
        placeholder="Username"
      />
      <input
        {...register("email", {
          required: "Email은 필수 항목입니다!",
          validate: {
            notGmail: (value) =>
              !value.includes("@gmail.com") ||
              "Gmail로는 회원 가입이 불가능합니다.",
          },
        })}
        type="email"
        placeholder="Email"
      />
      {errors.email?.message}
      <input
        {...register("password", { required: "Password는 필수 항목입니다!" })}
        type="password"
        placeholder="Password"
      />
      <input type="submit" value="계정 생성" />
    </form>
  );
}
