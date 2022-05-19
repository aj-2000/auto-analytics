import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import InsightsIcon from '@mui/icons-material/Insights';
export const Navbar = () => {
    return(
        <AppBar position='static'>
            <Toolbar>
                <IconButton size="large" edge="start" color="inherit" aria-label="logo">
                    <InsightsIcon/>
                </IconButton>
                <Typography variant="h4">
                    DASHBOARD
                </Typography>
            </Toolbar>
        </AppBar>
    )
}