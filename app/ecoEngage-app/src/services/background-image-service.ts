import lp1Image from './../assets/images/LandingPage-background-imgs/lp-1.jpeg';
import lp2Image from './../assets/images/LandingPage-background-imgs/lp-2.jpeg';
import lp3Image from './../assets/images/LandingPage-background-imgs/lp-3.webp';
import lp4Image from './../assets/images/LandingPage-background-imgs/lp-4.avif';
import lp5Image from './../assets/images/LandingPage-background-imgs/lp-5.avif';
import lp6Image from './../assets/images/LandingPage-background-imgs/lp-6.avif';
import lp7Image from './../assets/images/LandingPage-background-imgs/lp-7.webp';
import lp8Image from './../assets/images/LandingPage-background-imgs/lp-8.avif';
import lp9Image from './../assets/images/LandingPage-background-imgs/lp-9.avif';

// Define an array of imported image paths
const images = [lp1Image, lp2Image, lp3Image, lp4Image, lp5Image, lp6Image, lp7Image, lp8Image, lp9Image];

// Function to get a random image path from the array
export const getRandomImage = (): string => {
    const index = Math.floor(Math.random() * images.length);
    return images[index];
};