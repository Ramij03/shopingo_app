

export interface Slide {
    id: string;
    image: any; 
    title: string;
    description: string;
    note?: string;
  }
  

const slides: Slide[] = [
  {
    id: '1',
    image: require('../../assets/images/onboard1.jpg'),
    title: 'Discover the latest largest & collections!',
    description: 'Explore the largest collections of clothes designed by our exclusive designers!',
    note: "30 new arrival 🔥",
  },
  {
    id: '2',
    image: require('../../assets/images/onboard2.jpg'),
    title: 'Shop your favorites!',
    description: 'Find and shop your favorite items with ease and convenience!',
    note: "Designer collection ✌",
  },
  {
    id: '3',
    image: require('../../assets/images/onboard3.jpg'),
    title: 'Fast Delivery at your Doorstep!',
    description: 'Experience quick and reliable delivery to your doorstep!',
    note: "Fast delivery 🚚",
  },
];

export default slides;
