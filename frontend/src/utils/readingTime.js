export default function readingTime(text) {
  const words = text.split(" ").length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}
