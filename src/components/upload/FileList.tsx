import { FileText, Image, Eye, Settings, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import type { UploadedFile } from "@/types/upload";

interface FileListProps {
  files: UploadedFile[];
  activeFileId: string | null;
  onRemove: (id: string) => void;
  onSelect: (id: string) => void;
  useGlobalSettings: boolean;
  onToggleGlobalSettings: () => void;
}

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export const FileList = ({
  files,
  activeFileId,
  onRemove,
  onSelect,
  useGlobalSettings,
  onToggleGlobalSettings,
}: FileListProps) => {
  return (
    <div className="bg-card rounded-2xl border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-lg text-foreground">
          Uploaded Files ({files.length})
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Use same settings for all
          </span>
          <Switch
            checked={useGlobalSettings}
            onCheckedChange={onToggleGlobalSettings}
          />
        </div>
      </div>

      <div className="space-y-3">
        {files.map((file) => {
          const isActive = file.id === activeFileId;
          const isPdf = file.type === "application/pdf";
          const isImage = file.type.startsWith("image/");
          const hasSettings = !useGlobalSettings && (
            file.settings.colorMode !== null &&
            file.settings.orientation !== null
          );

          return (
            <div
              key={file.id}
              className={cn(
                "flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer",
                isActive
                  ? "border-accent bg-accent/5"
                  : "border-border hover:border-accent/50 hover:bg-muted/50"
              )}
              onClick={() => !useGlobalSettings && onSelect(file.id)}
            >
              {/* File Icon */}
              <div
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                  isPdf
                    ? "bg-destructive/10 text-destructive"
                    : isImage
                    ? "bg-accent/10 text-accent"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {isPdf ? (
                  <FileText className="w-6 h-6" />
                ) : isImage ? (
                  <Image className="w-6 h-6" />
                ) : (
                  <FileText className="w-6 h-6" />
                )}
              </div>

              {/* File Info */}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{file.name}</p>
                <p className="text-sm text-muted-foreground">
                  {formatFileSize(file.size)}
                  {!useGlobalSettings && hasSettings && (
                    <span className="ml-2 inline-flex items-center gap-1 text-success">
                      <Check className="w-3 h-3" /> Settings applied
                    </span>
                  )}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                {file.preview && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(file.preview, "_blank");
                    }}
                    title="Preview"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                )}
                {!useGlobalSettings && (
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(file.id);
                    }}
                    title="Settings"
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(file.id);
                  }}
                  className="text-muted-foreground hover:text-destructive"
                  title="Remove"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
