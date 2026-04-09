export const AVATAR_BASE_URL = "https://ui-avatars.com/api/";

export const getAvatarUrl = (name: string): string => {
  const formattedName = encodeURIComponent(name);
  return `${AVATAR_BASE_URL}?name=${formattedName}`;
}