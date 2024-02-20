import type { IPlace } from "@/types/place.types";
import type {
  DraggableProvided,
  DraggableStateSnapshot,
} from "@hello-pangea/dnd";
import type { MouseEvent } from "react";

export interface IProps {
  item: IPlace;
  onClickAdd: (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    place: IPlace,
  ) => void;
}

export interface IDnDProps {
  item: IPlace;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
  onDeletePlace: (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    deletePlaceId: number,
  ) => void;
}
