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
            <div className="block rounded-lg shadow-lg bg-white max-w-sm text-center bg-yellow-200">
                <div className="p-6">
                    <h5 className="text-gray-900 text-xl font-medium mb-2">{companyName} : {title}</h5>
                    <p className="text-gray-700 text-base mb-4">
                    Description: {desc}
                    </p>

                    <p className="text-gray-700 text-base mb-4">
                    Salary :  {salary}
                    </p>
                    <button type="button" className="bg-yellow-500 inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-yellow-400 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
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


