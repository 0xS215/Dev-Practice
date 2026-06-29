export interface EventItem {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

export const events: EventItem[] = [
  {
    title: "React Summit 2026",
    image: "/images/event1.png",
    slug: "react-summit-2026",
    location: "Amsterdam",
    date: "June 12 - 14, 2026",
    time: "09:00 AM"
  },
  {
    title: "Google I/O Extended",
    image: "/images/event2.png",
    slug: "google-io-extended",
    location: "San Francisco, CA",
    date: "July 8, 2026",
    time: "10:00 AM"
  },
  {
    title: "NodeConf EU",
    image: "/images/event3.png",
    slug: "nodeconf-eu-2026",
    location: "Lisbon",
    date: "September 2 - 3, 2026",
    time: "08:30 AM"
  },
  {
    title: "Hack the Future Hackathon",
    image: "/images/event4.png",
    slug: "hack-the-future-2026",
    location: "Austin, TX",
    date: "August 21 - 23, 2026",
    time: "06:00 PM"
  },
  {
    title: "AWS re:Invent Workshop Day",
    image: "/images/event5.png",
    slug: "aws-reinvent-workshop",
    location: "Las Vegas, NV",
    date: "November 27, 2026",
    time: "11:00 AM"
  },
  {
    title: "Women Who Code Global Meetup",
    image: "/images/event6.png",
    slug: "women-who-code-global",
    location: "Remote / Virtual",
    date: "October 14, 2026",
    time: "02:00 PM"
  }
];
