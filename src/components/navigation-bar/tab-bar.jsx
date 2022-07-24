import React from 'react'
import { useLocation } from 'react-router-dom'
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material'
// Styles
import './navigation-bar.css'

const TabTar = ({ onGetReport }) => {
  const { pathname } = useLocation();
  pathname.includes('tree-report')
  return (
    <Box sx={{ flexGrow: 1, alignItems: 'center' }}>
      <AppBar position="static" sx={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }} >
        {
          pathname.includes('tree-report') ?
            <div className='toolbar-container'>
              <Toolbar sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                <Typography variant="h6" component="div">
                  <Button variant="contained" color="success" href='#healthy'>Healthy trees</Button>
                </Typography>
              </Toolbar>
              <Toolbar sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                <Typography variant="h6" component="div">
                  <Button variant="contained" color="success" href='#removal'>Need removal trees</Button>
                </Typography>
              </Toolbar>
              <Toolbar sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                <Typography variant="h6" component="div">
                  <Button variant="contained" color="success" href='#treatment'>Need some treatment</Button>
                </Typography>
              </Toolbar>
            </div> : null
        }

        <Toolbar sx={{ alignItems: 'center', justifyContent: 'flex-end', justifySelf: 'flex-end' }}>
          <Typography variant="h6" component="div">
            <Button variant="contained" color="success" onClick={onGetReport}>Get Trees Report</Button>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default TabTar 