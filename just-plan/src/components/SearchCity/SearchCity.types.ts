import type { IRegion } from "@/types/plan.types";
import type { SetStateAction } from "jotai";
import type { Dispatch } from "react";

export interface IProps {
  setRegion: Dispatch<SetStateAction<IRegion>>;
}
