import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { FormControl, Typography, InputLabel, Select, MenuItem } from '@mui/material';
import { departments, examType } from '../utils/constants';
import axios from 'axios'
import { InfinitySpin } from 'react-loader-spinner'
import { AppContext } from '../context/AppContext';
import Toast from './Toast';

export default function FormDialog() {
  const { open, setOpen } = React.useContext(AppContext)
  const [loading, setLoading] = React.useState(false)
  const [files, setFiles] = React.useState('')

  const semesters = [1, 2, 3, 4, 5, 6, 7, 8]

  const [department, setDepartment] = React.useState('')
  const [exam, setExam] = React.useState('')
  const [sem, setSem] = React.useState('')

  const CLOUDINARY_URL = import.meta.env.VITE_APP_CLOUDINARY_URL
  const UPLOAD_PRESET = import.meta.env.VITE_APP_UPLOAD_PRESET
  const CLOUD_NAME = import.meta.env.VITE_APP_CLOUD_NAME
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

  const [opentoast, setOpenToast] = React.useState(false)

  const handleFileChange = (e) => {
    const filename = e.target.files;
    if (filename) {
      setFiles(filename)
    }
  }

  const uploadImages = async (files) => {
    const uploadPromises = Array.from(files).map(file => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);
      formData.append("cloud_name", CLOUD_NAME);
      return axios.post(CLOUDINARY_URL, formData);
    });

    try {
      const responses = await Promise.all(uploadPromises);
      const urlList = responses.map(res => res.data.secure_url);
      console.log(urlList.length + " images uploaded");
      return urlList;
    }
    catch (error) {
      console.error("Cloudinary image uploads failed:", error);
      throw error;
    }
  };

  const uploadPaperDetails = async(e, urlList) => {
    try {
      const paperDetails = {
        department: e.target[0].value,
        cloudUrl: urlList,
        examType: e.target[2].value,
        semester: e.target[4].value,
        subjectName: e.target[6].value,
        comments: e.target[9].value
      }

      const dataRes = await axios.post(`${BACKEND_URL}/upload-paper/`, { data: paperDetails })
      console.log("Paper details uploaded successfully");
    }
    catch (error) {
      console.error("Paper details upload failed", error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    const urlList = await uploadImages(files);
    await uploadPaperDetails(e, urlList);

    e.target.reset()
    setDepartment('')
    setExam('')
    setSem('')
    setLoading(false)
    setOpen(false)
    setOpenToast(true)
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpload = async () => {

  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <form className='flex flex-col gap-5 m-5 ' onSubmit={handleSubmit}>
          <FormControl>
            <Typography fontSize={25} >Upload a Paper</Typography>
            <div >
              <Typography>Department</Typography>
              <Select
                required="true"
                labelId="department"
                aria-placeholder='Department'
                id="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                sx={{
                  width: '50vh',
                  height: '5vh',
                  overflow: 'scroll'
                }}
              >
                {departments.map((department) => <MenuItem value={department.dept}>{department.dept}</MenuItem>)}
              </Select>
            </div>
          </FormControl>

          <FormControl>
            <div>
              <Typography>Exam Type</Typography>
              <Select
                required="true"
                labelId="Exam-type"
                aria-placeholder='Exam Type'
                id="exam-type"
                sx={{
                  width: '50vh',
                  height: '5vh',
                  overflow: 'scroll'
                }}
                value={exam}
                onChange={(e) => setExam(e.target.value)}
              >
                {examType.map((type) => <MenuItem value={type.type}>{type.type}</MenuItem>)}
              </Select>
            </div>
          </FormControl>

          <FormControl>
            <div>
              <Typography>Semester</Typography>
              <Select
                required="true"
                labelId="Semester"
                aria-placeholder='Semester'
                id="exam-type"
                sx={{
                  width: '50vh',
                  height: '5vh',
                  overflow: 'scroll'
                }}
                value={sem}
                onChange={(e) => setSem(e.target.value)}
              >
                {semesters.map((sem) => <MenuItem value={sem}>{sem}</MenuItem>)}
              </Select>
            </div>
          </FormControl>

          <FormControl>
            <div>
              <Typography>Subject Name</Typography>
              <TextField
                sx={{ width: '50vh', height: '5vh' }}
                required="true"
              >
              </TextField>
            </div>
          </FormControl>

          <FormControl>
            <div>
              <Typography>Upload Paper <span className='text-xs'>(only img format e.g. jpg,png,jpeg etc.)</span></Typography>
              <input
                accept='image/*'
                id='upload-image'
                type='file'
                multiple='true'
                onChange={handleFileChange}
                required="true"
              />
            </div>
          </FormControl>
          <FormControl>
            <div>
              <Typography>Review or Comments</Typography>
              <TextField sx={{
                width: '50vh',
                height: '5vh'
              }}></TextField>
            </div>
          </FormControl>
          {loading && <InfinitySpin
            visible={true}
            width="100"
            color="#4fa94d"
            ariaLabel="infinity-spin-loading" />}

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant='contained' onClick={handleUpload}>Upload</Button>
          </DialogActions>
        </form>
      </Dialog>
      <Toast opentoast={opentoast} setOpenToast={setOpenToast} message="Paper Upload" />
    </>
  );
}
