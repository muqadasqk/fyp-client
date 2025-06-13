import { Button, Overlay } from '@components';
import { cropImage } from '@utils';
import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';

const ImageCropper = ({ onCropDone, image }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);

    React.useEffect(() => {
        if (!image) return;
        const reader = new FileReader();
        reader.onload = () => setImageSrc(reader.result);
        reader.readAsDataURL(image);
    }, [image]);

    const onCropComplete = useCallback((_, areaPixels) => {
        setCroppedAreaPixels(areaPixels);
    }, []);

    const handleCrop = async () => {
        try {
            const croppedImageUrl = await cropImage(imageSrc, croppedAreaPixels);
            onCropDone(croppedImageUrl);
        } catch (e) {
            console.error("Crop failed:", e);
        }
    };

    return (
        <Overlay title="Crop your profile image">
            <div className="relative h-96 bg-primary mt-4">
                <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                />
            </div>
            <Button onClick={handleCrop} className="w-full mt-2">Save crop</Button>
        </Overlay>
    );
};

export default ImageCropper;
