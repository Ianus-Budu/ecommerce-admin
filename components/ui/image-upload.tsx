"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ImagePlus, Trash, Upload } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
    disabled?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    disabled,
    onChange,
    onRemove,
    value
}) => {
    const [isMounted, setIsMounted] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Verifică dacă fișierul este o imagine
            if (!file.type.startsWith('image/')) {
                alert('Vă rugăm să selectați un fișier imagine valid.');
                return;
            }

            // Verifică dimensiunea fișierului (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('Fișierul este prea mare. Dimensiunea maximă permisă este 5MB.');
                return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                const result = event.target?.result as string;
                if (result) {
                    onChange(result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const url = e.target.value;
        if (url) {
            onChange(url);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    if(!isMounted){
        return null;
    }

    return (
        <div>
           <div className="mb-4 flex items-center gap-4">
            {value.map((url) => (
                <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden border">
                    <div className="z-10 absolute top-2 right-2">
                        <Button type="button" onClick={() => onRemove(url)} variant="destructive" size="icon">
                            <Trash className="h-4 w-4" />
                        </Button>
                    </div>
                    <Image 
                    fill
                    className="object-cover"
                    alt="Image"
                    src={url}
                    />
                </div>
            ))}
           </div>
           
           <div className="space-y-4">
                {/* File Upload Section */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Upload Image from Device</label>
                    <div className="flex items-center gap-2">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                            disabled={disabled}
                        />
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleUploadClick}
                            disabled={disabled}
                            className="flex items-center gap-2"
                        >
                            <Upload className="h-4 w-4" />
                            Choose File
                        </Button>
                        <span className="text-sm text-gray-500">
                            Max 5MB, JPG, PNG, GIF
                        </span>
                    </div>
                </div>

                {/* URL Input Section */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Or enter Image URL</label>
                    <input
                        type="url"
                        placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                        onChange={handleImageUrlChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={disabled}
                    />
                    <p className="text-xs text-gray-500">
                        You can upload from device or enter a direct URL to an image.
                    </p>
                </div>
           </div>
        </div>
    )
};

export default ImageUpload;