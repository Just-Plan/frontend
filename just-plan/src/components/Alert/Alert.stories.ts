import { Alert } from "./Alert";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Example/Alert",
  component: Alert,
} satisfies Meta<typeof Alert>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: "destructive" },
};
