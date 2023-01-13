import React from 'react'
import Sidebar from '../../../Components/hrSidebar/Sidebar'
import { useNavigate } from "react-router-dom";

const jobs = [
    {
        id:1,
        title: "SDE Intern",
        desc: "lorem epsum lorem epsum lorem epsum lorem epsum lorem epsum lorem epsum",
    },
    {
        id:2,
        title: "sde",
        desc: "lorem epsum lorem epsum lorem epsum lorem epsum lorem epsum lorem epsum",
    },
    {
        id:3,
        title: "sde",
        desc: "lorem epsum lorem epsum lorem epsum lorem epsum lorem epsum lorem epsum",
    },
   
]

const PastJobs = () => {
const navigate = useNavigate();

    return (
        <div>
            <div style={{ display: "flex"}}>
                <Sidebar />
                <div style={{display: "flex", width: "70" ,flexWrap: "wrap"}}>
                    {jobs.map((job, index) => (
                        <div style={{borderRadius:"3px",backgroundColor: "#edd185", width: "300px",height:"220px",padding:"20px",margin:"20px"}} key={index}>
                            <div>
                                <p style={{fontSize: "17px",color: "white"}}><strong>{job.title}</strong></p>
                                <div>
                                    <p style={{fontSize: "15px",color: "white",marginTop: "10px"}}>{job.desc}</p>
                                </div>

                                <button style={{backgroundColor: "#f2c341", width: "180px",padding:"10px",margin:"20px",borderRadius: "20px"}}
                                    
                                    rel={"noopener noreferrer"}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        navigate(
                                            `/hr/createdjobs/${job.id}`
                                        );
                                    }}>
                                    View Jobs
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      )

}

export default PastJobs