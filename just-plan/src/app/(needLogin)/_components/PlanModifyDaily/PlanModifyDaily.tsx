import { Dialog, DialogTrigger } from "@/components/dialog";
import { AddPlaceModal, StoredPlaceMiniCard } from "..";
import { PlanDayHeader } from "../PlanDayHeader/PlanDayHeader";
import type { DropResult } from "@hello-pangea/dnd";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
import { StoredPlaceCardDnD } from "@/components/StoredPlaceCard/StoredPlaceCardDnD";
import DayPlanCardDnD from "@/components/DayPlanCard/DayPlanCardDnD";
import { useAtom } from "jotai";
import { addedPlace, deletePlaceAtom, storedPlace } from "@/store/place.atoms";
import MyMap from "@/components/MyMap/MyMap";
import type { IRegion } from "@/types/plan.types";
import type { MouseEvent } from "react";
import type { IPlaceResponse } from "@/types/place.types";

const PlanModifyDaily = ({
  day,
  planRegion,
  places,
  planId,
}: {
  day: string;
  planRegion: IRegion;
  places: IPlaceResponse;
  planId: number;
}) => {
  const [stored, setStored] = useAtom(storedPlace);
  const [added, setAdded] = useAtom(addedPlace);

  const [placeDeleteIds, setPlaceDeleteIds] = useAtom(deletePlaceAtom);
  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;
    const sourceKey = source.droppableId;
    const destinationKey = destination.droppableId;

    // 드래그 된 아이템 제거 및 저장
    const itemToMove =
      sourceKey === "stored"
        ? stored.splice(source.index, 1)[0]
        : added[day].splice(source.index, 1)[0];

    // 아이템을 새 위치에 삽입
    if (destinationKey === "stored") {
      const newStored = [...stored];
      newStored.splice(destination.index, 0, itemToMove);
      setStored(newStored);
    } else {
      const newAdded = [...added[day]];
      newAdded.splice(destination.index, 0, itemToMove);
      setAdded({
        ...added,
        [day]: newAdded,
      });
    }
  };

  const onDeletePlace = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    deletePlaceId: number,
  ) => {
    e.stopPropagation();
    // stored에서 삭제
    const newStored = stored.filter((item) => item.placeId !== deletePlaceId);
    setStored(newStored);

    // 삭제한거 placeDeleteIds에 넣기
    setPlaceDeleteIds([...placeDeleteIds, deletePlaceId]);
  };
  console.log(planRegion);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="bg-ourGreen flex flex-row p-3 sm:p-5 rounded-2xl gap-5">
        <div className="bg-white rounded-2xl p-5 hidden sm:block">
          <div className="mb-5 flex justify-between">
            <div className="text-2xl font-bold ">장소 보관함</div>
            <Dialog>
              <DialogTrigger className="flex h-full bg-indigo-400 rounded-none text-white p-2">
                장소 추가
              </DialogTrigger>
              <AddPlaceModal planId={planId} />
            </Dialog>
          </div>

          <Droppable droppableId={"stored"}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={cn(
                  "flex flex-col gap-5",
                  snapshot.isDraggingOver ? "shadow-lg" : "",
                )}
              >
                {stored.map((item, index) => (
                  <Draggable
                    key={item.name} // id
                    draggableId={item.name.toString()} // id
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <StoredPlaceCardDnD
                        key={item.name}
                        item={item}
                        provided={provided}
                        snapshot={snapshot}
                        onDeletePlace={onDeletePlace}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        <div className="flex flex-col w-full">
          <PlanDayHeader isModify />
          <div className="flex bg-white mb-3 p-2 gap-3 rounded-xl overflow-x-auto sm:hidden">
            {stored.map((item) => (
              <StoredPlaceMiniCard key={item.name} place={item} />
            ))}
          </div>
          <div className="flex gap-5">
            <DayPlanCardDnD dayPlan={added[day]} day={day} />
            <div className="bg-white w-full hidden sm:block">
              <MyMap
                places={places.daysPlaces[day]}
                day={day}
                planRegion={planRegion}
              />
            </div>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default PlanModifyDaily;
