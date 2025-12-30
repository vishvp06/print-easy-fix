import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, Image, FileIcon } from "lucide-react";

interface FileUploaderProps {
  onFilesAdded: (files: File[]) => void;
}

const acceptedFormats = {
  "application/pdf": [".pdf"],
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
};

export const FileUploader = ({ onFilesAdded }: FileUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onFilesAdded(acceptedFiles);
    },
    [onFilesAdded]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFormats,
    multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      className={`
        relative border-2 border-dashed rounded-2xl p-8 md:p-12 text-center cursor-pointer
        transition-all duration-300 group
        ${
          isDragActive
            ? "border-accent bg-accent/5 scale-[1.02]"
            : "border-border hover:border-accent/50 hover:bg-accent/5"
        }
      `}
    >
      <input {...getInputProps()} />
      
      <div className="flex flex-col items-center">
        <div
          className={`
            w-16 h-16 rounded-2xl flex items-center justify-center mb-4
            transition-all duration-300
            ${isDragActive ? "bg-accent text-accent-foreground scale-110" : "bg-muted text-muted-foreground group-hover:bg-accent group-hover:text-accent-foreground"}
          `}
        >
          <Upload className="w-8 h-8" />
        </div>
        
        <h3 className="font-display font-semibold text-lg text-foreground mb-2">
          {isDragActive ? "Drop files here" : "Drag & drop your files"}
        </h3>
        
        <p className="text-muted-foreground mb-4">
          or click to browse from your device
        </p>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <FileText className="w-4 h-4" />
            <span>PDF</span>
          </div>
          <div className="flex items-center gap-1">
            <Image className="w-4 h-4" />
            <span>JPG, PNG</span>
          </div>
          <div className="flex items-center gap-1">
            <FileIcon className="w-4 h-4" />
            <span>JPEG, WEBP</span>
          </div>
        </div>
      </div>

      {/* Decorative corners */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-accent/30 rounded-tl-lg" />
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-accent/30 rounded-tr-lg" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-accent/30 rounded-bl-lg" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-accent/30 rounded-br-lg" />
    </div>
  );
};
