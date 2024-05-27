import { HomeCardType } from "./types"

// ===================== Start Sidebar Links =====================
export const SidebarLinks = [
  {
    label: 'Home',
    route: '/',
    imgUrl: '/icons/Home.svg'
  },
  {
    label: 'Upcoming',
    route: '/upcoming',
    imgUrl: '/icons/upcoming.svg'
  },
  {
    label: 'Previous',
    route: '/previous',
    imgUrl: '/icons/previous.svg'
  },
  {
    label: 'Recordings',
    route: '/recordings',
    imgUrl: '/icons/Video.svg'
  },
  {
    label: 'Personal Room',
    route: '/personal-room',
    imgUrl: '/icons/add-personal.svg'
  },
]
// ===================== End Sidebar Links =====================

// ===================== Start Home Content Card =====================
export const HomeBoxsCards: HomeCardType[] = [
  {
    img: "/icons/add-meeting.svg",
    title: "New Meeting",
    description: "Start an instant meeting",
    handleClickValue: "isInstanceMeeting",
    style: "bg-orange"
  },
  {
    img: "/icons/schedule.svg",
    title: "Schedule Meeting",
    description: "Plan your meeting",
    handleClickValue: "isScheduleMeeting",
    style: "bg-blue"
  },
  {
    img: "/icons/recordings.svg",
    title: "View Recordings",
    description: "Check out your recordings",
    handleClickValue: undefined,
    route: "/recordings",
    style: "bg-purple"
  },
  {
    img: "/icons/join-meeting.svg",
    title: "Join Meeting",
    description: "Via invitation link",
    handleClickValue: "isJoiningMeeting",
    style: "bg-yellow"
  }
]
// ===================== End Home Content Card =====================

// ===================== Start Avatar Images =====================
export const avatarImages = [
  "/images/avatar-1.jpeg",
  "/images/avatar-2.jpeg",
  "/images/avatar-3.png",
  "/images/avatar-4.png",
  "/images/avatar-5.png"
]
// ===================== End Avatar Images =====================

