import { MbtiCardContent } from "@/mocks";
import { ExampleChart } from "./chart";
import { Card } from "@/components/Card";
import { mypageData } from "@/mocks/mypage";
import { useState } from "react";
import { cn } from "@/lib/utils";

const MyAccountBook = () => {
  const [selectedCardData, setSelectedCardData] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  // Function to handle card click
  const handleCardClick = (item: any) => {
    setSelectedCardData(item);
    setSelectedCard(item.id);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-1 ">
        <div className="h-80 overflow-y-auto md:px-0 flex flex-col flex-1  gap-5">
          {mypageData.map((item) => (
            <Card
              key={item.id}
              className={cn(
                "p-4 cursor-pointer",
                selectedCard === item.id ? "bg-green-200" : "bg-ourGreen",
              )}
              onClick={() => handleCardClick(item)}
            >
              <div className="flex gap-6">
                <span>{item.loc}</span>
                <span className="text-gray-400 flex-1">
                  {item.startDate} ~ {item.endDate}
                </span>
              </div>
              <span>{item.title}</span>
            </Card>
          ))}
        </div>
      </div>
      {selectedCardData && (
        <div>
          <ExampleChart selectedData={selectedCardData} />
        </div>
      )}
    </div>
  );
};

export default MyAccountBook;
