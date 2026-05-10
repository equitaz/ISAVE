// Real reviews extracted verbatim from the client's Facebook recommendations
// (15 reviews, 100% recommend). We use the public-facing quotes only.
export type Testimonial = {
  name: string;
  date: string;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Huda Rizek",
    date: "Nov 2019",
    quote:
      "The one and only source for quality promo videos, documentaries and multimedia services. Highly professional, very creative, prompt and easy to deal with. Highly recommend.",
  },
  {
    name: "Ferass Safadi",
    date: "Apr 2019",
    quote:
      "Mulham did a phenomenal job today in filming and providing the audio and visual set-up for Sleep Apnea Awareness Day for Hayat Home Medical Equipment.",
  },
  {
    name: "Ama Atek",
    date: "Apr 2018",
    quote:
      "I recommend this company. They were on time. Great sound system. They used the latest technology available. The party Wedding was amazing. The team work together to make the event enjoyable and successful. Thank you ISAVE.",
  },
  {
    name: "Lamise Said",
    date: "Mar 2018",
    quote:
      "ISAVE is a top-rated company. I've worked with them many times. Molham is professional and goes above and beyond expectations. A must try for your next event.",
  },
  {
    name: "Yaman Rifai",
    date: "Mar 2018",
    quote:
      "Amazing equipment, professional experience, and the best quality. Friendly staff and they care about your event.",
  },
  {
    name: "Suzanne Meriden",
    date: "Mar 2018",
    quote: "Loved working with this team. Very attentive and patient.",
  },
  {
    name: "Jean Allen Kuhn",
    date: "May 2017",
    quote:
      "I've had the pleasure to work with Molham in his video studio. Quality is his highest concern. Molham is so professional and his knowledge amazed me. When I need a video guy, Molham is that guy!",
  },
  {
    name: "Alex Kiri",
    date: "May 2017",
    quote:
      "We used Molham for an event we recently held in Chicago and I can't begin to describe how efficient, professional and pleasant he was. Molham is a pleasure to work with and I highly recommend him to anyone looking for someone to help with AV.",
  },
  {
    name: "Radwan Kalaaji",
    date: "Apr 2018",
    quote: "Five stars. Highly recommended for any audio-video production need.",
  },
];
