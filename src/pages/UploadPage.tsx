import { useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FileUploader } from "@/components/upload/FileUploader";
import { FileList } from "@/components/upload/FileList";
import { PrintSettings } from "@/components/upload/PrintSettings";
import { Button } from "@/components/ui/button";
import { ArrowRight, Store, AlertCircle } from "lucide-react";
import type { UploadedFile, PrintSettingsType } from "@/types/upload";

const defaultSettings: PrintSettingsType = {
  colorMode: null,
  orientation: null,
  pageRange: "all",
  customPages: "",
  paperSize: "a4",
  pagesPerSheet: null,
  duplexMode: null,
};

const UploadPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const shopId = searchParams.get("shop");
  
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [globalSettings, setGlobalSettings] = useState<PrintSettingsType>(defaultSettings);
  const [useGlobalSettings, setUseGlobalSettings] = useState(true);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);

  const handleFilesAdded = useCallback((newFiles: File[]) => {
    const uploadedFiles: UploadedFile[] = newFiles.map((file) => ({
      id: crypto.randomUUID(),
      name: file.name,
      size: file.size,
      type: file.type,
      file,
      settings: { ...defaultSettings },
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
    }));
    setFiles((prev) => [...prev, ...uploadedFiles]);
  }, []);

  const handleRemoveFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    if (activeFileId === id) setActiveFileId(null);
  }, [activeFileId]);

  const handleUpdateFileSettings = useCallback((id: string, settings: Partial<PrintSettingsType>) => {
    setFiles((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, settings: { ...f.settings, ...settings } } : f
      )
    );
  }, []);

  const activeFile = files.find((f) => f.id === activeFileId);
  const currentSettings = useGlobalSettings ? globalSettings : (activeFile?.settings || globalSettings);

  const isReadyToCheckout = files.length > 0 && files.every((f) => {
    const settings = useGlobalSettings ? globalSettings : f.settings;
    return (
      settings.colorMode !== null &&
      settings.orientation !== null &&
      settings.pagesPerSheet !== null &&
      settings.duplexMode !== null
    );
  });

  const handleProceed = () => {
    if (!shopId) {
      navigate("/shops");
    } else {
      // Navigate to checkout with files data
      navigate(`/checkout?shop=${shopId}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              Upload & Print
            </h1>
            <p className="text-muted-foreground">
              Upload your documents, customize settings, and get them printed
            </p>
          </div>

          {/* Shop Notice */}
          {!shopId && (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-warning/10 border border-warning/20 text-warning mb-8">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium">No shop selected</p>
                <p className="text-sm opacity-80">Select a shop first to proceed with printing</p>
              </div>
              <Button variant="default" size="sm" onClick={() => navigate("/shops")}>
                <Store className="w-4 h-4 mr-2" />
                Select Shop
              </Button>
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Upload & Files */}
            <div className="space-y-6">
              <FileUploader onFilesAdded={handleFilesAdded} />
              
              {files.length > 0 && (
                <FileList
                  files={files}
                  activeFileId={activeFileId}
                  onRemove={handleRemoveFile}
                  onSelect={setActiveFileId}
                  useGlobalSettings={useGlobalSettings}
                  onToggleGlobalSettings={() => setUseGlobalSettings(!useGlobalSettings)}
                />
              )}
            </div>

            {/* Right Column - Settings */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <PrintSettings
                settings={currentSettings}
                onChange={(newSettings) => {
                  if (useGlobalSettings) {
                    setGlobalSettings(newSettings);
                  } else if (activeFileId) {
                    handleUpdateFileSettings(activeFileId, newSettings);
                  }
                }}
                isGlobal={useGlobalSettings}
                fileName={activeFile?.name}
              />

              {/* Proceed Button */}
              <div className="mt-6">
                <Button
                  variant="gradient"
                  size="xl"
                  className="w-full"
                  disabled={!isReadyToCheckout}
                  onClick={handleProceed}
                >
                  {!shopId ? "Select a Shop First" : "Proceed to Checkout"}
                  <ArrowRight className="w-5 h-5" />
                </Button>
                {!isReadyToCheckout && files.length > 0 && (
                  <p className="text-sm text-muted-foreground text-center mt-2">
                    Please complete all required settings
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UploadPage;
