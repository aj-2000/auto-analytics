import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Insights } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
const pages = [['DASHBOARD','/'], ['DATA ANALYZER','/analyzer']];

const Navbar = () => {
  
    let navigate = useNavigate();

    function handleAnalyze(event) {
        navigate("/analyzer", { replace: true });
    }

    function handleDashboard(event) {
        navigate("/", { replace: true });
    }
   



  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Insights sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={handleDashboard}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            AUTO ANALYTICS
          </Typography>


          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
    
            <Button
            active
            key="dashboard"
            onClick={handleDashboard}
            sx={{ my: 2, color: 'white', display: 'block' }}
            >
            DASHBOARD
            </Button>
            <Button
            key="analyzer"
            onClick={handleAnalyze}
            sx={{ my: 2, color: 'white', display: 'block' }}
            >
            DATA ANALYZER
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
