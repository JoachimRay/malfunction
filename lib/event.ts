// Everything you will edit for the event lives here.
export const EVENT = {
  type: "Hackathon",
  name: "Malfunction",
  year: "2026",
  dateShort: "21 November",
  dateLong: "21 November 2026",
  venueLines: ["iAcademy Cebu 5th Floor Filinvest Cebu", "Cyberzone Tower 2"],
  venueOneLine: "iAcademy Cebu 5th Floor, Filinvest Cebu Cyberzone Tower 2",
  deadline: "18 November 2026",
  intro: "Malfunction: a hackathon where we solve problems nobody has and somehow make them worse.",
  about: "Welcome to Malfunction, the hackathon where useful is overrated and the solution is probably worse than the problem. Your challenge: take an everyday problem like adjusting the volume, using a calculator, or finding your way and build the most hilariously unhelpful program you can. The more pointless, confusing, or spectacularly inconvenient, the better. Make us laugh, make us wonder why it exists, and maybe make us wish you’d just left the problem alone. The funniest program wins! Hosted by yours truly, the iDE.A club.",
  registerNote: "Anyone can join, bring your own laptop",
  contactEmail: "ideacodingclub@iacademy.edu.ph",
  social: "Facebook: https://www.facebook.com/profile.php?id=61579580901883, Instagram: https://www.instagram.com/ide.a_cebu/, Tiktok: https://www.tiktok.com/@ide.a_cebu?lang=en",
};

// Team size INCLUDING the team leader.
export const TEAM_SIZE = { min: 3, max: 5 };

export const TRACKS = [
  { id: "A", title: "Most Frustrating Program" },
  { id: "B", title: "Creative Use of AI" },
  { id: "C", title: "Funniest Program" },
];

export const SCHEDULE = [
  { time: "08:30", title: "REGISTRATION AND CHECK-IN" },
  { time: "09:00", title: "OPENING PROGRAM" },
  { time: "09:30", title: "HACKING BEGINS" },
  { time: "12:00", title: "LUNCH BREAK"},
  { time: "13:00", title: "RESUME HACKING"},
  { time: "17:00", title: "JUDGING AND PRESENTATIONS" },
  { time: "18:00", title: "AWARDS AND CLOSING" },
];
