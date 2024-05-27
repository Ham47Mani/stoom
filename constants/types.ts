// ===================== Start Sidebar Link Type =====================
export type SidebarLinkType = {
  label: string,
  route: string,
  imgUrl: string
}
// ===================== End Sidebar Link Type =====================

// ===================== Start Home Content Card Type =====================
export type HomeCardType = {
  img: string,
  title: string,
  description: string,
  handleClickValue: 'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstanceMeeting' | undefined,
  route?: string
  style: string
}
// ===================== End Home Content Card Type =====================

// ===================== Start Video Call Info Type =====================
export type VideoCallInfo = {
  dateTime: Date;
  description: string,
  link: string
}
// ===================== End Video Call Info Type =====================

// ===================== Start Call Layout Type =====================
export type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';
// ===================== End Call Layout Type =====================