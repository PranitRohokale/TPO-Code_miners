import React, { useState, useEffect } from "react";
import ASidebar from "../../../Components/adminSidebar/ASidebar";
import styles from "./Profile.module.css";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../Utils/supabase.config";
import { GET_ADMIN_INFO_QUERY } from "../../../Graphql/Mutations/admin";
import { useQuery } from '@apollo/client';

const ProfileScreen = () => {
  const navigate = useNavigate();
  const [jobId, setJobId] = useState("");


  useEffect(() => {
    supabase.auth.getSession().then((res) => {
      // console.log(res?.data?.session?.user,"resdata");
      setJobId(res?.data?.session?.user?.id)
      // console.log(res?.data?.session?.user?.id)

      const role = res?.data?.session?.user?.user_metadata?.role?.toLowerCase();
    });

  }, []);

   const { loading, error, data } = useQuery(GET_ADMIN_INFO_QUERY, {
    variables: { "id": jobId }
  });


  // console.log(data, "data")
  return (
    <div className={styles.hospitals_wrapper}>
      <ASidebar value="Profile" />
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
            <div>
              <div className={styles.profileRow}>
                <p className={styles.text}><span className={styles.title}>NAME :</span> {} </p>
              </div>
              <hr className={styles.horizontal} />
            </div>
            <div>
              <div className={styles.profileRow}>
                <p className={styles.text}><span className={styles.title}>EMAIL :</span> {} </p>
              </div>
              <hr className={styles.horizontal} />
            </div>
            <div>
              <div className={styles.profileRow}>
                <p className={styles.text}><span className={styles.title}>MOBILE :</span> {} </p>
              </div>
              <hr className={styles.horizontal} />
            </div>
            <div>
              <div className={styles.profileRow}>
                <p className={styles.text}><span className={styles.title}>COMPANY :</span> {} </p>
              </div>
              <hr className={styles.horizontal} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
