import React, { useState, useEffect } from "react";
import ASidebar from "../../../Components/adminSidebar/ASidebar";
// import Sidebar from "../../../components/Sidebar/Sidebar";
import styles from "./Profile.module.css";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../Utils/supabase.config";

const ProfileScreen = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    const role = "";
    supabase.auth.getSession().then((res) => {
      if (res?.data?.session?.user) setUserInfo(res?.data?.session);
      else navigate("/login");
      role = res?.data?.session?.user?.user_metadata?.role?.toLowerCase();
      if (role && role != "admin") navigate(`/${role}`);
    });
  }, []);

  const [user, setUser] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    gender: 0,
    dob: "",
    collegeEmail: "",
  });

  return (
    <div className={styles.hospitals_wrapper}>
      <ASidebar value="Profile" />
      <div className={styles.main_wrapper}>
        <div className={styles.navBar}>
          <h3 className={styles.user}>Welcome Ankit Jaiswal!</h3>
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

export default ProfileScreen;
