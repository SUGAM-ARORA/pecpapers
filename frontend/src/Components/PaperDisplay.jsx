import React, { useState } from 'react';
import { IoMdDownload } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import Modal from 'react-modal';
import Slider from 'react-slick';
import JSZip from "jszip";
import { saveAs } from "file-saver";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const NextArrow = (props) => {
    const { className,  onClick } = props;
    return (
        <div onClick={onClick} className={`arrow ${className}`} >
            {console.log(`arrow ${className}`)}
            <FaArrowRight class="arrows" style={{ color: "white" }} />
        </div>
    )
};

const PrevArrow = (props) => {
    const { className, onClick } = props;
    return (
        <div onClick={onClick} className={`arrow ${className}`} >
            <FaArrowLeft class="arrows" style={{ color: "white" }} />
        </div>
    )
};

const downloadImagesAsZip = async (paper) => {
    const zip = new JSZip();
    const folder = zip.folder("images");

    const imageUrls = paper.cloudUrl;
    const zipFileName = `${paper.semester}th_sem_${paper.subjectName}_${paper.examType}.zip`;

    for (const i in imageUrls) {
        const url = imageUrls[i];
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            folder.file(`image_${i}.jpg`, blob);
        }
        catch (error) {
            console.error(`Failed to fetch image ${url}`, error);
        }
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, zipFileName);
};

const PaperDisplay = ({ paper }) => {
    const [modalOpen, setModalOpen] = useState(false);

    const sliderSettings = {
        dots: false,
        arrows: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    const images = Array.isArray(paper.cloudUrl) ? paper.cloudUrl : [paper.cloudUrl];

    return (
        <div className='bg-gray-200 flex flex-row p-2 justify-between rounded-lg'>
            <div className='flex flex-col'>
                <div className='flex flex-row gap-2'>
                    <img src={Array.isArray(paper.cloudUrl) ? paper.cloudUrl[0] : paper.cloudUrl} alt="paper" className='h-12 w-12' />
                    <span className='font-semibold mt-2'>{paper.semester}th sem {paper.subjectName} {paper.examType}</span>
                </div>
                <span className='ml-[7vh]'>Comments : {paper.comments}</span>
            </div>

            <div className='flex flex-row gap-2 mt-2'>
                <IoMdDownload
                    size={25}
                    style={{ cursor: "pointer" }}
                    onClick={() => downloadImagesAsZip(paper)}
                />
                <div onClick={() => setModalOpen(true)} className='cursor-pointer'>
                    <FaEye size={25} />
                </div>
            </div>

            <Modal
                isOpen={modalOpen}
                onRequestClose={() => setModalOpen(false)}
                contentLabel="Image Viewer"
                style={{
                    content: {
                        maxWidth: '80vw',
                        maxHeight: '80vh',
                        margin: 'auto',
                        padding: 0,
                        background: 'white',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center'
                    },

                }}
                ariaHideApp={false}
            >
                <div style={{ width: "100%" }}>
                    <Slider {...sliderSettings}>
                        {images.map((url, index) => (
                            <div key={index} style={{ height: "70vh", display: 'flex', alignItems: 'center' }}>
                                <img
                                    src={url}
                                    alt={`Slide ${index}`}
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '80vh',
                                        objectFit: 'contain',
                                        display: 'block',
                                        margin: '0 auto',
                                    }}
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
            </Modal>
        </div>
    );
};

export default PaperDisplay;
