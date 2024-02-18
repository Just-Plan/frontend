import type { SetStateAction } from "jotai";
import type { Dispatch } from "react";

export interface IProps {
  setAddHashTags: Dispatch<SetStateAction<string[]>>;
  addHashTags: string[];
  white?: boolean;
}
