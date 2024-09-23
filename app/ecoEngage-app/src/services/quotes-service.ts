const quotes: string[] = [
  "The Earth does not belong to us. We belong to the Earth.",
  "Climate change is no longer a distant threat. It's happening now.",
  "Protecting our planet is not a choice. It's a necessity.",
  "Every small action counts in the fight against climate change.",
  "The greatest threat to our planet is the belief that someone else will save it.",
  "Climate change knows no borders. It affects us all.",
  "We do not inherit the Earth from our ancestors, we borrow it from our children.",
  "The time for action on climate change is now, not tomorrow.",
  "The Earth provides enough to satisfy every man's needs, but not every man's greed."
];

export const getRandomQuote = (): string => {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}
