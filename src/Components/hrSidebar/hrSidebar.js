import Person2Icon from "@mui/icons-material/Person2";
import AddBoxIcon from '@mui/icons-material/AddBox';
import HistoryIcon from '@mui/icons-material/History';
import LogoutIcon from '@mui/icons-material/Logout';
import styles from "./Sidebar.module.css";

export const hrSidebar = [
	{
		name: "Create Job",
		url: "/hr/createjob",
		icon: <AddBoxIcon className={styles.listIcon} />,
	},
	
	{
		name: "Jobs Created",
		url: "/hr/createdjobs",
		icon: <HistoryIcon className={styles.listIcon} />,
	},
	{
		name: "Profile",
		url: "/hr/profile",
		icon: <Person2Icon className={styles.listIcon} />,
	},
	{
		name: "Logout",
		url: "/logout",
		icon: <LogoutIcon className={styles.listIcon} />,
	},
];
