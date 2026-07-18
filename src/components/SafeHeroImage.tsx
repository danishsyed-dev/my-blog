'use client';

import { useState } from 'react';

interface SafeHeroImageProps {
    src: string;
    alt?: string;
    className?: string;
    style?: React.CSSProperties;
}

export function SafeHeroImage({ src, alt = '', className, style }: SafeHeroImageProps) {
    const [broken, setBroken] = useState(false);

    if (broken) return null;

    return (
        <img
            src={src}
            alt={alt}
            aria-hidden="true"
            className={className}
            style={style}
            onError={() => setBroken(true)}
        />
    );
}
