import { SignInForm } from "@/app/signin/_components/SignInForm";
import Image from "next/image";

export default function SignIn() {
  return (
    <div className="w-full h-dvh pt-20">
      <div className="flex h-full gap-12 justify-center items-center">
        <Image
          className="md:block hidden"
          src={"/images/SignInImage.png"}
          alt={""}
          width={300}
          height={300}
        />
        <SignInForm />
      </div>
    </div>
  );
}
