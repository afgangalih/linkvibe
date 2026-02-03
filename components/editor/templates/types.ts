import { Link, Profile, SocialLink } from "@/types";

export interface TemplateProps {
  profile: Profile;
  links: Link[];
  socials: SocialLink[];
  font: string; // className
}
