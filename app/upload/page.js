'use client';

import { useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Store, AlertCircle, Upload } from 'lucide-react';
import { uploadFile, createPaymentOrder } from '@/lib/api';
import { loadRazorpay } from '@/lib/razorpay';
import { toast } from 'sonner';
import { useDropzone } from 'react-dropzone';

export default function UploadPage() {
    const searchParams = useSearchParams();
    const shopId = searchParams.get('shop');

    const [files, setFiles] = useState([]);
    const [isUploading, setIsUploading] = useState(false);

    const onDrop = useCallback(async (acceptedFiles) => {
        setIsUploading(true);
        try {
            const uploadedResults = await Promise.all(
                acceptedFiles.map(async (file) => {
                    const result = await uploadFile(file);
                    return {
                        id: result.id,
                        name: file.name,
                        size: file.size,
                        preview: result.url,
                    };
                })
            );
            setFiles((prev) => [...prev, ...uploadedResults]);
            toast.success('Files uploaded successfully');
        } catch (error) {
            toast.error('Failed to upload files');
            console.error(error);
        } finally {
            setIsUploading(false);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'image/jpeg': ['.jpg', '.jpeg'],
            'image/png': ['.png'],
            'image/webp': ['.webp'],
        },
        multiple: true,
    });

    const handleRemoveFile = (id) => {
        setFiles((prev) => prev.filter((f) => f.id !== id));
    };

    const handleProceed = async () => {
        if (!shopId) {
            window.location.href = '/shops';
            return;
        }

        const res = await loadRazorpay();

        if (!res) {
            toast.error('Razorpay SDK failed to load. Are you online?');
            return;
        }

        try {
            const order = await createPaymentOrder(100);

            const options = {
                key: 'rzp_test_placeholder',
                amount: order.amount,
                currency: order.currency,
                name: 'PrintEasy',
                description: 'Payment for Printing Service',
                order_id: order.id,
                handler: function (response) {
                    toast.success('Payment Successful! Your print job is sent.');
                    console.log(response);
                },
                prefill: {
                    name: 'User Name',
                    email: 'user@example.com',
                    contact: '9999999999',
                },
                theme: {
                    color: '#7c3aed',
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            toast.error('Failed to initiate payment');
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-background">
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
                            <Link href="/shops">
                                <Button variant="default" size="sm">
                                    <Store className="w-4 h-4 mr-2" />
                                    Select Shop
                                </Button>
                            </Link>
                        </div>
                    )}

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Left Column - Upload & Files */}
                        <div className="space-y-6">
                            {/* File Uploader */}
                            <div
                                {...getRootProps()}
                                className={`
                  relative border-2 border-dashed rounded-2xl p-8 md:p-12 text-center cursor-pointer
                  transition-all duration-300 group
                  ${isDragActive
                                        ? 'border-accent bg-accent/5 scale-[1.02]'
                                        : 'border-border hover:border-accent/50 hover:bg-accent/5'
                                    }
                `}
                            >
                                <input {...getInputProps()} />

                                <div className="flex flex-col items-center">
                                    <div
                                        className={`
                      w-16 h-16 rounded-2xl flex items-center justify-center mb-4
                      transition-all duration-300
                      ${isDragActive ? 'bg-accent text-accent-foreground scale-110' : 'bg-muted text-muted-foreground group-hover:bg-accent group-hover:text-accent-foreground'}
                    `}
                                    >
                                        <Upload className="w-8 h-8" />
                                    </div>

                                    <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                                        {isDragActive ? 'Drop files here' : 'Drag & drop your files'}
                                    </h3>

                                    <p className="text-muted-foreground mb-4">
                                        or click to browse from your device
                                    </p>

                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <span>PDF, JPG, PNG, WEBP</span>
                                    </div>
                                </div>
                            </div>

                            {/* File List */}
                            {files.length > 0 && (
                                <div className="space-y-2">
                                    <h3 className="font-semibold">Uploaded Files ({files.length})</h3>
                                    {files.map((file) => (
                                        <div
                                            key={file.id}
                                            className="flex items-center justify-between p-4 rounded-lg border border-border bg-card"
                                        >
                                            <div className="flex-1">
                                                <p className="font-medium">{file.name}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {(file.size / 1024).toFixed(2)} KB
                                                </p>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleRemoveFile(file.id)}
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Right Column - Checkout */}
                        <div className="lg:sticky lg:top-24 lg:self-start">
                            <div className="p-6 rounded-xl border border-border bg-card">
                                <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
                                <div className="space-y-2 mb-6">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Files</span>
                                        <span className="font-medium">{files.length}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Estimated Cost</span>
                                        <span className="font-medium">₹100</span>
                                    </div>
                                </div>

                                <Button
                                    variant="gradient"
                                    size="xl"
                                    className="w-full"
                                    disabled={files.length === 0 || !shopId}
                                    onClick={handleProceed}
                                >
                                    {!shopId ? 'Select a Shop First' : 'Proceed to Payment'}
                                    <ArrowRight className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
