import React from 'react'
import Sidebar from '../../../Components/hrSidebar/Sidebar'
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../Utils/supabase.config";
import { useEffect, useState } from "react";
import { useQuery } from '@apollo/client';
import { GET_JOB_CREATED_BY_RECRUTER_QUERY, GET_RECRUITER_INFO } from '../../../Graphql/Queries/recruiter';

const jobs = [
    {
        id: 1,
        title: "SDE Intern",
        desc: "lorem epsum lorem epsum lorem epsum lorem epsum lorem epsum lorem epsum",
    },
    {
        id: 2,
        title: "sde",
        desc: "lorem epsum lorem epsum lorem epsum lorem epsum lorem epsum lorem epsum",
    },
    {
        id: 3,
        title: "sde",
        desc: "lorem epsum lorem epsum lorem epsum lorem epsum lorem epsum lorem epsum",
    },

]

const PastJobs = () => {
    const navigate = useNavigate();
    const [jobId, setJobId] = useState("");
    const { jobsLoading, error, data } = useQuery(GET_JOB_CREATED_BY_RECRUTER_QUERY, {
        variables: { "_eq": jobId }
    });

    useEffect(() => {
        const role = "";
        supabase.auth.getSession().then((res) => {
            if (res?.data?.session?.user) {
                setJobId(res?.data?.session?.user?.id)
            }
            else navigate("/login");
            console.log(jobId, "id")

            const role = res?.data?.session?.user?.user_metadata?.role?.toLowerCase();
            console.log(role);
            if (role && role != "hr") navigate(`/${role}`);
        });


    }, [jobId]);

    return (
        <div>
            <div style={{ display: "flex" }}>
                <Sidebar />
                <div>
                    <div style={{fontSize: "22px",textAlign: "center",padding: "10px",fontWeight: "500"}}>
                    <p>Past Created Job</p>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                        {
                            data?.Job_Details.length==0 ? <p>No Previous jobs exits...</p> : ""
                        }

                        {data?.Job_Details.map((job, index) => (
                            <div style={{ borderRadius: "3px", backgroundColor: "#f4dc7a", width: "300px", height: "270px", padding: "20px", margin: "20px" }} key={index}>
                                <div>
                                    <p style={{ fontSize: "17px", color: "white" }}><strong>Title : {job.title}</strong></p>
                                    <div>
                                        <p style={{ fontSize: "15px", color: "white", marginTop: "10px" }}>Description: {job.description}</p>
                                    </div>

                                    <div>
                                        <p style={{ fontSize: "15px", color: "white", marginTop: "10px" }}>Salary :{job.salary}</p>
                                    </div>

                                    <button style={{ backgroundColor: "#d1b113", width: "180px", padding: "10px", margin: "20px", borderRadius: "20px",margin:" 30px 30px " }}

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
        </div>
    )

}

export default PastJobs