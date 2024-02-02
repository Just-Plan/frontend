import { IPlanInfoDetail } from "@/types/plan.types";
import { atom } from "jotai";

export const planInfoAtom = atom<IPlanInfoDetail | null>(null);
