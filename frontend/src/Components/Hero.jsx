import React, { useContext } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import logo from '../assets/image.png'
import { Button, Typography } from '@mui/material';
import AnimatedText from './AnimatedText';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import gitimg from '../assets/github.png'
import fbimg from '../assets/fb.jpg'
import Marquee from "react-fast-marquee";

const Hero = () => {

    const navigate = useNavigate();
    const { open, setOpen } = useContext(AppContext)
    console.log(open)

    const handleFindPaper = async () => {
        navigate('/browse')
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <>
            <div className='flex flex-col items-center m-5'>
                <Card variant="outlined" sx={
                    {
                        backgroundColor: '#EEEEEE',
                        borderRadius: '5px',
                        // width: {
                        //     md: '75vh',
                        //     sm: 'vh'
                        // },
                        padding: '1vh'
                    }
                }>
                    <div className='flex flex-col'>
                        <div className='flex flex-row gap-6'>
                            <img src={logo} className='h-20 w-30' />
                            <span className='text-3xl mt-5'><AnimatedText text={"Welcome to PEC Papers"} /></span>
                        </div>
                        <div className='ml-[80px]'>
                            <Typography>Hello Pecobians, </Typography>
                            <br></br>
                            <Typography>This is an attempt to make the quest for finding previous years question papers during exam days a bit easier.🫰🏻 </Typography>
                            <Typography>To make this a useful resource for yourself and upcoming PECOBIANS please contribute to the cause.♥️</Typography>
                        </div>
                        <div className='ml-[80px] mt-8 flex flex-row justify-between mr-[20px]'>
                            <div>
                                <Typography fontFamily={'IBM Plex Serif'} fontWeight={'10'}>HAD AN EXAM?</Typography>
                                <Button variant='contained' onClick={handleClickOpen}>Upload a Paper</Button>
                            </div>
                            <div>
                                <Typography fontFamily={'IBM Plex Serif'} fontWeight={'10'}> EXAMS AAGYE???</Typography>

                                <Button variant='contained' onClick={handleFindPaper}>Find your PYQ</Button>
                            </div>

                        </div>
                    </div>
                </Card>
            </div>

            <div className='m-5 mt-10 flex flex-col'>
                <span className='text-4xl font-bold'>Thanks to the OG's </span>
                <div className='flex flex-col items-center'>
                    <div className='flex flex-row justify-between'>
                        <div className='flex flex-col items-center'>
                            <img src={gitimg} alt="" className='h-[150px] w-[150px]' />
                            <span>PEC-CSS/PEC-Previous-Year-Papers</span>
                            {/* <a href="https://github.com/PEC-CSS/PEC-Previous-Year-Papers" className='text-blue-300 underline' target='_blank'>Link</a> */}
                        </div>
                        <div className='flex flex-col items-center'>
                            <img src={fbimg} alt="" className='h-[150px] w-[150px]' />
                            <span>FEC-Old Papers Facebook Page</span>
                            {/* <a href="https://www.facebook.com/groups/210092355990810/" className='text-blue-300 underline' target='_blank'>Link</a> */}
                        </div>
                    </div>
                </div>
                
            </div>
            <Marquee gradient={false} speed={60} className='text-lg'>
  🚀 More features would be coming soon! till then lets grow this 🦾
</Marquee>
        </>
    )
}

export default Hero
