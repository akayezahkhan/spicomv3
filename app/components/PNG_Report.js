'use client';
import React, { useState, useRef } from 'react';
import Image from 'next/image';

export default function PngImageViewer() {

    const imageRef = useRef(null); // Ref for image element
    const [images, setImages] = useState([]); // Array to hold image URLs
    const [imageMetadata, setImageMetadata] = useState({ name: '', dimensions: '' });
    const [currentImageIndex, setCurrentImageIndex] = useState(0); // Track current image
    const [reports, setReports] = useState({}); // Object to store reports for each image
    
    // Load a folder of images
    const loadFolder = (event) => {

        const files = Array.from(event.target.files); // Convert FileList to an array
        const pngFiles = files.filter((file) => file.type === 'image/png');
        if (pngFiles.length === 0) {
        alert('No valid PNG files found. Please upload a folder with PNG images.');
        return;
        }
        const imageUrls = pngFiles.map((file) => {
        return { url: URL.createObjectURL(file), name: file.name };
        });

        setImages(imageUrls);
        setCurrentImageIndex(0);
        updateImageMetadata(imageUrls[0]);

    };

    // Update metadata based on the current image
    const updateImageMetadata = (image) => {
      if (!image) return;
  
      const tempImage = new window.Image(); // Use browser's Image constructor
      tempImage.src = image.url;
      tempImage.onload = () => {
        setImageMetadata({
          name: image.name,
          dimensions: `${tempImage.width} x ${tempImage.height} px`,
        });
      };
    };

    // Navigate to the next image
    const handleNext = () => {
        if (currentImageIndex < images.length - 1) {
        const newIndex = currentImageIndex + 1;
        setCurrentImageIndex(newIndex);
        updateImageMetadata(images[newIndex]);
        }
    };

    // Navigate to the previous image
    const handlePrevious = () => {
        if (currentImageIndex > 0) {
        const newIndex = currentImageIndex - 1;
        setCurrentImageIndex(newIndex);
        updateImageMetadata(images[newIndex]);
        }
    };

    // Reset viewer
    const handleReset = () => {
        setImages([]);
        setCurrentImageIndex(0);
        setImageMetadata({ name: '', dimensions: '' });
        setReports({});
    };

    // Handle report change for the current image
    const handleReportChange = (event) => {
    const updatedReports = { ...reports, [currentImageIndex]: event.target.value };
    setReports(updatedReports);
  };

    // Save all observations to a text file
    const handleSaveObservations = () => {
      const content = images.map((image, index) => {
        const observation = reports[index] || "No observation provided.";
        return `Image: ${image.name}\nObservation: ${observation}\n\n`;
      }).join('');
  
      const blob = new Blob([content], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'observations.txt';
      link.click();
    };

  return (
    <div className="text-black">
      {/* Block Container */}
      <div className="p-1 border-2 border-blue-200 bg-transparent">

        {/* Image Viewer Section */}
        <div className="flex flex-col align-middle p-1 bg-blue-200 bg-opacity-30">
          
          {/* Navigation Buttons */}
          <div className="flex justify-between py-1">

            <div className='flex'>
            <button
              onClick={handlePrevious}
              disabled={currentImageIndex === 0}
              className={`mr-1 p-1 w-24 bg-blue-500 text-white border border-blue-700 rounded hover:bg-blue-600 ${
                currentImageIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Previous
            </button>

            <button
              onClick={handleNext}
              disabled={currentImageIndex === images.length - 1}
              className={`mr-1 p-1 w-24 bg-blue-500 text-white border border-blue-700 rounded hover:bg-blue-600 ${
                currentImageIndex === images.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Next
            </button>

            </div>

            <div className='flex'>

            <label className={`mr-1 p-1 w-fit bg-blue-500 text-white border border-blue-700 rounded hover:bg-blue-600 ${
                currentImageIndex === images.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}>
              <input
                type="file"
                id="imageFolder"
                accept="image/png"
                multiple
                directory=""
                webkitdirectory=""
                className="hidden"
                onChange={loadFolder}
              />
              Upload PNG Folder
            </label>

            <button
              onClick={handleSaveObservations}
              disabled={images.length===0}
              className="mr-1 p-1 w-fit bg-green-500 text-white border border-green-700 rounded hover:bg-green-600"
            >
              Save Observations
            </button>

            <button
              onClick={handleReset}
              className="p-1 w-32 bg-red-500 text-white border border-red-700 rounded hover:bg-red-600"
            >
              Reset Viewer
            </button>
            </div>
        
          </div>
          
          {/* Image Metadata */}
          <div className="flex justify-between py-1 text-sm">
            <div>File Name: {imageMetadata.name || "N/A"}</div>
            <div>Dimensions: {imageMetadata.dimensions  || "N/A"}</div>
          </div>

          {/* Image Display */}
          <div className="flex justify-around bg-white border-2 border-dashed boder-blue-200">
            {images.length > 0 ? (
              <Image
                src={images[currentImageIndex]?.url}
                alt='spine image'
                width={0}
                height={0}
                className="h-96 w-auto bg-contain"
              />
            ) : (
              <div className="h-96 flex items-center justify-center text-gray-400">
                No Image Loaded
              </div>
            )}
            {/* Report Writing Section */}
            {images.length > 0 && (
            <div className="w-full ml-1 p-1 bg-gray-50 flex flex-col items-center justify-start">
                <h3 className="font-medium mb-2">Observations:</h3>
                <textarea
                value={reports[currentImageIndex] || ''}
                onChange={handleReportChange}
                className="w-full h-full p-1 border border-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your observations here..."
                ></textarea>
            </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
