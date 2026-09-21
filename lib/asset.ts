/** Prefixa um caminho de /public com o basePath do build (GitHub Pages etc.). */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function asset(path: string) {
  if (!path.startsWith("/")) return path;
  return BASE_PATH + path;
}
