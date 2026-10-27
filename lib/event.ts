// Everything you will edit for the event lives here.
export const EVENT = {
  type: "Hackathon",
  name: "Malfunction",
  year: "2026",
  dateShort: "21 November",
  dateLong: "21 November 2026",
  venueLines: ["i-Academy 5th Floor Filinvest Cebu", "Cyberzone Tower 2"],
  venueOneLine: "i-Academy 5th Floor, Filinvest Cebu Cyberzone Tower 2",
  deadline: "[DEADLINE]",
  intro: "[ONE OR TWO SENTENCES ABOUT THE HACKATHON: WHO IT IS FOR AND WHAT TEAMS WILL BUILD.]",
  about: "[A SHORT PARAGRAPH EXPLAINING THE HACKATHON, ITS THEME AND WHO ORGANIZES IT.]",
  registerNote: "[REGISTRATION NOTES: WHO CAN JOIN, WHAT TO BRING.]",
  contactEmail: "[CONTACT EMAIL]",
  social: "[SOCIAL HANDLE]",
};

// Team size INCLUDING the team leader.
export const TEAM_SIZE = { min: 3, max: 5 };

export const TRACKS = [
  { id: "A", title: "[TRACK OR CHALLENGE ONE]" },
  { id: "B", title: "[TRACK OR CHALLENGE TWO]" },
  { id: "C", title: "[TRACK OR CHALLENGE THREE]" },
];

export const SCHEDULE = [
  { time: "[00:00]", title: "[REGISTRATION AND CHECK-IN]" },
  { time: "[00:00]", title: "[OPENING PROGRAM]" },
  { time: "[00:00]", title: "[HACKING BEGINS]" },
  { time: "[00:00]", title: "[JUDGING AND PRESENTATIONS]" },
  { time: "[00:00]", title: "[AWARDS AND CLOSING]" },
];
