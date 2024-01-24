import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";

const EditMemberInfo = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-5 px-5">
      <div className="w-full flex flex-col gap-5">
        <Label>내 정보 수정하기</Label>
        <div className="w-1/2 flex items-center ">
          <Label className="w-1/2">이름</Label>
          <Input id="name" placeholder="강윤지" />
        </div>
        <div className="w-1/2 flex items-center ">
          <Label className="w-1/2">나의 MBTI</Label>
          <Input id="name" placeholder="INFP" />
        </div>
        <Button className="w-fit" size={"lg"}>
          수정사항 저장
        </Button>
      </div>
      <div className="w-full flex flex-col gap-5">
        <Label>비밀번호 수정하기</Label>
        <Button
          className={cn("rounded-3xl py-5 w-fit bg-ourGreen hover:bg-ourGreen")}
          size={"sm"}
          variant={"secondary"}
        >
          이메일 인증 후 비밀번호 변경
        </Button>
      </div>
    </div>
  );
};

export default EditMemberInfo;
