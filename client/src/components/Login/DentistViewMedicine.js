import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems, secondaryListItems } from '../ListItem/Navbar';
import Medicine from '../Table of Dentist/Medicine';



const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard Dentist
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
        
              
              {/* Recent Appoinment */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Medicine/>
                </Paper>
              </Grid>
            </Grid>
            
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}





// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Logo from '../image/Logo.png';
// import '../Css/Dentist Css/DentistHome.css';

// const DentistHome = ()=> {
//   const [data, setData] = useState([]);
//   useEffect(() => {
//     loadData();
//   }, []);  
//   const loadData = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/get-appointment");
//       setData(response.data);
//       console.log(response.data); // In dữ liệu lấy từ API ra console
//     } catch (error) {
//       console.error(error); // Xử lý lỗi nếu có
//     }
//   };
//   return (
//     <div className="DentistHome">
//       <header>
//         <div className="name-title">
//           <img src={Logo} alt="" />
//         </div>
//         <nav>
//           <ul class="nav flex-column">
//             <li class="nav-item"><a class="nav-link" href="/DentistHome"><span>Appointment</span></a></li>
//             <li class="nav-item"><a class="nav-link">Patients</a></li>
//             <li class="nav-item"><a class="nav-link" href="/DentistViewDentist">Dentist</a></li>
//             <li class="nav-item"><a class="nav-link" href="/DentistViewStaff">Staff</a></li>
//             <li class="nav-item"><a class="nav-link"href="/DentistViewMedicine">Medicine</a></li>
//             <li class="nav-item"><a class="nav-link" href="/">Log out</a></li>
//           </ul>
//         </nav>
//       </header>
//       <main>
//         <div className="Filter">
//           <div class="dropdown">
//             <button class="dropbtn">Filter</button>
//             <div class="dropdown-content">
//               <a href="#">Patient</a>
//               <a href="#">Dentist</a>
//               <a href="#">Room</a>
//             </div>
//           </div>
//         </div>
//        <div class="table-heading">
//            <div class="table-data">AID</div>
//            <div class="table-data">Date</div>
//            <div class="table-data">Time</div> 
//            <div class="table-data">RoomID</div>
//         </div>
//         {data.map((item) =>(
//           <div key={item.AID} className="table-row">
//             <div className="table-data"><a href={`/getAppoinmentDetail/${item.AID}`}>{item.AID}</a></div>
//             <div className="table-data">{item.Date}</div>
//             <div className="table-data">{item.Time}</div>
//             <div className="table-data">{item.RoomID}</div>
//           </div>
//         ))};
        
       
        
        
//       </main>
//     </div>
//   );
// }
// export default DentistHome;






// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Logo from '../image/Logo.png';
// import '../Css/Dentist Css/DentistViewMedicine.css';

// const DentistViewMedicine = ()=> {
//   const [data, setData] = useState([]);
//   useEffect(() => {
//     loadData();
//   }, []);  
//   const loadData = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/get-medicine");
//       setData(response.data);
//       console.log(response.data); // In dữ liệu lấy từ API ra console
//     } catch (error) {
//       console.error(error); // Xử lý lỗi nếu có
//     }
//   };
//   return (
//     <div className="DentistViewMedicine">
//       <header>
//         <div className="name-title">
//           <img src={Logo} alt="" />
//         </div>
//         <nav>
//           <ul class="nav flex-column">
//             <li class="nav-item"><a class="nav-link" href="/DentistHome">Appointment</a></li>
//             <li class="nav-item"><a class="nav-link">Patients</a></li>
//             <li class="nav-item"><a class="nav-link" href="/DentistViewDentist">Dentist</a></li>
//             <li class="nav-item"><a class="nav-link" href="/DentistViewStaff">Staff</a></li>
//             <li class="nav-item"><a class="nav-link" href="/DentistViewMedicine"><span>Medicine</span></a></li>
//             <li class="nav-item"><a class="nav-link" href="/">Log out</a></li>
//           </ul>
//         </nav>
//       </header>
//       <main>
//        <div class="table-heading">
//            <div class="table-data">Medicine</div>
//            <div class="table-data">Price</div>
//            <div class="table-data">Type of Medicine</div> 
//         </div>
//         {data.map((item) =>(
//           <div key={item.Medicine} className="table-row">
//             <div className="table-data">{item.Medicine}</div>
//             <div className="table-data">{item.Price}</div>
//             <div className="table-data">{item.TypeOfMedicine}</div>
//           </div>
//         ))};  
//       </main>
//     </div>
//   );
// }
// export default DentistViewMedicine;
