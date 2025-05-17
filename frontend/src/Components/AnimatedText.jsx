import React from 'react'
import TypeWriterEffect from 'react-typewriter-effect';
import Typography from '@mui/material/Typography';


const AnimatedText = ({text}) => {
  return (
    <TypeWriterEffect
      textStyle={{
        fontFamily: 'monospace',
        fontSize: '2rem',
      }}
      startDelay={100}
      cursorColor="black"
      text={text}
      typeSpeed={70}
      hideCursorAfterText={false}
      loop={true}
    />
  )
}

export default AnimatedText
