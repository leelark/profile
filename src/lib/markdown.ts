import { marked } from "marked";

marked.use({
  gfm: true,
  breaks: false
});

export function renderMarkdown(source = "") {
  return marked.parse(source.trim(), { async: false }) as string;
}

export function stripMarkdown(source = "") {
  return source
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\s*[-*]\s+/gm, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

export function excerpt(source = "", maxLength = 180) {
  const text = stripMarkdown(source);
  if (text.length <= maxLength) {
    return text;
  }
  const sliced = text.slice(0, maxLength - 1);
  const lastSpace = sliced.lastIndexOf(" ");
  return `${sliced.slice(0, lastSpace > 80 ? lastSpace : sliced.length).trim()}...`;
}

export function slugify(value = "") {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function splitBullets(source = "") {
  return source
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "))
    .map((line) => line.replace(/^-\s+/, "").trim())
    .filter(Boolean);
}

export function splitParagraphs(source = "") {
  return source
    .split(/\n{2,}/)
    .map((paragraph) => stripMarkdown(paragraph))
    .filter(Boolean);
}
