import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, Typography, IconButton, Chip, Box } from '@mui/material';
import { IoMdDownload } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { MdSubject } from "react-icons/md";

const PaperDisplay = ({ paper }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="flex justify-between items-start p-4">
          <Box className="flex-grow">
            <div className="flex items-center gap-3 mb-2">
              <MdSubject className="text-blue-500 text-2xl" />
              <Typography variant="h6" className="font-semibold">
                {paper.subjectName}
              </Typography>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-3">
              <Chip 
                label={`Semester ${paper.semester}`}
                size="small"
                className="bg-blue-100"
              />
              <Chip 
                label={paper.department}
                size="small"
                className="bg-purple-100"
              />
              <Chip 
                label={paper.examType}
                size="small"
                className="bg-green-100"
              />
            </div>

            {paper.comments && (
              <Typography variant="body2" color="text.secondary" className="mt-2">
                {paper.comments}
              </Typography>
            )}
          </Box>

          <Box className="flex gap-2">
            <IconButton 
              component="a"
              href={paper.cloudUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700"
            >
              <FaEye size={20} />
            </IconButton>
            <IconButton
              component="a"
              href={paper.cloudUrl}
              download
              className="text-green-500 hover:text-green-700"
            >
              <IoMdDownload size={20} />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PaperDisplay;