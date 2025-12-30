export interface PrintSettingsType {
  colorMode: "bw" | "color" | null;
  orientation: "portrait" | "landscape" | null;
  pageRange: "all" | "custom";
  customPages: string;
  paperSize: "a4" | "a3" | "letter" | "legal";
  pagesPerSheet: 1 | 2 | 4 | null;
  duplexMode: "none" | "long-edge" | "short-edge" | null;
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  file: File;
  settings: PrintSettingsType;
  preview?: string;
}
