"use client";

import { Button } from "@/components/Button";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog";
import Image from "next/image";
import { StoredPlaceMiniCard } from "..";
import { Input } from "@/components/Input";
import { StoredPlaceCard } from "@/components";
import type { ChangeEvent, MouseEvent } from "react";
import { useState } from "react";
import { useSearchPlace } from "@/hooks/useSearchPlace";
import type { IPlace } from "@/types/place.types";
import { useDebounde } from "@/hooks";
import { addStorePlaceAtom, storedPlace } from "@/store/place.atoms";
import { usePostPlaceStored } from "@/hooks/usePostPlaceStored";
import { planInfoAtom } from "@/store";
import { useAtom, useAtomValue } from "jotai";
import { KaKaoMap } from "@/components/Maps/KakaoMap/KaKaoMap";
import GoogleMap from "@/components/Maps/GoogleMap/GoogleMap";

export const AddPlaceModal = ({
  planId,
  cityId,
}: {
  planId: number;
  cityId: number;
}) => {
  const [search, setSearch] = useState("");
  const stored = useAtomValue(storedPlace);
  // 장소 임시 보관함
  const [addStorePlace, setAddStorePlace] = useAtom(addStorePlaceAtom);
  const planInfo = useAtomValue(planInfoAtom);

  // const cityId = 1; // 제주도. 임시!
  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onClickAdd = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    place: IPlace,
  ) => {
    e.stopPropagation();
    console.log(place);

    setAddStorePlace([...addStorePlace, place]);
  };

  const debouncedValue = useDebounde(search, 400);
  const { searchResultData, error, isLoading } = useSearchPlace(
    cityId,
    debouncedValue,
  );

  const { mutate } = usePostPlaceStored();

  const onSubmitStored = () => {
    console.log("되는가 보자:", addStorePlace);
    const bodyTemp = addStorePlace.map((item) => {
      return {
        googlePlaceId: item.googlePlaceId,
        name: item.name,
        formattedAddress: item.formattedAddress,
        types: item.types,
        latitude: item.latitude,
        longitude: item.longitude,
        photoReference: item.photoReference,
      };
    });
    console.log("정제한 body: ", bodyTemp);
    setAddStorePlace([]);
    mutate({ planId: planId, body: bodyTemp });
  };

  if (error) return <div>에러</div>;
  if (isLoading) return <div>로딩중</div>;
  console.log(planInfo.region);
  return (
    <DialogContent className="max-w-md sm:max-w-7xl max-h-[45rem] sm:max-h-[50rem] bg-ourGreen flex flex-col items-center">
      <DialogHeader>
        <DialogTitle className="text-4xl mb-3 mt-5 font-bold">
          여행하고 싶은 장소를 추가해보세요!
        </DialogTitle>
      </DialogHeader>
      <div className="flex gap-5 w-full sm:px-10">
        <div className="flex flex-col items-center gap-5">
          <div className="bg-white flex flex-col justify-center items-center p-3 rounded-full w-20 h-20">
            <Image
              src="/images/archive.png"
              alt="장소 보관함"
              width={50}
              height={50}
            />
            <div className="text-xs font-semibold">장소 보관함</div>
          </div>
          <div className="bg-white p-4 rounded-xl gap-3 flex flex-col h-96 sm:h-[32rem] overflow-y-auto w-20 items-center">
            {stored.map((item) => (
              <StoredPlaceMiniCard key={item.name} place={item} />
            ))}
            {addStorePlace.map((item) => (
              <StoredPlaceMiniCard key={item.name} place={item} isNew />
            ))}
          </div>
        </div>

        <div className="flex gap-5 flex-col">
          <div>
            <Input
              placeholder="떠나고 싶은 장소를 입력해주세요"
              value={search}
              onChange={onChangeSearch}
            />
          </div>
          <div className="bg-white rounded-xl gap-5 flex flex-col h-[26rem] sm:h-[35rem] p-3 sm:p-5 overflow-y-auto  w-[280px] sm:w-96">
            {searchResultData?.map((item: IPlace) => (
              <StoredPlaceCard
                key={item.name}
                item={item}
                onClickAdd={onClickAdd}
              />
            ))}
          </div>
        </div>

        <div className="bg-white w-full sm:block">
          {/* 대한민국이면 카카오, 해외면 구글 */}
          {planInfo.region.countryKoreanName === "대한민국" ? (
            <>
              <KaKaoMap
                planRegion={planInfo.region}
                isStore
                idName="kakao-map-stored"
              />
              <div
                id="kakao-map-stored"
                style={{ width: "100%", height: "100%" }}
              />
            </>
          ) : (
            <GoogleMap planRegion={planInfo.region} isStore />
          )}
        </div>
      </div>
      <DialogFooter className="m-auto w-96 flex">
        <DialogClose asChild>
          <Button
            className="flex-1 bg-gray-300 text-gray-800"
            onClick={() => setAddStorePlace([])}
          >
            닫기
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button className="flex-1" onClick={onSubmitStored}>
            저장하기
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};
