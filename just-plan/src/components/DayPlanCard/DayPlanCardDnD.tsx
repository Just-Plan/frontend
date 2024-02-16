import { Switch } from "../Switch";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
import { AddedPlaceCardDnD } from "../AddedPlaceCard/AddedPlaceCardDnD";
import { useAtom } from "jotai";
import { addedPlace, storedPlace } from "@/store/place.atoms";
import { IPlace } from "@/types/place.types";
import { IDnDProps } from "./DayPlanCard.types";


const DayPlanCardDnD = ({ dayPlan, day }: IDnDProps) => {

  const [added, setAdded] = useAtom(addedPlace);

  const date = '2024-01-01'; // 임시
  if (day!=="1" && day!=="2") return; // 임시

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
              snapshot.isDraggingOver ? "shadow-lg" : ""
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
                  <AddedPlaceCardDnD key={item.name} item={item} provided={provided} snapshot={snapshot} />
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
