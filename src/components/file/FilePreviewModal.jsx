import React, { useEffect, useState } from 'react';
import service from '../../appwrite/config';
import { Audio as AudioComponent, Video as VideoComponent } from '../../assets/google/Icons';
import CustomSpinner from '../common/CustomSpinner'; // Adjust the import based on your file structure

const FilePreviewModal = ({ file, isOpen, onClose }) => {
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState('')

    useEffect(() => {
        const getUrl = async () => {
            const res = await service.getPreview(file.$id)
            console.log(url);
            setUrl(res)
            setLoading(false)
        }
        getUrl()
        if (isOpen) {
            setLoading(true); // Reset loading state when the modal is opened
        }
    }, [isOpen]);

    const handleLoadedData = () => {
        setLoading(false);
    };

    const renderPreviewContent = () => {
        const mimeType = file.mimeType;
        if (mimeType.startsWith('image')) {
            return <img src={url} alt={file.name} className="w-full h-auto" onLoad={handleLoadedData} />;
        } else if (mimeType.startsWith('audio')) {
            return (
                <audio controls src={url} className="w-full" onLoadedData={handleLoadedData}>
                    <AudioComponent />
                </audio>
            );
        } else if (mimeType.startsWith('video')) {
            return (
                <video controls src={url} className="w-full h-auto" onLoadedData={handleLoadedData}>
                    <VideoComponent />
                </video>
            );
        } else {
            setLoading(false); // No need to wait for loading for unsupported types
            return <p className="text-center">Preview not available for this file type</p>;
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-4 max-w-lg w-full">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl">{file.name}</h2>
                    <button onClick={onClose} className="text-xl font-bold">&times;</button>
                </div>
                <div className="mt-4">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <CustomSpinner />
                        </div>
                    ) : (
                        renderPreviewContent()
                    )}
                </div>
            </div>
        </div>
    );
};

export default FilePreviewModal;
