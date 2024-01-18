import LeftSide from "./_components/leftSide";
import RightSide from "./_components/rightSide";

const MyPage = () => {
  return (
    <div className="w-full h-dvh flex md:flex-row flex-col">
      <div className="bg-white md:w-1/5 min-w-44 ">
        <LeftSide />
      </div>
      <div className="md:w-4/5">
        <RightSide />
      </div>
    </div>
  );
};

export default MyPage;
