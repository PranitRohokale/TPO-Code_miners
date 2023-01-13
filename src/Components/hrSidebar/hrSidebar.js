// import DashboardIcon from "@mui/icons-material/Dashboard";
// import Person2Icon from "@mui/icons-material/Person2";
// import BiotechIcon from "@mui/icons-material/Biotech";
// import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
// import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

import styles from "./Sidebar.module.css";
export const hrSidebar = [
	{
		name: "Create Job",
		url: "/hr/createjob",
		// icon: <LocalHospitalIcon className={styles.listIcon} />,
	},
	{
		name: "Applicant list",
		url: "/hr/applicants",
		// icon: <HistoryEduIcon className={styles.listIcon} />,
	},
	{
		name: "Rollout results",
		url: "/hr/results",
		// icon: <BiotechIcon className={styles.listIcon} />,
	},
	{
		name: "Jobs Created",
		url: "/hr/createdjobs",
		// icon: <Person2Icon className={styles.listIcon} />,
	},
	{
		name: "Profile",
		url: "/hr/profile",
		// icon: <Person2Icon className={styles.listIcon} />,
	},
];
