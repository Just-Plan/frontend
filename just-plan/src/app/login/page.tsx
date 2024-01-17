import { LoginForm } from "@/app/login/components/LoginForm";
import Image from "next/image";

export default function Login() {
  return (
    <div className="w-full h-dvh ">
      <div className="flex h-full gap-4 justify-center items-center">
        <Image
          className="md:block hidden"
          src={"/images/LoginImage.png"}
          alt={""}
          width={300}
          height={300}
        />
        <LoginForm />
      </div>
    </div>
  );
}
