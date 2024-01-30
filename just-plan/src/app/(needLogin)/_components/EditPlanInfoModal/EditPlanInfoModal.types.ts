import {
  IModifyPlanInfo,
  IPlanInfo,
  IPlanInfoDetail,
} from "@/types/plan.types";
import { Dispatch, SetStateAction } from "react";

export interface IProps {
  info: IModifyPlanInfo;
  // setInfo: Dispatch<SetStateAction<IModifyPlanInfo>>;
  onSubmitModify: (modifyInfo: IModifyPlanInfo) => void;
}
