import { Button } from "@/components/Button";
import DateRangePicker from "@/components/DateRangePicker/DateRangePicker";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import useFetchComposed from "@/hooks/useFetchComposed";
import { convertDateFormat } from "@/utils/convertDateFormat";
import { addDays } from "date-fns";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import type { DatePickerProps } from "../../AddPlan.types";
import { useRouter } from "next/navigation";

export const DatePicker = ({
  planName,
  searchResults,
  onPreviousStep,
  onSelectDate,
}: DatePickerProps) => {
  const [hashTags, setHashTags] = useState<string[]>([]);
  const router = useRouter();

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 3),
  });
  const [fetchData, { data }] = useFetchComposed<any>("/api/plan", "POST");
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const words = inputValue.split(/\s+/);

    const hashtags = words
      .filter((word) => word.length >= 1 && word.length <= 5)
      .slice(0, 4);

    setHashTags(hashtags);
  };

  const handleNextStep = () => {
    onSelectDate(date);

    fetchData({
      title: planName,
      tags: hashTags,
      startDate: convertDateFormat(date?.from),
      endDate: convertDateFormat(date?.to),
      regionId: searchResults.id,
    })
      .then(() => {
        router.push(`/detail-plan?planId=${data.data.planId}`);
      })
      .catch((error) => {
        console.error("Error occurred while fetching data:", error);
      });
  };

  return (
    <div className="flex flex-col gap-5">
      <Label>여행 기간은 어떻게 되시나요?</Label>
      <DateRangePicker date={date} setDate={setDate} />
      <Label>해쉬태그를 입력해주세요</Label>
      <Input type="text" onChange={handleInputChange} />
      <div className="flex gap-2">
        {hashTags.map((tag, index) => (
          <div key={index} className="bg-white p-1 rounded-lg">
            {tag}
          </div>
        ))}
      </div>
      <Button onClick={onPreviousStep}>이전</Button>
      <Button onClick={handleNextStep}>다음</Button>
    </div>
  );
};
