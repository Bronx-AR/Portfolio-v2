import Image from 'next/image';
import React from 'react';

const Lightbox = ({ image, closeLightbox }) => {
    return (
        <>
            <div className="mfp-bg mfp-ready" onClick={closeLightbox}>
                <div className="mfp-wrap mfp-close-btn-in mfp-ready">
                    <div className="mfp-container mfp-s-ready mfp-image-holder">
                        <div className="mfp-content">
                            <div className="mfp-figure">
                                <button className="mfp-close">×</button>
                                <Image src={image} alt="image" placeholder="blur" style={{ opacity: 1 }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Lightbox;
