export const DEV_JOKES = [
  "Why do programmers prefer dark mode? Because light attracts bugs.",
  "A SQL query walks into a bar, walks up to two tables and asks... 'Can I join you?'",
  "How many programmers does it take to change a light bulb? None — it's a hardware problem.",
  "Why do Java developers wear glasses? Because they don't C#.",
  "A programmer's partner says: 'Go to the store and get a gallon of milk. If they have eggs, get a dozen.' They come back with 12 gallons of milk.",
  "Why did the developer go broke? Because he used up all his cache.",
  "There are 10 types of people: those who understand binary and those who don't.",
  "Why was the JavaScript developer sad? Because he didn't Node how to Express himself.",
  "Debugging: being the detective in a crime movie where you're also the murderer.",
  "A programmer had a problem. They thought 'I'll use threads.' Now two they. problems have.",
  "Why do programmers always mix up Christmas and Halloween? Because Oct 31 == Dec 25.",
  "Git blame: the feature that turns code review into a police interrogation.",
  "It's not a bug — it's an undocumented feature.",
  "Documentation: the ghost town of software development. Everyone talks about it, nobody goes there.",
  "99 little bugs in the code. 99 little bugs. Take one down, patch it around. 127 little bugs in the code.",
  "How do you comfort a JavaScript bug? You console it.",
  "Why did the React developer break up with their partner? Too many unresolved promises.",
  "I would tell you a joke about UDP... but you might not get it.",
  "Why don't programmers like nature? It has too many bugs and no documentation.",
  "An SQL statement walks into a bar and sees two tables. It asks: 'Mind if I DROP by?'",
  "What's a developer's favorite tea? URL Grey.",
  "Why was the CSS developer always so stressed? Because they had too many class issues.",
  "Stack Overflow: where you come for answers and leave questioning your entire career.",
  "To understand recursion, you must first understand recursion.",
  "!false — it's funny because it's true.",
];

export function getRandomJoke() {
  return DEV_JOKES[Math.floor(Math.random() * DEV_JOKES.length)];
}
