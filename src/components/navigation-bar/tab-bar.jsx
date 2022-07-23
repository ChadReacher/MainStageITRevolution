import React from 'react'
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material'
// Styles
import './navigation-bar.css'

const TabTar = ({ onGetReport }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
          <Typography variant="h6" component="div">
            <Button variant="contained" color="success" onClick={onGetReport}>Get Trees Report</Button>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default TabTar 