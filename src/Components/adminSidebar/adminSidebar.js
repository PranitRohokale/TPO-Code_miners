import DashboardIcon from "@mui/icons-material/Dashboard";
import BiotechIcon from "@mui/icons-material/Biotech";
import PolicyIcon from '@mui/icons-material/Policy';
import EventNoteIcon from '@mui/icons-material/EventNote';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import LogoutIcon from '@mui/icons-material/Logout';
import styles from "./Sidebar.module.css";

export const adminSidebar = [
	{
		name: "Dashboard",
		url: "/admin",
		icon: <DashboardIcon className={styles.listIcon} />,
	},
	{
		name: "Tpo Policy",
		url: "/admin/tpopolicy",
		icon: <PolicyIcon className={styles.listIcon} />,

	},
	{
		name: "Student list",
		url: "/admin/studentlist",
		icon: <FormatListBulletedIcon className={styles.listIcon} />,
	},
	{
		name: "Schedule",
		url: "/admin/schedule",
		icon: <EventNoteIcon className={styles.listIcon} />,
	},
	{
		name: "Send Invitations",
		url: "/admin/sendinvite",
		icon: <ForwardToInboxIcon className={styles.listIcon} />,
	},
	{
		name: "Logout",
		url: "/logout",
		icon: <LogoutIcon className={styles.listIcon} />,
	},
	// {
	// 	name: "Profile",
	// 	url: "/admin/profile",
	// 	// icon: <Person2Icon className={styles.listIcon} />,
	// },
	// {
	// 	name: "Generate analytics",
	// 	url: "/admin/applicants",
	// 	// icon: <HistoryEduIcon className={styles.listIcon} />,
	// },
	// {
	// 	name: "Block Students",
	// 	url: "/admin/blockstudents",
	// 	// icon: <Person2Icon className={styles.listIcon} />,
	// },


];
