import type { DeviceMode } from "./types";

/** Canvas / player width per device preset (px). */
export const DEVICE_WIDTH: Record<DeviceMode, number> = {
  desktop: 1024,
  tablet: 768,
  mobile: 390,
};
