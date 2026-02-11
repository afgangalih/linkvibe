"use client";

import { fontFamilyMap } from "./font-registry";

export function FontStyleInjector({
  fontId,
  children,
}: {
  fontId: string | null;
  children: React.ReactNode;
}) {
  const fontFamily = fontFamilyMap[fontId || "Inter"] || fontFamilyMap["Inter"];

  return (
    <div style={{ fontFamily }}>
      {children}
    </div>
  );
}
