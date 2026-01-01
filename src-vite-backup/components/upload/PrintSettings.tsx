import { useState } from "react";
import { Palette, RotateCcw, FileText, Maximize, Grid, BookOpen, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DuplexAnimation } from "./DuplexAnimation";
import { cn } from "@/lib/utils";
import type { PrintSettingsType } from "@/types/upload";

interface PrintSettingsProps {
  settings: PrintSettingsType;
  onChange: (settings: PrintSettingsType) => void;
  isGlobal: boolean;
  fileName?: string;
}

interface OptionButtonProps {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

const OptionButton = ({ selected, onClick, children, disabled }: OptionButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={cn(
      "flex-1 py-3 px-4 rounded-xl border-2 font-medium text-sm transition-all",
      selected
        ? "border-accent bg-accent text-accent-foreground"
        : disabled
        ? "border-border bg-muted text-muted-foreground cursor-not-allowed"
        : "border-border hover:border-accent/50 text-foreground"
    )}
  >
    {children}
  </button>
);

export const PrintSettings = ({ settings, onChange, isGlobal, fileName }: PrintSettingsProps) => {
  const [showDuplexHelp, setShowDuplexHelp] = useState(false);

  const updateSetting = <K extends keyof PrintSettingsType>(
    key: K,
    value: PrintSettingsType[K]
  ) => {
    onChange({ ...settings, [key]: value });
  };

  return (
    <div className="bg-card rounded-2xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display font-semibold text-lg text-foreground">
          Print Settings
        </h3>
        <span className="text-sm text-muted-foreground">
          {isGlobal ? "Applying to all files" : fileName || "Select a file"}
        </span>
      </div>

      <div className="space-y-6">
        {/* Color Mode */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Palette className="w-4 h-4 text-accent" />
            <label className="font-medium text-foreground">
              Color Mode <span className="text-destructive">*</span>
            </label>
          </div>
          <div className="flex gap-3">
            <OptionButton
              selected={settings.colorMode === "bw"}
              onClick={() => updateSetting("colorMode", "bw")}
            >
              Black & White
            </OptionButton>
            <OptionButton
              selected={settings.colorMode === "color"}
              onClick={() => updateSetting("colorMode", "color")}
            >
              Full Color
            </OptionButton>
          </div>
        </div>

        {/* Orientation */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <RotateCcw className="w-4 h-4 text-accent" />
            <label className="font-medium text-foreground">
              Orientation <span className="text-destructive">*</span>
            </label>
          </div>
          <div className="flex gap-3">
            <OptionButton
              selected={settings.orientation === "portrait"}
              onClick={() => updateSetting("orientation", "portrait")}
            >
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-6 border-2 border-current rounded" />
                Portrait
              </span>
            </OptionButton>
            <OptionButton
              selected={settings.orientation === "landscape"}
              onClick={() => updateSetting("orientation", "landscape")}
            >
              <span className="flex items-center justify-center gap-2">
                <div className="w-6 h-4 border-2 border-current rounded" />
                Landscape
              </span>
            </OptionButton>
          </div>
        </div>

        {/* Pages */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-4 h-4 text-accent" />
            <label className="font-medium text-foreground">Pages</label>
          </div>
          <div className="flex gap-3 mb-3">
            <OptionButton
              selected={settings.pageRange === "all"}
              onClick={() => updateSetting("pageRange", "all")}
            >
              All Pages
            </OptionButton>
            <OptionButton
              selected={settings.pageRange === "custom"}
              onClick={() => updateSetting("pageRange", "custom")}
            >
              Custom Range
            </OptionButton>
          </div>
          {settings.pageRange === "custom" && (
            <input
              type="text"
              value={settings.customPages}
              onChange={(e) => updateSetting("customPages", e.target.value)}
              placeholder="e.g., 1-5, 8, 11-13"
              className="w-full h-10 px-4 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
          )}
        </div>

        {/* Paper Size */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Maximize className="w-4 h-4 text-accent" />
            <label className="font-medium text-foreground">Paper Size</label>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {(["a4", "a3", "letter", "legal"] as const).map((size) => (
              <OptionButton
                key={size}
                selected={settings.paperSize === size}
                onClick={() => updateSetting("paperSize", size)}
                disabled={size !== "a4"}
              >
                {size.toUpperCase()}
                {size !== "a4" && (
                  <span className="block text-xs opacity-60">Soon</span>
                )}
              </OptionButton>
            ))}
          </div>
        </div>

        {/* Pages Per Sheet */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Grid className="w-4 h-4 text-accent" />
            <label className="font-medium text-foreground">
              Pages Per Sheet <span className="text-destructive">*</span>
            </label>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {([1, 2, 4] as const).map((num) => (
              <OptionButton
                key={num}
                selected={settings.pagesPerSheet === num}
                onClick={() => updateSetting("pagesPerSheet", num)}
              >
                {num} {num === 1 ? "Page" : "Pages"}
              </OptionButton>
            ))}
          </div>
        </div>

        {/* Duplex Mode - Important with animation */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-accent" />
              <label className="font-medium text-foreground">
                Print on Both Sides <span className="text-destructive">*</span>
              </label>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDuplexHelp(!showDuplexHelp)}
              className="gap-1 text-muted-foreground"
            >
              <HelpCircle className="w-4 h-4" />
              Help
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4">
            <OptionButton
              selected={settings.duplexMode === "none"}
              onClick={() => updateSetting("duplexMode", "none")}
            >
              One Side
            </OptionButton>
            <OptionButton
              selected={settings.duplexMode === "long-edge"}
              onClick={() => updateSetting("duplexMode", "long-edge")}
            >
              Long Edge
            </OptionButton>
            <OptionButton
              selected={settings.duplexMode === "short-edge"}
              onClick={() => updateSetting("duplexMode", "short-edge")}
            >
              Short Edge
            </OptionButton>
          </div>

          {/* Duplex Animation Helper */}
          {(showDuplexHelp || settings.duplexMode === "long-edge" || settings.duplexMode === "short-edge") && (
            <DuplexAnimation
              mode={settings.duplexMode || "none"}
              orientation={settings.orientation || "portrait"}
            />
          )}
        </div>
      </div>
    </div>
  );
};
