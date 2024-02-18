import type { IModifyPlanInfo } from "@/types/plan.types";

export interface IProps {
  info: IModifyPlanInfo;
  onSubmitModify: (modifyInfo: IModifyPlanInfo) => void;
}
