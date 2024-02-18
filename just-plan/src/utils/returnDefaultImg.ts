import defaultProfile from "@/../public/svg/defaultProfile.svg";

export const returnDefaultImg = (profile: string | null) => {
  if (profile) {
    return profile;
  }
  return defaultProfile;
};
