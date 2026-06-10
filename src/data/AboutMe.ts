export type AboutMePhoto = {
  title?: string;
  caption?: string;
  note?: string;
  image: string;
  variant?: 'wide' | 'portrait';
  position?: string;
};

export const AboutMePhotos: Record<'painting' | 'cooking' | 'sunsets' | 'moments', AboutMePhoto[]> = {
  painting: [
    {
      title: 'color studies',
      caption: 'A practice in patience, layering, and staying with an idea before it becomes clear.',
      note: 'paint / study in progress',
      image: '/images/about-me/painting/painting-blue-swan.jpg',
    },
    {
      image: '/images/about-me/painting/painting-lavender-field.jpg',
    },
    {
      image: '/images/about-me/painting/painting-mandala.jpg',
    },
  ],
  cooking: [
    {
      image: '/images/about-me/cooking/cooking-strawberry-drink.jpg',
    },
    {
      title: 'comfort experiments',
      caption: 'Cooking feels like design in motion: instinct, timing, texture, and care.',
      note: 'kitchen / made by instinct',
      image: '/images/about-me/cooking/cooking-chaat.jpg',
    },
    {
      image: '/images/about-me/cooking/cooking-noodles.jpg',
    },
    {
      image: '/images/about-me/cooking/cooking-curry-naan.jpg',
    },
    {
      image: '/images/about-me/cooking/cooking-glazed-bites.jpg',
    },
    {
      image: '/images/about-me/cooking/cooking-momos.jpg',
    },
  ],
  sunsets: [
    {
      image: '/images/about-me/sunsets/sunset-pink-wall.jpg',
      variant: 'wide',
    },
    {
      image: '/images/about-me/sunsets/sunset-road-blue.jpg',
    },
    {
      title: 'sky studies',
      caption: 'Sunsets keep me close to color, atmosphere, and the quiet intelligence of slow change.',
      note: 'evening / stayed for the light',
      image: '/images/about-me/sunsets/sunset-rose-sky.jpg',
    },
    {
      image: '/images/about-me/sunsets/sunset-clouds-orange.jpg',
    },
    {
      image: '/images/about-me/sunsets/sunset-city-skyline.jpg',
      variant: 'wide',
    },
    {
      image: '/images/about-me/sunsets/sunset-blue-water.jpg',
      variant: 'wide',
    },
    {
      image: '/images/about-me/sunsets/sunset-waterline.jpg',
      variant: 'wide',
    },
    {
      image: '/images/about-me/sunsets/sunset-city-road.jpg',
    },
    {
      image: '/images/about-me/sunsets/sunset-harbor.jpg',
    },
  ],
  moments: [
    {
      image: '/images/about-me/moments/moment-waterfront.jpg',
    },
    {
      image: '/images/about-me/moments/moment-liberty-back.jpg',
      variant: 'wide',
    },
    {
      image: '/images/about-me/moments/moment-festive-corner.jpg',
    },
    {
      image: '/images/about-me/moments/moment-statue.jpg',
    },
    {
      title: 'camera roll',
      caption: 'Travel and candid moments remind me to notice context, texture, and the small things that make a place memorable.',
      note: 'somewhere / worth keeping',
      image: '/images/about-me/moments/moment-skyline-park.jpg',
    },
    {
      image: '/images/about-me/moments/moment-creek.jpg',
    },
    {
      image: '/images/about-me/moments/moment-lake.jpeg',
    },
    {
      image: '/images/about-me/moments/moment-trail.jpg',
    },
    {
      image: '/images/about-me/moments/moment-bean.jpg',
    },
    {
      image: '/images/about-me/moments/moment-yosemite-postcard.jpg',
    },
  ],
};
