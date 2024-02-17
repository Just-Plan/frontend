import { Button } from "@/components/Button";
import DateRangePicker from "@/components/DateRangePicker/DateRangePicker";
import { Label } from "@/components/Label";
import { addDays } from "date-fns";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import type { DatePickerProps } from "../../AddPlan.types";

export const DatePicker = ({
  onPreviousStep,
  onNextStep,
  onSelectDate,
}: DatePickerProps) => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 3),
  });

  const handleNextStep = () => {
    onSelectDate(date);
    onNextStep();
  };

  return (
    <div className="flex flex-col gap-5">
      <Label>여행 기간은 어떻게 되시나요?</Label>
      <DateRangePicker date={date} setDate={setDate} />

      <div className="flex">
        <Button onClick={onPreviousStep}>이전</Button>
        <Button onClick={handleNextStep}>다음</Button>
      </div>
    </div>
  );
};
