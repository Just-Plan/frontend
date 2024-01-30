import { IPlanInfo, IPlanInfoDetail } from "@/types/plan.types";
import { Dispatch, SetStateAction } from "react";

export interface IProps {
  info: IPlanInfoDetail;
  setInfo: Dispatch<SetStateAction<IPlanInfoDetail>>;
}
