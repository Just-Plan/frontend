import { Button } from "@/components/ui/Button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const MemoModal = () => {
  return (
    <DialogContent className="sm:max-w-[550px]">
      <DialogHeader>
        <DialogTitle>메모</DialogTitle>
        <DialogDescription className="flex justify-between border-t-2 border-b-2 py-1">
          <div className="bg-white w-14 h-8 rounded-3xl border hover:cursor-pointer"></div>
          <div className="bg-[#FEE4E3] w-14 h-8 rounded-3xl hover:cursor-pointer"></div>
          <div className="bg-[#E3F5F6] w-14 h-8 rounded-3xl hover:cursor-pointer"></div>
          <div className="bg-[#F0F7D9] w-14 h-8 rounded-3xl hover:cursor-pointer"></div>
          <div className="bg-[#FFF3CC] w-14 h-8 rounded-3xl hover:cursor-pointer"></div>
          <div className="bg-[#F6D9FE] w-14 h-8 rounded-3xl hover:cursor-pointer"></div>
          <div className="bg-[#D0CFFF] w-14 h-8 rounded-3xl hover:cursor-pointer"></div>
        </DialogDescription>
      </DialogHeader>
      <div className="bg-red-100 flex h-96 p-5">asdfasdf</div>
      <DialogFooter className="m-auto">
        <Button type="submit">저장하기</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default MemoModal;
