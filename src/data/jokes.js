export const DEV_JOKES = [
  "Why do programmers prefer dark mode? Because light attracts bugs.",
  "A SQL query walks into a bar, walks up to two tables and asks... 'Can I join you?'",
  "How many programmers does it take to change a light bulb? None — it's a hardware problem.",
  "Why do Java developers wear glasses? Because they don't C#.",
  "A programmer's partner says: 'Go to the store and get a gallon of milk. If they have eggs, get a dozen.' They come back with 12 gallons of milk.",
  "Why did the developer go broke? Because he used up all his cache.",
  "It's not a bug — it's an undocumented feature.",
  
];

export function getRandomJoke() {
  return DEV_JOKES[Math.floor(Math.random() * DEV_JOKES.length)];
}
