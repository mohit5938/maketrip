const rawUrl = import.meta.env.VITE_SERVER_URL || "";
export const server = rawUrl ? (rawUrl.endsWith("/") ? rawUrl : `${rawUrl}/`) : "";