'use client';

interface CloudinaryVideoUploadProps {
  onUpload: (url: string) => void;
  buttonText?: string;
}

export default function CloudinaryVideoUpload({ onUpload, buttonText = "Upload Video" }: CloudinaryVideoUploadProps) {
  const handleUpload = () => {
    // Simulation d'upload - en production, intégrer avec Cloudinary
    const mockUrl = "https://res.cloudinary.com/demo/video/upload/sample.mp4";
    onUpload(mockUrl);
  };

  return (
    <button
      onClick={handleUpload}
      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
    >
      {buttonText}
    </button>
  );
}