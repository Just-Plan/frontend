"use client";

import { useDebounde } from "@/hooks";
import { useGetCities } from "@/hooks/useGetCities";
import { useSearchRegion } from "@/hooks/useSearchRegion";
import type { IRegion } from "@/types/plan.types";
import { useEffect, useState } from "react";
import type { IProps } from "./SearchCity.types";
import { ScrollArea } from "../ScrollArea";
import { Spinner } from "../Spinner";

export const SearchCity = ({ setRegion }: IProps) => {
  const [searchRegion, setSearchRegion] = useState("");
  const { data: searchResult, error, isLoading } = useGetCities();

  const debouncedValue = useDebounde(searchRegion, 500);
  const {
    data: searchRegionData,
    error: searchRegionError,
    isLoading: searchRegionIsLoading,
    refetch: searchRegonRefetch,
  } = useSearchRegion(debouncedValue);

  useEffect(() => {
    if (debouncedValue) {
      searchRegonRefetch();
    }
  }, [debouncedValue, searchRegonRefetch]);

  const onClickRegion = (regionInfo: IRegion) => {
    setRegion(regionInfo);
  };

  if (error || searchRegionError) {
    return <div>에러</div>;
  }

  return (
    <>
      <div className="bg-white h-10 rounded-3xl flex justify-between pl-5 pr-5 mt-5 border sm:w-96">
        <input
          className="outline-none bg-transparent"
          placeholder="어디로 떠나고 싶으신가요?"
          value={searchRegion}
          onChange={(e) => setSearchRegion(e.target.value)}
        />
        <svg width={20} viewBox="0 0 24 24" aria-hidden="true" fill="gray">
          <g>
            <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path>
          </g>
        </svg>
      </div>
      <div className="sm:w-96">
        {searchRegion === "" ? ( // 만약, 지역 검색 결과가 없다면
          <ScrollArea className="w-72 sm:w-96 h-48 rounded-md border mt-5 bg-white">
            <div className="py-4 sm:px-4">
              {searchResult?.cities.map((item: IRegion) => (
                <div
                  key={item.id}
                  className="flex justify-between p-1 items-end hover:cursor-pointer hover:bg-gray-100 rounded-md gap-1 px-4"
                  onClick={() => onClickRegion(item)}
                >
                  <div className="font-bold text-neutral-600 text-2xl">
                    {item.koreanName}
                  </div>
                  <div className="text-neutral-400">
                    {item.countryKoreanName}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <ScrollArea className="w-72 sm:w-96 h-48 rounded-md border mt-5 bg-white">
            <div className="py-4 px-4">
              {searchRegionData?.cities.length ? (
                searchRegionData?.cities.map((item: IRegion) => (
                  <div
                    key={item.id}
                    className="flex justify-between p-1 items-end hover:cursor-pointer hover:bg-gray-100 rounded-md gap-1 px-4"
                    onClick={() => onClickRegion(item)}
                  >
                    <div className="font-bold text-neutral-600 text-2xl">
                      {item.koreanName}
                    </div>
                    <div className="text-neutral-400">
                      {item.countryKoreanName}
                    </div>
                  </div>
                ))
              ) : isLoading || searchRegionIsLoading ? (
                <div className="flex justify-center">
                  <Spinner />
                </div>
              ) : (
                <div className="text-center">검색 결과가 없습니다</div>
              )}
            </div>
          </ScrollArea>
        )}
      </div>
    </>
  );
};
