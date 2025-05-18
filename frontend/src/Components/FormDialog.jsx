import React, { useState, useContext } from 'react';
import {
  Dialog,
  Button,
  TextField,
  FormControl,
  Typography,
  Select,
  MenuItem,
  Box,
  Stepper,
  Step,
  StepLabel,
  Paper
} from '@mui/material';
import { departments, examType } from '../utils/constants';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { InfinitySpin } from 'react-loader-spinner';
import { AppContext } from '../context/AppContext';
import Toast from './Toast';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const steps = ['Select Details', 'Upload Paper', 'Add Comments'];

export default function FormDialog() {
  const { open, setOpen } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const [openToast, setOpenToast] = useState(false);
  
  const [formData, setFormData] = useState({
    department: '',
    examType: '',
    semester: '',
    subjectName: '',
    comments: ''
  });

  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

  const handleClose = () => {
    setOpen(false);
    setActiveStep(0);
    setFormData({
      department: '',
      examType: '',
      semester: '',
      subjectName: '',
      comments: ''
    });
    setFile('');
  };

  const handleFileChange = (e) => {
    const filename = e.target.files[0];
    if (filename) {
      setFile(filename);
    }
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", import.meta.env.VITE_APP_UPLOAD_PRESET);
      formData.append("cloud_name", import.meta.env.VITE_APP_CLOUD_NAME);

      const response = await axios.post(import.meta.env.VITE_APP_CLOUDINARY_URL, formData);
      const cloudinaryUrl = response.data.secure_url;

      const paperDetails = {
        department: formData.department,
        cloudUrl: cloudinaryUrl,
        examType: formData.examType,
        semester: formData.semester,
        subjectName: formData.subjectName,
        comments: formData.comments
      };

      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/upload-paper/`, { data: paperDetails });
      
      handleClose();
      setOpenToast(true);
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setLoading(false);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <FormControl fullWidth>
              <Typography>Department</Typography>
              <Select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="mt-2"
              >
                {departments.map((dept) => (
                  <MenuItem key={dept.dept} value={dept.dept}>{dept.dept}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <Typography>Exam Type</Typography>
              <Select
                value={formData.examType}
                onChange={(e) => setFormData({ ...formData, examType: e.target.value })}
                className="mt-2"
              >
                {examType.map((type) => (
                  <MenuItem key={type.type} value={type.type}>{type.type}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <Typography>Semester</Typography>
              <Select
                value={formData.semester}
                onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                className="mt-2"
              >
                {semesters.map((sem) => (
                  <MenuItem key={sem} value={sem}>{sem}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <Paper
              variant="outlined"
              className="p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => document.getElementById('upload-image').click()}
            >
              <CloudUploadIcon className="text-6xl mb-4 text-blue-500" />
              <Typography variant="h6">
                {file ? file.name : 'Click to upload paper'}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Supported formats: JPG, PNG, PDF
              </Typography>
              <input
                accept="image/*,.pdf"
                id="upload-image"
                type="file"
                hidden
                onChange={handleFileChange}
              />
            </Paper>

            <FormControl fullWidth>
              <Typography>Subject Name</Typography>
              <TextField
                value={formData.subjectName}
                onChange={(e) => setFormData({ ...formData, subjectName: e.target.value })}
                className="mt-2"
              />
            </FormControl>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <FormControl fullWidth>
              <Typography>Additional Comments</Typography>
              <TextField
                multiline
                rows={4}
                value={formData.comments}
                onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                placeholder="Add any helpful information about this paper..."
                className="mt-2"
              />
            </FormControl>
          </motion.div>
        );

      default:
        return 'Unknown step';
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          className: 'p-6'
        }}
      >
        <Typography variant="h5" className="mb-6 text-center font-bold">
          Share a Paper
        </Typography>

        <Stepper activeStep={activeStep} className="mb-8">
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {getStepContent(activeStep)}
          </AnimatePresence>

          {loading && (
            <Box className="flex justify-center my-4">
              <InfinitySpin color="#4fa94d" />
            </Box>
          )}

          <Box className="flex justify-between mt-8">
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>
            <div>
              <Button onClick={handleClose} className="mr-2">
                Cancel
              </Button>
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  type="submit"
                  disabled={loading}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                >
                  Next
                </Button>
              )}
            </div>
          </Box>
        </form>
      </Dialog>
      
      <Toast opentoast={openToast} setOpenToast={setOpenToast} message="Paper uploaded successfully!" />
    </>
  );
}