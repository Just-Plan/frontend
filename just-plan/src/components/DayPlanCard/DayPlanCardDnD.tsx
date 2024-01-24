import React, { PropsWithChildren, useState } from "react";
import { Switch } from "../Switch";
// import type { IProps } from "./DayPlanCard.types";
import { Plan } from "@/mocks";
import { AddedPlaceCard } from "..";
import { DragDropContext, Draggable, DraggableProvided, DraggableStateSnapshot, DropResult, Droppable } from "@hello-pangea/dnd";
import { ILocationInfo } from "@/types/plan.types";
import { cn } from "@/lib/utils";
import { AddedPlaceCardDnD } from "../AddedPlaceCard/AddedPlaceCardDnD";
import { IPlan } from "./DayPlanCard.types";

type TItemStatus = "stored" | "added";

type ITems = {
  [key in TItemStatus]: ILocationInfo[];
}
export interface IProps {
  item: IPlan;
  items: ITems;
  setItems: (items: ITems) => void;
}

const DayPlanCardDnD = ({ item, items, setItems }: PropsWithChildren<IProps>) => {
  const { id, date, image, title, category, address } = item;

  // 요기를 modify 거기로 이동시키자.
  // const [items, setItems] = useState<ITems>({
  //   stored: [],
  //   added: Plan,
  // });

  return (
    // <DragDropContext onDragEnd={onDragEnd}>

          
        <div className="bg-white flex flex-col w-fit p-6  rounded-3xl">
          <div className="flex justify-between">
            <div>
              <div className="font-bold text-2xl text-slate-400">{id}일차</div>
              <div className="text-slate-400 text-sm font-bold">{date}</div>
            </div>

            <div className="flex">
              <Switch id={id.toString()} />
              <label htmlFor={id.toString()} className="ml-3">
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
            {items["added" as TItemStatus].map((item, index) => (
              <Draggable
              key={item.id}
              draggableId={item.id.toString()}
              index={index}
            >
              {(provided, snapshot) => (
                  <AddedPlaceCardDnD key={item.id} item={item} provided={provided} snapshot={snapshot} />
              )}
            </Draggable>
            ))}

              {provided.placeholder}

            {/* {Plan.map((item) => (
              <AddedPlaceCard key={item.id} item={item} />
            ))} */}
          </div>
        </div>
              )}
              </Droppable>
          
      </div>
    // </DragDropContext>

  );
};

export default DayPlanCardDnD;
