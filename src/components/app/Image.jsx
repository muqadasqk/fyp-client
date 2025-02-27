import { useState } from "react";
import logoAvatar from "@assets/images/logoAvatar.png";

const Image = ({ src, className, alt, loading, ...props }) => {
    const [imageSrc, setImageSrc] = useState(src ?? logoAvatar);

    return (
        <img
            src={imageSrc}
            alt={alt ?? "Image"}
            className={className}
            loading={loading ?? "lazy"}
            onError={() => setImageSrc(logoAvatar)}
            {...props}
        />
    );
};

export default Image;
