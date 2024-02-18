import { Switch } from "../Switch";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
import { AddedPlaceCardDnD } from "../AddedPlaceCard/AddedPlaceCardDnD";
import { useAtomValue } from "jotai";
import { addedPlace } from "@/store/place.atoms";
import type { IDnDProps } from "./DayPlanCard.types";

const DayPlanCardDnD = ({ dayPlan, day }: IDnDProps) => {
  const added = useAtomValue(addedPlace);
  console.log(dayPlan);
  const date = "2024-01-01"; // 임시
  if (day !== "1" && day !== "2") return; // 임시

  // const origin = "37.7749,-122.4194"; // 샌프란시스코의 좌표
  // const destination = "34.0522,-118.2437"; // 로스앤젤레스의 좌표

  const latLongArray = added[day].map((item) => [
    item.latitude,
    item.longitude,
  ]);
  // Directions API 호출
  // fetch(
  //   `/google/api/directions/json?origin=${origin}&destination=${destination}&key=${process.env.NEXT_PUBLIC_GOOGLEMAP_API_KEY}`,
  // )
  //   .then((response) => response.json())
  //   .then((data) => {
  //     const duration = data.routes[0].legs[0].duration.text;

  //     console.log("이동 시간:", duration);
  //   })
  //   .catch((error) => {
  //     console.error("Directions API 호출 중 오류:", error);
  //   });

  // any 나중에 수정 필요
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function getTravelTimes(coordinates: string | any[]) {
    const travelTimes = [];

    for (let i = 0; i < coordinates.length - 1; i++) {
      const origin = coordinates[i];
      const destination = coordinates[i + 1];

      try {
        const response = await fetch(
          `/google/api/directions/json?origin=${origin}&destination=${destination}&key=${process.env.NEXT_PUBLIC_GOOGLEMAP_API_KEY}`,
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data);
        const duration = data.routes[0].legs[0].duration.text;
        travelTimes.push(duration);
      } catch (error) {
        console.error("Directions API 호출 중 오류:", error);
        travelTimes.push(null); // Push null to indicate error for this pair
      }
    }

    return travelTimes;
  }

  getTravelTimes(latLongArray).then((travelTimes) => {
    console.log("이동 시간 배열:", travelTimes);
  });
  console.log(added[day], latLongArray);

  return (
    <div className="bg-white flex flex-col w-fit p-6  rounded-3xl">
      <div className="flex justify-between">
        <div>
          <div className="font-bold text-2xl text-slate-400">{day}일차</div>
          <div className="text-slate-400 text-sm font-bold">{date}</div>
        </div>

        <div className="flex">
          <Switch id={day} />
          <label htmlFor={day} className="ml-3">
            대중교통
          </label>
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
              {added[day].map((item, index) => (
                <Draggable
                  key={item.name}
                  draggableId={item.name.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <AddedPlaceCardDnD
                      key={item.name}
                      item={item}
                      time={10}
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
