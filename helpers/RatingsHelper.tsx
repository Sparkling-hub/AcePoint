import { Star } from '@tamagui/lucide-icons';

// Function to generate stars based on rating
export const renderStars = (rating: number) => {
  const stars = [];
  const filledStars = Math.floor(rating); // Number of filled stars
  const remaining = 5 - filledStars; // Remaining stars to be empty

  // Filled stars
  for (let i = 0; i < filledStars; i++) {
    stars.push(<Star key={i} size={12} color={'#FFB84E'} fill={'#FFB84E'} />);
  }

  // Empty stars
  for (let i = 0; i < remaining; i++) {
    stars.push(<Star key={i + filledStars} size={12} color={'#FFB84E'} />);
  }

  return stars;
};
