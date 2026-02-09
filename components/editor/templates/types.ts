import { Link, Profile, SocialLink } from "@/types";

export interface TemplateProps {
  profile: Profile;
  links: (Link & { is_active?: boolean })[];
  socials: (SocialLink & { is_active?: boolean })[];
  font: string;
}
