import { Inter, Merriweather, Roboto_Mono, Outfit } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-merriweather",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const fontVariables = `${inter.variable} ${merriweather.variable} ${robotoMono.variable} ${outfit.variable}`;

export const fontFamilyMap: Record<string, string> = {
  "Inter": "var(--font-inter)",
  "Merriweather": "var(--font-merriweather)",
  "Roboto Mono": "var(--font-roboto-mono)",
  "Outfit": "var(--font-outfit)",
};
