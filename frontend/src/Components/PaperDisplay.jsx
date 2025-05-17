import React from 'react'
import { IoMdDownload } from "react-icons/io";
import { FaEye } from "react-icons/fa";

const PaperDisplay = ({ paper }) => {
    return (
        <div className=' bg-gray-200 flex flex-row p-2 justify-between rounded-lg'>
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
                <FaEye size={25} />
            </div>

        </div>
    )
}

export default PaperDisplay
