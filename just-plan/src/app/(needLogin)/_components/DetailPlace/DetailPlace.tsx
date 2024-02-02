import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog";
import { Input } from "@/components/Input";
import Image from "next/image";
import Comments from "../Comments/Comments";
import { PlaceDetailInfo } from "@/mocks";
import { Button } from "@/components/Button";

const DetailPlace = () => {
  const {
    category,
    title,
    engTitle,
    image,
    mbti,
    status,
    endTime,
    businessHours,
    comments,
  } = PlaceDetailInfo;
  return (
    <DialogContent className="max-w-3xl max-h-full sm:max-h-[150rem] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="mb-3">
          <div className="text-blue-500 text-sm">{category}</div>
          <div className="font-bold text-3xl">{title}</div>
          <div className="text-gray-400 text-sm font-normal">{engTitle}</div>
        </DialogTitle>
        <div className="flex flex-col sm:flex-row justify-between gap-6">
          <div className="flex flex-1 flex-col">
            <Image
              src={image}
              alt="장소 이미지"
              width={400}
              height={300}
              className="rounded-2xl"
            />
            <div className="bg-ourGreen p-1 rounded-e-xl my-5 text-xs font-bold">
              {mbti.join(",")}가 가장 많이 스크랩한 장소입니다.
            </div>
            <div className="flex">
              <div className="text-blue-500 font-bold">
                {status ? "영업중" : "영업 종료"}
              </div>
              <div className="font-bold">{endTime}에 영업 종료</div>
            </div>
            <div className="flex">
              <div className="text-blue-500 font-bold">영업시간 안내</div>
              <div className="font-bold gap-1 flex flex-col">
                {businessHours.map((item) => (
                  <div key={item.id}>
                    {item.day} {item.openTime}~{item.closeTime}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-1 flex-col">
            <div className="flex mb-2">
              <Input
                className="rounded-md mr-2"
                placeholder="댓글을 입력하세요."
              />
              <Button variant={"ghost"} className="w-16">
                댓글 달기
              </Button>
            </div>
            <div className="gap-3 flex flex-col overflow-y-auto">
              {comments.map((comment) => (
                <Comments key={comment.id} comment={comment} />
              ))}
            </div>
          </div>
        </div>
      </DialogHeader>
    </DialogContent>
  );
};

export default DetailPlace;
