"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/Avatar";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { localStorageUserInfoAtom } from "@/store/auth.atom";
import { useAtom } from "jotai";
import { useEffect } from "react";

const LeftSide = () => {
  const [userInfo, setUserInfo] = useAtom(localStorageUserInfoAtom);
  // const [preview, setPreview] = useState("");

  // 회원 정보 조회
  const {
    data: userInfoData,
    error: userInfoError,
    isLoading: userInfoIsLoading,
  } = useGetUserInfo();

  useEffect(() => {
    if (userInfoData) {
      console.log("데이터 받아오기", userInfoData);
      setUserInfo({
        ...userInfo,
        background: userInfoData.background,
        totalScrap: userInfoData.totalScrap,
        totalUserPlan: userInfoData.totalUserPlan,
        introduction: userInfoData.introduction,
      });
    }
  }, [userInfoData]);

  // const [preview, setPreview] = useState<string | null>("");
  // const imgRef = useRef<HTMLInputElement>(null);

  // const onChangeImg = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files !== null) {
  //     const file = event.target.files[0];
  //     if (file && file.type.substring(0, 5) === "image") {
  //       // FileReader를 사용하여 파일 내용을 읽고, 데이터 URL로 변환
  //       const reader = new FileReader();
  //       reader.onloadend = () => {
  //         // 파일 읽기 완료 시, 미리보기 상태 업데이트
  //         setPreview(reader.result as string);
  //       };
  //       reader.readAsDataURL(file); // 파일을 Data URL 형태로 읽기
  //     } else {
  //       // 선택된 파일이 이미지가 아닌 경우, 상태 초기화
  //       setPreview(null);
  //     }
  //   }
  // };
  // const { mutate } = usePostProfileImg();

  // const uploadImage = () => {
  //   if (preview) {
  //     const formData = new FormData();
  //     formData.append("file", preview); // 이미지 파일을 FormData에 추가

  //     mutate({ formData: formData, email: userInfo.email });
  //   }
  // };

  if (userInfoError) return <div>에러</div>;
  if (userInfoIsLoading) return <div>로딩중</div>;

  return (
    <div className="flex flex-col justify-center items-center px-5 gap-5">
      {/* <div onClick={uploadImage}>버튼</div>
      <div>
        <Label htmlFor="chooseFile">
          <Image src={edit} width={20} height={20} alt="수정" />
        </Label>
      </div>
      <input
        id="chooseFile"
        name="img"
        type="file"
        accept="image/*"
        onChange={onChangeImg}
        className="hidden"
        ref={imgRef}
      />
      <Image src={preview || ""} width={100} height={100} alt="파일 이미지" /> */}
      <Avatar className="w-full h-full max-h-72 max-w-72 shadow-lg">
        <AvatarImage src={userInfo.profile!} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex justify-center flex-col items-center ">
        <div className=" font-extrabold text-white bg-gray-300 w-full text-center mb-2">
          {userInfo?.mbtiName.toUpperCase()}
        </div>
        <div className="text-2xl font-bold text-gray-700">
          {userInfoData?.name}
        </div>
        <div className="font-extralight text-sm text-gray-600">
          {userInfoData?.email}
        </div>
      </div>
      <p className="text-center text-gray-500">
        {userInfoData?.introduction ||
          "아직 소개글이 없습니다. 소개글을 입력해보세요!"}
      </p>
      <div className="flex justify-center flex-col items-center ">
        <div className="text-lg font-bold text-gray-600">총 게시글 수</div>
        <div className="text-gray-500">{userInfo?.totalUserPlan}</div>
      </div>
      <div className="flex justify-center flex-col items-center ">
        <div className="text-lg font-bold text-gray-600">총 스크랩 수</div>
        <div className="text-gray-500">{userInfo?.totalScrap}</div>
      </div>
    </div>
  );
};

export default LeftSide;
