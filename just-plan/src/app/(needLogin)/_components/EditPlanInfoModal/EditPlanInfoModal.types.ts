import { IPlanInfo } from "@/types/plan.types";
import { Dispatch, SetStateAction } from "react";

export interface IProps {
  info: IPlanInfo;
  setInfo: Dispatch<SetStateAction<IPlanInfo>>;
}
