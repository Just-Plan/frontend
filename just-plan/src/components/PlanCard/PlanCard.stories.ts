import type { Meta, StoryObj } from "@storybook/react";
import PlanCard from "./PlanCard";
import { ComponentType } from "react";

const meta = {
  title: "Example/PlanCard",
  component: PlanCard as ComponentType<any>,
} satisfies Meta<typeof PlanCard>;
export default meta;
type Story = StoryObj<typeof PlanCard>;

const itemData = {
  id: 1,
  image: "/images/image1.png",
  profile: "/images/image1.png",
  name: "강윤지",
  date: "4박 5일",
  money: "1,000,000원",
  count: 137,
  mbti: "INFJ",
  hashTags: [
    { id: 1, tag: "감성" },
    { id: 2, tag: "먹부림" },
  ],
};
export const Primary: Story = {
  args: { item: itemData },
};
