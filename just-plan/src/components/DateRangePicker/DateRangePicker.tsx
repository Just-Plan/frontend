"use client";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover";
import { cn } from "@/lib/utils";
import { HTMLAttributes, useState } from "react";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/calendar";
import { CalendarIcon } from "lucide-react";
import { Button } from "../Button";
import { addDays, format } from "date-fns";

interface DateRangePickerProps extends HTMLAttributes<HTMLDivElement> {
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
}

const DateRangePicker = ({
  className,
  date,
  setDate,
}: DateRangePickerProps) => {
  return (
    <div className={cn("grid gap-2")}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-norma",
              !date && "text-muted-foreground",
              className,
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateRangePicker;
