import React from 'react'
import Sidebar from '../../../Components/hrSidebar/Sidebar'
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../Utils/supabase.config";
import { useEffect, useState } from "react";
import { useQuery } from '@apollo/client';
import { GET_JOB_CREATED_BY_RECRUTER_QUERY, GET_RECRUITER_INFO } from '../../../Graphql/Queries/recruiter';
import styles from "../CreateJob/CreateJob.module.css"


const JobCard = ({companyName,description,salary,id,title}) => {
    const navigate = useNavigate();
    let desc=description.split(/\s+/).slice(0, 10).join(" ");
    return (
        <div key={id} className="flex justify-center m-5 basis-[30%]">
            <div style={{backgroundColor: "#0087ca"}} className="block rounded-lg shadow-lg bg-white max-w-sm text-center">
                <div className="p-6 text-white">
                    <h5 className="text-xl font-medium mb-2">{companyName} : {title}</h5>
                    <p className="text-base font-medium mb-4">
                    Description: <span className='text-slate-200 font-normal text-base'>{desc}</span>
                    </p>

                    <p className="text-base font-medium mb-4">
                    Salary :  <span className='text-slate-200 font-normal text-base'>{salary}</span>
                    </p>
                    <button type="button" className="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
                    style={{backgroundColor: "#22a6c7"}} 
                     onClick={(e) => {
                        e.preventDefault();
                        navigate(
                            `/hr/createdjobs/${id}`
                        );
                    }}>
                        View Job</button>
                </div>
            </div>
        </div>
    )
}



const PastJobs = () => {
    const navigate = useNavigate();
    const [jobId, setJobId] = useState("");
    const [userInfo, setUserInfo] = useState("");
    const { jobsLoading, error, data } = useQuery(GET_JOB_CREATED_BY_RECRUTER_QUERY, {
        variables: { "_eq": jobId }
    });


    useEffect(() => {
        const role = "";
        supabase.auth.getSession().then((res) => {
            if (res?.data?.session?.user) {
                setJobId(res?.data?.session?.user?.id)
                console.log(res?.data?.session?.user?.id,"console")
            }
            else navigate("/login");
            setUserInfo(res?.data?.session?.user?.id);

            const role = res?.data?.session?.user?.user_metadata?.role?.toLowerCase();
            console.log(role);
            if (role && role != "hr") navigate(`/${role}`);
        });


    }, [jobId]);

    return (
        <div className={styles.hospitals_wrapper}>
            <Sidebar value="Jobs Created" />
            <div className={styles.main_wrapper}>
            <div className="text-center text-2xl font-bold mt-4 mb-2">Previous Jobs</div>
                <div style={{ display: "flex", flexWrap: "wrap",flexBasis:"1/3" }}>
                    {
                        data?.Job_Details.length == 0 ? <p>No Previous jobs exits...</p> : ""
                    }
                    {data?.Job_Details.map((job, index) => (
                        <JobCard {...job}/>
                    ))}
                </div>
            </div>

        </div>
    )

}

export default PastJobs


