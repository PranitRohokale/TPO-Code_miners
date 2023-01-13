// import DashboardIcon from "@mui/icons-material/Dashboard";
// import Person2Icon from "@mui/icons-material/Person2";
// import BiotechIcon from "@mui/icons-material/Biotech";
// import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
// import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

import styles from "./Sidebar.module.css";
export const adminSidebar = [
	{
		name: "Tpo Policy",
		url: "/admin/tpopolicy",
		// icon: <BiotechIcon className={styles.listIcon} />,
	},
	{
		name: "Student list",
		url: "/admin/studentlist",
		// icon: <Person2Icon className={styles.listIcon} />,
	},
	{
		name: "Profile",
		url: "/admin/profile",
		// icon: <Person2Icon className={styles.listIcon} />,
	},
	{
		name: "Send Invitations",
		url: "/admin/sendinvite",
		// icon: <LocalHospitalIcon className={styles.listIcon} />,
	},
	{
		name: "Generate analytics",
		url: "/admin/applicants",
		// icon: <HistoryEduIcon className={styles.listIcon} />,
	},
	{
		name: "Block Students",
		url: "/admin/blockstudents",
		// icon: <Person2Icon className={styles.listIcon} />,
	},
	
];
