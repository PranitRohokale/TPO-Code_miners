import React, { useState, useEffect } from "react";
import Sidebar from "../../../Components/hrSidebar/Sidebar";
import styles from "./Profile.module.css";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../Utils/supabase.config";
import { useQuery } from '@apollo/client';
import { GET_RECRUITER_INFO } from '../../../Graphql/Queries/recruiter';

const HRProfileScreen = () => {
  const navigate = useNavigate();
  const [jobId, setJobId] = useState("");

  useEffect(() => {
    const role = "";
    supabase.auth.getSession().then((res) => {
      if (res?.data?.session?.user) {
        // console.log(" HR ", res?.data?.session?.user.id);
        setJobId(res?.data?.session?.user?.id)
      }
      else navigate("/login");
      const role = res?.data?.session?.user?.user_metadata?.role?.toLowerCase();
      console.log(role);
      if (role && role != "hr") navigate(`/${role}`);
    });
  }, []);

  const { loading, error, data } = useQuery(GET_RECRUITER_INFO, {
    variables: { "_eq": jobId }
});

  const [user, setUser] = useState({
    name: "",
    email: "",
    mobileno: "",
    company: "",
  });

  const { loading: rloading, error: rerror, data: rdata } = useQuery(GET_RECRUITER_INFO, {
    variables: { "_eq": jobId }
  });

  console.log(rdata?.Recruiters,"data")

  return (
    <div className={styles.hospitals_wrapper}>
      <Sidebar value="Profile" />
      <div className={styles.main_wrapper}>
        <div className={styles.navBar}>
          <h3 className={styles.user}>Welcome {}!</h3>
        </div>
        <div className={styles.inforWrapper}>
          <div className={styles.hospitals_search}>
            <button className={styles.searchButton} disabled>
              Profile Information
            </button>
          </div>
          <div className={styles.profileContainer}>
            {Object.keys(user).map((key, index) => (
              <div key={index}>
                <div className={styles.profileRow}>
                  <h4 className={styles.title}>{key.toLocaleUpperCase()} :</h4>
                  <p className={styles.text}>{user[key]}</p>
                </div>
                <hr className={styles.horizontal} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRProfileScreen;
