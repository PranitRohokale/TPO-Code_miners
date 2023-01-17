import * as React from "react";
import {
    Container,
    Snackbar,
    Typography,
    Alert,
    Grid,
    Card,
    CardActions,
    CardContent,
    Button,
    Dialog,
    useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import DashboardCard from "../../../Components/dashboard/DashboardCard";
import DashboardTable from "../../../Components/dashboard/DashboardTable";
import DashboardHeading from "../../../Components/dashboard/DashboardHeading";
import ASidebar from "../../../Components/adminSidebar/ASidebar";

function createData(
    name,
    ctc,
    students
  ) {
    return { name, ctc, students };
  }

var dashboardData= {
    "overview":[
        {"desc":"Total companies",
            "value":300,
            "color_val": "#8cf0f5"},
        {"desc":"Total students registered",
            "value": 4000,
            "color_val": "#5fd986"}
    ],
    "students":{
        "placements":[
            {"desc":"Students registered",
                "value": 2000,
                "color_val": "#9d83f2"},
            {"desc":"Students placed",
                "value": 1800,
                "color_val": "#f5a262"},
            {"desc":"Highest CTC",
                "value": "50 LPA",
                "color_val": "#e0f57a"}
        ],
        "internships":[
            {"desc":"Students registered",
                "value":2000,
                "color_val": "#5f65d4"},
            {"desc":"Students placed",
                "value": 1900,
                "color_val": "#96d4a3"},
            {"desc":"Highest stipend (per month)",
                "value": "3 Lac",
                "color_val": "#f7adea"}
        ]
    },
    "top10Companies": [
        createData('DE Shaw', 62, 1),
        createData('Wells Fargo', 24, 15),
        createData('Deutche Bank', 19, 11),
      ]
}

const AdminDashboard = () => {

    return (
        // <div>
        <div style={{display:"flex"}}>
        <ASidebar value="Dashboard"/>

   <Container maxWidth='lg' sx={{ my: 5 }}>
            <Typography
            sx={{
                fontSize: 40,
                textAlign: "center",
                fontWeight: 500,
            }}
            gutterBottom
            >
            Admin Dashboard
            </Typography>

            <DashboardHeading text='Overview:'/>

            <Grid container spacing={0} align='center'>
                {dashboardData.overview.map((row)=>(
                    <DashboardCard desc={row.desc} value={row.value} color_val={row.color_val} />))}
            </Grid>
            <DashboardHeading text='Placements:'/>
            
            <Grid container spacing={0} align='center'>
                {dashboardData.students.placements.map((row)=>(
                    <DashboardCard desc={row.desc} value={row.value} color_val={row.color_val} />))}
            </Grid>

            <DashboardHeading text='Internships:'/>
            <Grid container spacing={0} align='center'>
                {dashboardData.students.internships.map((row)=>(
                    <DashboardCard desc={row.desc} value={row.value} color_val={row.color_val} />))}
            </Grid>
            <DashboardHeading text='Top 10 Recruiters:'/>
            <DashboardTable rows={dashboardData.top10Companies}/>
        </Container>
        </div>
     
        // <div/>

    );
};

export default AdminDashboard;
