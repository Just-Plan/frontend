import { DialogContent, DialogHeader, DialogTitle } from "@/components/dialog";
import { Input } from "@/components/Input";
import Image from "next/image";
import Comments from "../Comments/Comments";
import { Button } from "@/components/Button";
import { useGetPlaceComment } from "@/hooks/useGetPlaceComment";
import { useGetPlaceDetail } from "@/hooks/useGetPlaceDetail";
import { useEffect, useState } from "react";
import { usePostPlaceComment } from "@/hooks/usePostPlaceComment";
import ENTP from "@/../public/images/ENTP.png";

const DetailPlaceModal = ({
  open,
  placeId,
  name,
  latitude,
  longitude,
}: {
  open: boolean;
  placeId: number;
  name: string;
  latitude: string;
  longitude: string;
}) => {
  // const endTime = "19:00";
  const [commentValue, setCommentValue] = useState("");

  // 장소 상세 정보
  const {
    resultData: placeDetailData,
    error: placeDetailError,
    isLoading: placeDetailIsLoading,
    refetch: placeDetailRefetch,
  } = useGetPlaceDetail(name, latitude, longitude);

  // 댓글
  const {
    data: commentData,
    error: commentError,
    isLoading: commentIsLoading,
    refetch: commentRefetch,
  } = useGetPlaceComment(placeId);

  useEffect(() => {
    if (open) {
      console.log("placeId:", placeId, "모달창!!!");
      placeDetailRefetch();
      commentRefetch();
    }
  }, [open]);

  // useEffect(() => {
  //   if (placeDetailData && commentData) {
  //     console.log(
  //       "data!!!",
  //       "placeDetailData:",
  //       placeDetailData,
  //       "commentData:",
  //       commentData,
  //     );
  //   }
  // }, [placeDetailData, commentData]);

  const { mutate } = usePostPlaceComment();

  const onSubmitComment = () => {
    setCommentValue("");
    mutate({
      placeId: placeId,
      content: commentValue,
    });
  };

  // 영업 종료 시간!
  // 오늘 요일 확인,
  // const temp = placeDetailData?.opening_hours.periods[0].close.time;

  if (placeDetailError || commentError) return <div>에러1111</div>;
  if (placeDetailIsLoading || commentIsLoading) return <div>로딩중</div>;

  // console.log(
  //   "data!!!",
  //   "placeDetailData:",
  //   placeDetailData,
  //   "commentData:",
  //   commentData,
  // );

  placeDetailData && console.log("placeDetail.types", placeDetailData.types);

  return (
    <DialogContent className="max-w-3xl max-h-full sm:max-h-[150rem] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="mb-3">
          <div className="text-blue-500 text-sm">
            {placeDetailData?.types[0]}
          </div>
          <div className="font-bold text-3xl">{placeDetailData?.name}</div>
        </DialogTitle>
        <div className="flex flex-col sm:flex-row justify-between gap-6">
          <div className="flex flex-1 flex-col">
            {placeDetailData?.photos ? (
              <Image
                src={placeDetailData.photos[0].photo_reference as string}
                alt="장소 이미지"
                width={400}
                height={300}
                className="rounded-2xl"
                unoptimized={true}
              />
            ) : (
              <Image
                src={ENTP}
                alt="장소 이미지 없음"
                width={300}
                height={200}
                className="rounded-2xl"
              />
            )}
            {placeDetailData?.mbti !== null &&
            placeDetailData?.mbti.length !== 0 ? (
              <div className="bg-ourGreen p-1 rounded-xl my-5 text-xs font-bold flex justify-center">
                {placeDetailData?.mbti.join(",")}가 가장 많이 스크랩한
                장소입니다.
              </div>
            ) : (
              <div className="bg-ourGreen p-1 rounded-xl my-5 text-xs font-bold flex justify-center">
                아직 스크랩 한 사람이 없습니다.
              </div>
            )}

            {placeDetailData?.opening_hours ? (
              <div>
                <div className="flex">
                  <div className="text-blue-500 font-bold">
                    {placeDetailData.opening_hours.open_now
                      ? "영업중"
                      : "영업 종료"}
                  </div>
                  {/* <div className="font-bold">{temp}에 영업 종료</div> */}
                </div>
                <div className="flex">
                  <div className="text-blue-500 font-bold">영업시간 안내</div>
                  <div className="font-bold gap-1 flex flex-col">
                    {placeDetailData?.opening_hours.weekday_text.map((item) => (
                      <div key={item}>{item}</div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div>영업 정보 없음</div>
            )}
          </div>

          <div className="flex flex-1 flex-col">
            <div className="flex mb-2">
              <Input
                className="rounded-md mr-2"
                placeholder="댓글을 입력하세요."
                value={commentValue}
                onChange={(e) => setCommentValue(e.target.value)}
              />
              <Button
                variant={"ghost"}
                className="w-16"
                onClick={onSubmitComment}
              >
                댓글 달기
              </Button>
            </div>
            <div className="gap-3 flex flex-col overflow-y-auto">
              {commentData?.map((comment) => (
                <Comments
                  key={comment.placeCommentId}
                  placeId={placeId}
                  commentInfo={comment}
                />
              ))}
            </div>
          </div>
        </div>
      </DialogHeader>
    </DialogContent>
  );
};

export default DetailPlaceModal;
