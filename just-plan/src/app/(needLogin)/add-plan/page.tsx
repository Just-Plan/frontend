"use client";

import { useState } from "react";
import DayPlanCard from "@/components/DayPlanCard/DayPlanCard";
import { Button } from "@/components/Button";
import { Plan, PlanInfo } from "@/mocks";
import Image from "next/image";
import ShowMoney from "../_components/ShowMoney/ShowMoney";
import { Dialog, DialogTrigger } from "@/components/dialog";
import EditPlanInfoModal from "../_components/EditPlanInfoModal/EditPlanInfoModal";
import type { IPlanInfo } from "@/types/plan.types";

const Page = () => {
  return <div>일정 추가 퍼널</div>;
};

export default Page;
