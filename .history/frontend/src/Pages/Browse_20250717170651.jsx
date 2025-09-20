import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { Button, FormControl, Select, MenuItem } from '@mui/material';
import { departments, examType } from '../utils/constants';
import axios from 'axios';
import PaperDisplay from '../Components/PaperDisplay';
import { useUser } from '@clerk/clerk-react';
import {ColorRing} from 'react-loader-spinner'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
  border: 5,
  borderColor: 'black'
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 5,
  borderColor: 'black'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '70ch',
    },
    border: 5,
    borderColor: 'black'
  },
}));

const Browse = () => {

  const { isSignedIn } = useUser()
  const [loading, setLoading] = useState(false)

  const [searchValue, setSearchValue] = useState('');
  const semesters = [1, 2, 3, 4, 5, 6, 7, 8]
  const [department, setDepartment] = React.useState('')
  const [exam, setExam] = React.useState('')
  const [sem, setSem] = React.useState('')

  const [papersToDisplay, setPapersToDisplay] = useState(null);
  const [papersFetched, setPapersFetched] = useState(null);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

  const getAllPapers = async () => {
    setLoading(true)
    const response = await axios.get(`${BACKEND_URL}/getallpapers/`)
    setPapersFetched(response.data);
    // console.log(response.data)
    setLoading(false)
    return { data: response.data }
  }

  const getConnectionStatus = async ()=>{
    setLoading(true)
    const response = await axios.get(`${BACKEND_URL}/healthz/`)
    setLoading(false)
    console.log(response.data)
    return response.data;
  }

  useEffect(() => {

    try {
      // if(isSignedIn){
      //   getAllPapers()
      // }
      // getAllPapers()
      getConnectionStatus()
    } catch (error) {
      console.log(error)
    }
  }, [BACKEND_URL, isSignedIn])

  const handleSearch = async () => {
    if (!papersFetched) {
      //api calling


    } else {
      // actions on papersfetched
      setLoading(true)
      const filter = papersFetched.filter(paper =>
        paper.subjectName.toLowerCase().includes(searchValue.toLowerCase()) ||
        paper.department.toLowerCase().includes(searchValue.toLowerCase()) ||
        paper.examType.toLowerCase().includes(searchValue.toLowerCase()) ||
        paper.semester.toLowerCase().includes(searchValue.toLowerCase())
      )
      setPapersToDisplay(filter)
      setLoading(false)
      // console.log(filter)
      return;
    }

  }

  const handleFilter = async () => {
    if (!papersFetched) {
      //api calling
    } else {
      // actions on papers fetched

      setLoading(true)
      const filter = papersFetched.filter(paper =>
        paper.department.toLowerCase().includes(department.toLowerCase()) &&
        paper.examType.toLowerCase().includes(exam.toLowerCase()) &&
        paper.semester.includes(sem)
      )
      setPapersToDisplay(filter)
      setLoading(false)
      // console.log(filter)
      return
    }
  }

  return (
    <div className='flex flex-col m-5'>
      <span className='text-4xl font-semibold'>Find your paper here</span>

      <div id='search' className='flex flex-row mt-4 '>
        <Search sx={{
          border: 2,
          borderColor: 'black',
        }}
        >
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Subject Name"
            inputProps={{ 'aria-label': 'search' }}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </Search>
        <Button variant='contained' onClick={handleSearch} disabled={loading}>Search</Button>
      </div>

      <form id='filters' className=' mt-3 flex flex-row gap-2 ml-5' onSubmit={handleFilter}>
        <FormControl>
          <Select
            labelId="department"
            aria-placeholder='Department'
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            sx={{
              width: 'vh',
              height: '5vh',
              overflow: 'scroll'
            }}
            placeholder='Department'
            displayEmpty
          >
            <MenuItem value="" disabled>
              Department
            </MenuItem>
            {departments.map((department) => <MenuItem value={department.dept}>{department.dept}</MenuItem>)}
          </Select>
        </FormControl>

        <FormControl>
          <Select
            labelId="semester"
            aria-placeholder='Semester'
            id="semester"
            value={sem}
            onChange={(e) => setSem(e.target.value)}
            sx={{
              width: 'vh',
              height: '5vh',
              overflow: 'scroll'
            }}
            placeholder='Semester'
            displayEmpty
          >
            <MenuItem value="" disabled>
              Semester
            </MenuItem>
            {semesters.map((semester) => <MenuItem value={semester}>{semester}</MenuItem>)}
          </Select>

        </FormControl>

        <FormControl>
          <Select
            labelId="examType"
            aria-placeholder='Exam-Type'
            id="examType"
            value={exam}
            onChange={(e) => setExam(e.target.value)}
            sx={{
              width: 'vh',
              height: '5vh',
              overflow: 'scroll'
            }}
            placeholder='Exam Type'
            displayEmpty
          >
            <MenuItem value="" disabled>
              Exam Type
            </MenuItem>
            {examType.map((exam,index) => <MenuItem value={exam.type} key={index}>{exam.type}</MenuItem>)}
          </Select>
        </FormControl>

        <Button variant='contained' onClick={handleFilter} disabled={loading}>Search</Button>
      </form>


      <div className='mt-10 rounded-xl p-2 bg-gray-100 h-[60vh] overflow-scroll'>
        {loading ?  <div className='h-full flex flex-col justify-center items-center'>
          <ColorRing
          visible={true}
          width="100"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          ariaLabel="infinity-spin-loading"/>
        </div> : <></>}
        <div className={`${loading ? 'hidden' : ''}`}>
          {papersToDisplay ? <div className='flex flex-col gap-2'>
            {papersToDisplay.map((paper) => <PaperDisplay paper={paper} key={paper.id} />)}
          </div> : <span className='text-gray-400 text-5xl'>Papers displayed here</span>}
        </div>
       
      </div>
    </div>
  )
}

export default Browse
