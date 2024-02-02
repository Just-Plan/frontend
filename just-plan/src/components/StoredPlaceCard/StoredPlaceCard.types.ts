import { IPlace } from "@/types/place.types";
import { DraggableProvided, DraggableStateSnapshot } from "@hello-pangea/dnd";

export interface IProps {
  item: IPlace;
  onClickAdd: (place: IPlace) => void
}

export interface IDnDProps {
  item: IPlace;
  provided: DraggableProvided,
  snapshot: DraggableStateSnapshot
}
