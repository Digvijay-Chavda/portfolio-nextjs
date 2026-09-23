// Prefixes /public paths with the basePath (needed on GitHub Pages: /<repo-name>/...)
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${path}`;
