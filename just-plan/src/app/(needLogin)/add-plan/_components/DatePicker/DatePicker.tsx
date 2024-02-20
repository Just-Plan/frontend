import { Button } from "@/components/Button";
import { addDays } from "date-fns";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import type { DatePickerProps } from "../../AddPlan.types";
import { Calendar } from "@/components/calendar";

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
    <div className="flex flex-col gap-5 text-center items-center">
      <div className="text-lg text-gray-700">여행 기간은 어떻게 되시나요?</div>
      {/* <DateRangePicker date={date} setDate={setDate} /> */}
      <div className="grid gap-2 bg-white p-2">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
        />
      </div>

      <div className="flex justify-center items-center w-56 sm:w-96">
        <Button className="w-1/2" onClick={onPreviousStep}>
          이전
        </Button>
        <Button className="w-1/2" onClick={handleNextStep}>
          다음
        </Button>
      </div>
    </div>
  );
};
