import MeetingTypeList from '@/components/MeetingTypeList';
import React from 'react'

const Home = () => {
  // Configure the time and date
  const now: Date = new Date();
  const time: string = now.toLocaleTimeString("en-DZ", {
    hour: "2-digit",
    minute: "2-digit"
  })
  const date: string = (new Intl.DateTimeFormat("en-DZ", {dateStyle: 'full'})).format(now);

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      {/* ------ Hero Section ------ */}
      <div className="h-[300px] w-full rounded-2xl bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-lg:px-5 max-lg:py-8 lg:p-11">
          <h2 className='glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal'>Upcoming Meeting at: 12:30 PM</h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-extrabold lg:text-6xl">{time}</h1>
            <p className="text-lg font-medium text-sky-1 lg:text-xl">{date}</p>
          </div>
        </div>
      </div>

      {/* ------ Meeting Type list ------ */}
      <MeetingTypeList />
      {/* ------ Meeting Type list ------ */}
    </section>
  )
}

export default Home