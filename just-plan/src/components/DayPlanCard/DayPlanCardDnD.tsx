/* eslint-disable @typescript-eslint/no-explicit-any */
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
import { AddedPlaceCardDnD } from "../AddedPlaceCard/AddedPlaceCardDnD";
import { useAtomValue } from "jotai";
import { addedPlace } from "@/store/place.atoms";
import type { IDnDProps } from "./DayPlanCard.types";
import { getKaKaoTravelTimes } from "@/utils/kakaoTravelTime";
import { useEffect, useState } from "react";
import { planInfoAtom } from "@/store";

const DayPlanCardDnD = ({ day }: IDnDProps) => {
  const added = useAtomValue(addedPlace);
  const [travelTimes, setTravelTimes] = useState<any[]>([]);
  const planInfo = useAtomValue(planInfoAtom);
  const startDate = new Date(planInfo.startDate); // Parse the start date string

  // Function to add days to the date
  const addDays = (date: Date, days: number) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const dayDate = addDays(startDate, day - 1); // Adjust day by subtracting 1

  useEffect(() => {
    const fetchTravelTimes = async () => {
      const latLongArray = added[day].map((item) => [
        item.longitude,
        item.latitude,
      ]);
      const promises = latLongArray.slice(0, -1).map((startPoint, i) => {
        const endPoint = latLongArray[i + 1];
        return getKaKaoTravelTimes(startPoint, endPoint)
          .then((travelTime) => travelTime)
          .catch((error) => {
            console.error("Error fetching travel time:", error);
            return null;
          });
      });
      const allTravelTimes = await Promise.all(promises);
      setTravelTimes(allTravelTimes);
    };

    fetchTravelTimes();
  }, [added, day]);

  return (
    <div className="bg-white flex flex-col w-fit p-6  rounded-3xl">
      <div className="flex justify-between">
        <div>
          <div className="font-bold text-2xl text-slate-400">{day}일차</div>
          <div className="text-slate-400 text-sm font-bold">
            {dayDate.toISOString().slice(0, 10)}
          </div>
        </div>
      </div>
      <Droppable droppableId={"added"}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn(
              "flex flex-col gap-5",
              snapshot.isDraggingOver ? "shadow-lg" : "",
            )}
          >
            <div className="flex flex-col items-center h-[600px] w-full overflow-y-scroll relative">
              {added[day] &&
                added[day].map((item, index) => (
                  <Draggable
                    key={item.name}
                    draggableId={item.name.toString()}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <AddedPlaceCardDnD
                        key={item.name}
                        item={item}
                        time={travelTimes[index]}
                        provided={provided}
                        snapshot={snapshot}
                      />
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default DayPlanCardDnD;
