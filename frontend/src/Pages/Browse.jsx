import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TextField, Button, FormControl, Select, MenuItem, 
  Typography, Container, Box, Chip, IconButton,
  Card, CardContent, InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import { departments, examType } from '../utils/constants';
import axios from 'axios';
import PaperDisplay from '../Components/PaperDisplay';
import { useUser } from '@clerk/clerk-react';

const Browse = () => {
  const { isSignedIn } = useUser();
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortOrder, setSortOrder] = useState('newest');
  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
  
  const [filters, setFilters] = useState({
    department: '',
    exam: '',
    semester: ''
  });

  const [papersToDisplay, setPapersToDisplay] = useState([]);
  const [papersFetched, setPapersFetched] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const getAllPapers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BACKEND_URL}/getallpapers/`);
      const papers = Array.isArray(response.data) ? response.data : [];
      setPapersFetched(papers);
      setPapersToDisplay(papers);
    } catch (error) {
      console.error(error);
      setPapersFetched([]);
      setPapersToDisplay([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPapers();
  }, [BACKEND_URL]);

  const handleSearch = () => {
    if (!Array.isArray(papersFetched)) return;
    
    const filtered = papersFetched.filter(paper =>
      paper.subjectName.toLowerCase().includes(searchValue.toLowerCase()) ||
      paper.department.toLowerCase().includes(searchValue.toLowerCase()) ||
      paper.examType.toLowerCase().includes(searchValue.toLowerCase()) ||
      paper.semester.toString().includes(searchValue)
    );
    
    setPapersToDisplay(filtered);
  };

  const handleFilter = () => {
    if (!Array.isArray(papersFetched)) return;

    const newFilters = [];
    if (filters.department) newFilters.push(`Department: ${filters.department}`);
    if (filters.exam) newFilters.push(`Exam: ${filters.exam}`);
    if (filters.semester) newFilters.push(`Semester: ${filters.semester}`);
    setActiveFilters(newFilters);

    const filtered = papersFetched.filter(paper =>
      (!filters.department || paper.department === filters.department) &&
      (!filters.exam || paper.examType === filters.exam) &&
      (!filters.semester || paper.semester.toString() === filters.semester.toString())
    );

    setPapersToDisplay(filtered);
  };

  const handleSort = () => {
    if (!Array.isArray(papersToDisplay)) return;
    
    const sorted = [...papersToDisplay].sort((a, b) => {
      if (sortOrder === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return new Date(a.createdAt) - new Date(b.createdAt);
    });
    
    setPapersToDisplay(sorted);
    setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest');
  };

  const removeFilter = (filterToRemove) => {
    const filterType = filterToRemove.split(':')[0].trim().toLowerCase();
    setFilters(prev => ({
      ...prev,
      [filterType === 'exam' ? 'exam' : filterType]: ''
    }));
    setActiveFilters(prev => prev.filter(f => f !== filterToRemove));
    handleFilter();
  };

  return (
    <Container maxWidth="lg" className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h3" className="mb-8 font-bold text-gray-800">
          Find Your Paper
        </Typography>

        <Card className="mb-8 shadow-lg">
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search by subject, department, or exam type..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <div className="flex gap-2">
                <IconButton onClick={() => setShowFilters(!showFilters)}>
                  <FilterListIcon />
                </IconButton>
                <IconButton onClick={handleSort}>
                  <SortIcon />
                </IconButton>
                <Button variant="contained" onClick={handleSearch}>
                  Search
                </Button>
              </div>
            </div>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  <FormControl fullWidth>
                    <Select
                      value={filters.department}
                      onChange={(e) => setFilters({ ...filters, department: e.target.value })}
                      displayEmpty
                      placeholder="Department"
                    >
                      <MenuItem value="">All Departments</MenuItem>
                      {departments.map((dept) => (
                        <MenuItem key={dept.dept} value={dept.dept}>{dept.dept}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <Select
                      value={filters.semester}
                      onChange={(e) => setFilters({ ...filters, semester: e.target.value })}
                      displayEmpty
                    >
                      <MenuItem value="">All Semesters</MenuItem>
                      {semesters.map((sem) => (
                        <MenuItem key={sem} value={sem}>Semester {sem}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <Select
                      value={filters.exam}
                      onChange={(e) => setFilters({ ...filters, exam: e.target.value })}
                      displayEmpty
                    >
                      <MenuItem value="">All Exam Types</MenuItem>
                      {examType.map((type) => (
                        <MenuItem key={type.type} value={type.type}>{type.type}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Button
                    variant="contained"
                    onClick={handleFilter}
                    className="md:col-span-3"
                  >
                    Apply Filters
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {activeFilters.length > 0 && (
              <Box className="mt-4 flex flex-wrap gap-2">
                {activeFilters.map((filter) => (
                  <Chip
                    key={filter}
                    label={filter}
                    onDelete={() => removeFilter(filter)}
                    className="bg-blue-100"
                  />
                ))}
              </Box>
            )}
          </CardContent>
        </Card>

        <motion.div
          layout
          className="bg-gray-50 rounded-xl p-6 min-h-[60vh]"
        >
          {loading ? (
            <div className="flex justify-center items-center h-[60vh]">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <SearchIcon className="text-4xl text-gray-400" />
              </motion.div>
            </div>
          ) : Array.isArray(papersToDisplay) && papersToDisplay.length > 0 ? (
            <AnimatePresence>
              <div className="grid gap-4">
                {papersToDisplay.map((paper, index) => (
                  <motion.div
                    key={paper.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <PaperDisplay paper={paper} />
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-[60vh] text-gray-500"
            >
              <SearchIcon className="text-6xl mb-4" />
              <Typography variant="h5">No papers found</Typography>
              <Typography>Try adjusting your search or filters</Typography>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </Container>
  );
};

export default Browse;