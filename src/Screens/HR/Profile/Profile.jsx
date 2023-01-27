import React, { useState, useEffect } from "react";
import Sidebar from "../../../Components/hrSidebar/Sidebar";
import styles from "./Profile.module.css";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../Utils/supabase.config";
import { useQuery } from "@apollo/client";
import { GET_RECRUITER_INFO } from "../../../Graphql/Queries/recruiter";

const HRProfileScreen = () => {
  const navigate = useNavigate();
  const [jobId, setJobId] = useState("");

  useEffect(() => {
    const role = "";
    supabase.auth.getSession().then((res) => {
      if (res?.data?.session?.user) {
        setJobId(res?.data?.session?.user?.id);
      } else navigate("/login");
      let role = res?.data?.session?.user?.user_metadata?.role?.toLowerCase();
      console.log(role);
      if (role && role != "hr") navigate(`/${role}`);
    });
  }, []);

  const {
    loading: rloading,
    error: rerror,
    data: recruterData,
  } = useQuery(GET_RECRUITER_INFO, {
    variables: { _eq: jobId },
  });

  // console.log(recruterData?.Recruiters[0], "data")
  if (rloading)
    return (
      <div className="flex justify-center items-center">
        <div
          className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
          role="status"
        >
          .
        </div>
      </div>
    );

  return (
    <div className={styles.hospitals_wrapper}>
      <Sidebar value="Profile" />
      <div className={styles.main_wrapper}>
        <div className={styles.navBar}>
          <h3 className={styles.user}>
            Welcome {recruterData?.Recruiters[0]?.name}!
          </h3>
        </div>
        <div className={styles.inforWrapper}>
          <div className={styles.hospitals_search}>
            <button className={styles.searchButton} disabled>
              Profile Information
            </button>
          </div>
          <div className={styles.profileContainer}>
            <div>
              <div className={styles.profileRow}>
                <p className={styles.text}>
                  <span className={styles.title}>NAME :</span>{" "}
                  {recruterData?.Recruiters[0]?.name}{" "}
                </p>
              </div>
              <hr className={styles.horizontal} />
            </div>
            <div>
              <div className={styles.profileRow}>
                <p className={styles.text}>
                  <span className={styles.title}>EMAIL :</span>{" "}
                  {recruterData?.Recruiters[0]?.email}{" "}
                </p>
              </div>
              <hr className={styles.horizontal} />
            </div>
            <div>
              <div className={styles.profileRow}>
                <p className={styles.text}>
                  <span className={styles.title}>MOBILE :</span>{" "}
                  {recruterData?.Recruiters[0]?.mobileNo}{" "}
                </p>
              </div>
              <hr className={styles.horizontal} />
            </div>
            <div>
              <div className={styles.profileRow}>
                <p className={styles.text}>
                  <span className={styles.title}>COMPANY :</span>{" "}
                  {recruterData?.Recruiters[0]?.companyName}{" "}
                </p>
              </div>
              <hr className={styles.horizontal} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRProfileScreen;
