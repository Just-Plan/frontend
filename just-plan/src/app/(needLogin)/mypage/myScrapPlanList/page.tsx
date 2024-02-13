import React from 'react'
import MypageHeader from '../_components/MypageHeader.tsx/MypageHeader'

const page = () => {
  return (
    <div className='flex flex-col w-full'>
      <MypageHeader choose="./myScrapPlanList" />
    </div>
    )
}

export default page