import { Dialog, DialogTrigger } from "@/components/dialog";
import React, { useState } from "react";
import { AddPlaceModal, StoredPlaceMiniCard } from "..";
import { Plan, StoredPlace } from "@/mocks";
import { StoredPlaceCard } from "@/components";
import { PlanDayHeader } from "../PlanDayHeader/PlanDayHeader";
import DayPlanCard from "@/components/DayPlanCard/DayPlanCard";
import { DragDropContext, Draggable, DropResult, Droppable } from "@hello-pangea/dnd";
import { ILocationInfo } from "@/types/plan.types";
import { cn } from "@/lib/utils";
import { StoredPlaceCardDnD } from "@/components/StoredPlaceCard/StoredPlaceCardDnD";
import DayPlanCardDnD from "@/components/DayPlanCard/DayPlanCardDnD";

type TItemStatus = "stored" | "added";

export type ITems = {
  [key in TItemStatus]: ILocationInfo[];
}

const PlanModifyDaily = ({items, setItems}:{
  items: ITems;
  setItems: (items: ITems) => void;
} ) => {


  // 장소 보관함 변수
  const [storedPlace, setStoredPlace] = useState<ILocationInfo[]>([]);

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;

    const scourceKey = source.droppableId as TItemStatus;
    const destinationKey = destination.droppableId as TItemStatus;

    const _items = JSON.parse(JSON.stringify(items)) as typeof items;
    const [targetItem] = _items[scourceKey].splice(source.index, 1);
    _items[destinationKey].splice(destination.index, 0, targetItem);
    setItems(_items);
  };
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
            <AddPlaceModal />
          </Dialog>
        </div>

          <Droppable droppableId={"stored"}>
          {(provided, snapshot) => (
            <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn(
              "flex flex-col gap-5",
              snapshot.isDraggingOver ? "shadow-lg" : ""
            )}
          >
              {items["stored" as TItemStatus].map((item, index) => (
                <Draggable
                key={item.id}
                draggableId={item.id.toString()}
                index={index}
              >
                {(provided, snapshot) => (
                    <StoredPlaceCardDnD key={item.id} item={item} provided={provided} snapshot={snapshot} />
                )}
              </Draggable>
              ))}

              {provided.placeholder}
            </div>
            )}
          </Droppable>

      </div>
      <div className="flex flex-col w-full">
        <PlanDayHeader days={Plan} isModify />
        <div className="flex bg-white mb-3 p-2 gap-3 rounded-xl overflow-x-auto sm:hidden">
          {StoredPlace.map((item) => (
            <StoredPlaceMiniCard key={item.id} place={item} />
          ))}
        </div>
        <div className="flex gap-5">
          <DayPlanCardDnD item={Plan[0]} items={items} setItems={setItems} />
          <div className="bg-white w-full hidden sm:block">지도</div>
        </div>
      </div>
    </div>
    </DragDropContext>

  );
};

export default PlanModifyDaily;
