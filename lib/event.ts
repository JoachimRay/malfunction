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
  intro: "A one-day hackathon for delightfully unhelpful ideas. Take an everyday problem, make it wonderfully worse, and show us what you can build.",
  about: "Welcome to Malfunction, the hackathon where useful is overrated and the solution is probably worse than the problem. Your challenge: take an everyday problem like adjusting the volume, using a calculator, or finding your way and build the most hilariously unhelpful program you can. The more pointless, confusing, or spectacularly inconvenient, the better. Make us laugh, make us wonder why it exists, and maybe make us wish you’d just left the problem alone. Hosted by yours truly, the iDE.A club.",
  registerNote: "Build a team of 3 to 5, including one team leader. Anyone interested in making a gloriously unhelpful program can join. Bring a laptop for your team’s build and register by 18 November 2026. Add each teammate’s name and email so the organizers can share event updates with the whole team. You do not need to arrive with a finished project. Bring an idea, some curiosity, and a willingness to make a small problem much worse.",
  contactEmail: "ideacodingclub@iacademy.edu.ph",
  socials: [
    { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61579580901883" },
    { name: "Instagram", href: "https://www.instagram.com/ide.a_cebu/" },
    { name: "TikTok", href: "https://www.tiktok.com/@ide.a_cebu?lang=en" },
  ],
};

// Team size INCLUDING the team leader.
export const TEAM_SIZE = { min: 3, max: 5 };

export const TRACKS = [
  { id: "A", title: "Most Frustrating Program", description: "The solution that makes a simple task feel like a full-time job." },
  { id: "B", title: "Creative Use of AI", description: "A clever, surprising, or wonderfully unnecessary use of AI." },
  { id: "C", title: "Funniest Program", description: "The project that gets the biggest laugh from the room." },
  { id: "D", title: "Most Pointless, Yet Brilliant", description: "An idea nobody needed, built with care nobody expected." },
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
