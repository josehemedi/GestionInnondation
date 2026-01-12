declare module "react-resizable-panels" {
  import * as React from "react";

  export const PanelGroup: React.ComponentType<React.HTMLAttributes<HTMLDivElement> & { direction?: "horizontal" | "vertical" }>;
  export const Panel: React.ComponentType<React.HTMLAttributes<HTMLDivElement>>;
  export const PanelResizeHandle: React.ComponentType<React.HTMLAttributes<HTMLDivElement>>;
}
