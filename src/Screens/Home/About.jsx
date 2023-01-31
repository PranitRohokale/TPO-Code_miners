import React from 'react'
import Header from './Header';
import styles from "./MainHome.module.css";
import { Box } from "@mui/material";

const FeatureCard = ({ name, text, icon, role }) => {
    return (
        <div className={`${styles.feature_card}`} style={{marginBottom: "60px",}}>
            <img className={styles.icon} src={icon} alt="Logo" />
            <h3>{name}</h3>
            <h4>{role}</h4>
            <p>{text}</p>
        </div>
    );
};

const Footer = () => {
    return (
        <>
            <Box
                component="footer"
                sx={{
                    py: 3,
                    px: 2,
                    mt: "auto",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: (theme) =>
                        theme.palette.mode === "light"
                            ? theme.palette.grey[200]
                            : theme.palette.grey[800],
                }}
            >
                <div style={{textAlign: "center"}}>
                    TPO VJTI 2023 &#169; - All Rights Reserved.
                </div>
            </Box>
        </>
    );
};

const About = () => {
    return (
        <div>
            <Header />

            <section className={`${styles.container} ${styles.hero}`}>
                <h1>Team Code_Miners</h1>
                <p>
                    <strong style={{ color: "#753bd9", fontSize: "20px" }}>
                        This Recruitment portal
                    </strong>{" "}
                    is our project in the Digital Campus Hackathon (DCH) on the occasion of the centenary year at VJTI 2023.We are the winners of the Digital Campus hackathon under the Administrative track.
                </p>
            </section>
            <section className={styles.features}>
                <div className={`${styles.container}`}>
                    <div style={{display:"flex", justifyContent:"center"}}>
                    <button
                        style={{
                            backgroundColor: "#753bd9",
                            color: "white",
                            padding: "10px 25px",
                            borderRadius: "8px",
                            fontSize: "18px",
                            fontWeight: "500"
                        }}
                    >
                        Our Team
                    </button>
                    </div>

                    <div className={`${styles.row} ${styles.features__flex}`} style={{padding: "20px"}}>

                        <FeatureCard
                            role="App Developer"
                            name="Dhruvi Doshi"
                            text="Final Year Computer Engineering Student."
                            icon="https://www.w3schools.com/w3images/team1.jpg"
                        />
                        <div style={{width:"20px"}}></div>
                        <FeatureCard
                            role="Web Developer"
                            name="Sahil Kedare"
                            text="Final Year Computer Engineering Student."
                            icon="/sahil.jpg"

                        />
                        <div style={{width:"20px"}}></div>
                        <FeatureCard
                            role="Web Developer"
                            name="Pranit Rohokale"
                            text="Final Year Computer Engineering Student."
                            icon="https://www.w3schools.com/w3images/team2.jpg"

                        />
                        
                        <FeatureCard
                            role="App Developer"
                            name="Anupam Laddha"
                            text="Final Year Computer Engineering Student."
                            icon="/dog.jpg"

                        />
                        <div style={{width:"20px"}}></div>
                        <FeatureCard
                            role="App Developer"
                            name="Kushal Shah"
                            text="Final Year Computer Engineering Student."
                            icon="https://www.w3schools.com/w3images/team2.jpg"

                        />
                        <div style={{width:"20px"}}></div>
                        <FeatureCard
                            role="Web Developer"
                            name="Soumil Kamat"
                            text="Final Year Computer Engineering Student."
                            icon="https://www.w3schools.com/w3images/team2.jpg"

                        />
                    </div>
                </div>
            </section>
<Footer/>
        </div>
    )
}

export default About