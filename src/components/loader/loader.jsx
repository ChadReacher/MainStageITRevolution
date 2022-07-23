import React from 'react'
// Components
import { CircularProgress, Box } from '@mui/material';

const Loader = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 30 }}>
    <CircularProgress />
  </Box>
)

export default Loader