'use client';

interface CloudinaryUploadProps {
  onUpload: (url: string) => void;
  buttonText?: string;
}

export default function CloudinaryUpload({ onUpload, buttonText = "Upload Image" }: CloudinaryUploadProps) {
  const handleUpload = () => {
    // Simulation d'upload - en production, intégrer avec Cloudinary
    const mockUrl = "https://res.cloudinary.com/demo/image/upload/sample.jpg";
    onUpload(mockUrl);
  };

  return (
    <button
      onClick={handleUpload}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      {buttonText}
    </button>
  );
}