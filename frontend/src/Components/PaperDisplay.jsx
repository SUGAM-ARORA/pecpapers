import React, { useState } from 'react';
import { IoMdDownload } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import Modal from 'react-modal';
import Slider from 'react-slick';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const NextArrow = (props) => {
      const { className, style, onClick } = props;
      return(
        <div onClick={onClick} className={`arrow ${className}`} >
          <FaArrowRight class="arrows" style={{color:"white"}}/>
        </div>
      )
};

const PrevArrow = (props) => {
      const { className, style, onClick } = props;
      return(
        <div onClick={onClick} className={`arrow ${className}`} >
          <FaArrowLeft class="arrows" style={{color:"white"}}/>
        </div>
      )
};


const PaperDisplay = ({ paper }) => {
    const [modalOpen, setModalOpen] = useState(false);

    const sliderSettings = {
        dots: true,
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
                    <img src={paper.cloudUrl} alt="paper" className='h-12 w-12' />
                    <span className='font-semibold mt-2'>{paper.semester}th sem {paper.subjectName} {paper.examType}</span>
                </div>
                <span className='ml-[7vh]'>Comments : {paper.comments}</span>
            </div>

            <div className='flex flex-row gap-2 mt-2'>
                <a href={paper.cloudUrl} download={`${paper.semester}th sem ${paper.subjectName} ${paper.examType}`} target='_blank' rel="noopener noreferrer">
                    <IoMdDownload size={25} />
                </a>
                <a onClick={() => setModalOpen(true)}>
                    <FaEye size={25} />
                </a>
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
                    },
                    
                }}
                ariaHideApp={false}
            >
                <Slider {...sliderSettings}>
                    {images.map((url, index) => (
                        <div key={index}>
                            <img
                                src={url}
                                alt={`Slide ${index}`}
                                style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain' }}
                            />
                        </div>
                    ))}
                </Slider>
            </Modal>
        </div>
    );
};

export default PaperDisplay;
