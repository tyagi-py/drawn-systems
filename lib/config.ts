/**
 * Matches the basePath configured in next.config.ts. Needed anywhere a URL is
 * built by hand instead of through next/link or next/navigation, which apply
 * basePath automatically.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(path: string): string {
  return `${basePath}${path}`;
}
