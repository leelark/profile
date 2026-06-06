export const SITE_URL = "https://leelark.github.io";
export const SITE_BASE = "/profile/";
export const SITE_ORIGIN = `${SITE_URL}${SITE_BASE.replace(/\/$/, "")}`;

export function withBase(path = "/") {
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("mailto:") || path.startsWith("tel:")) {
    return path;
  }

  const normalized = path.startsWith("/") ? path.slice(1) : path;
  return `${SITE_BASE}${normalized}`.replace(/\/{2,}/g, "/");
}

export function canonicalUrl(path = "/") {
  const basedPath = withBase(path);
  const hasExtension = /\.[a-zA-Z0-9]+$/.test(basedPath);
  const cleanPath = hasExtension || basedPath.endsWith("/") ? basedPath : `${basedPath}/`;
  return `${SITE_URL}${cleanPath}`;
}

export function categoryPath(slug: string) {
  return withBase(`/work/${slug}`);
}

export function projectPath(slug: string) {
  return withBase(`/work/${slug}`);
}
