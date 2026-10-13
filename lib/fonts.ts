import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

// Applied to <html> on public pages and to the root wrapper inside the editor
// iframe, which doesn't inherit classes from the host document.
export const fontVariables = `${geist.variable} ${geistMono.variable} ${playfair.variable}`;
