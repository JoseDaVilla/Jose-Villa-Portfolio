import { useState, useEffect } from 'react';

export const useImagePreloader = (projects) => {
    const [imageLoadErrors, setImageLoadErrors] = useState({});

    useEffect(() => {
        const preloadImage = (src, projectId, imageIndex) => {
            const img = new Image();
            img.src = src;
            img.onerror = () => {
                setImageLoadErrors(prev => ({
                    ...prev,
                    [`${projectId}-${imageIndex}`]: true,
                }));
                console.error(`Failed to load image: ${src}`);
            };
        };

        projects.forEach(project => {
            const imagesToLoad = project.images && project.images.length > 0 ? project.images : [project.image];
            imagesToLoad.forEach((imageSrc, index) => {
                if (imageSrc) { // Ensure the image source exists before preloading
                    preloadImage(imageSrc, project.id, index);
                }
            });
        });
    }, [projects]);

    return imageLoadErrors;
};