import { SignUpForm } from "@/app/signup/components/SignUpForm";
import Image from "next/image";

export default function SignUp() {
  return (
    <div className="w-full h-dvh ">
      <div className="flex h-full gap-4 justify-center items-center">
        <Image
          className="md:block hidden"
          src={"/images/SignUpImage.png"}
          alt={""}
          width={300}
          height={300}
        />
        <SignUpForm />
      </div>
    </div>
  );
}
