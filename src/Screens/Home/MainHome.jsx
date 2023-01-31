import { Box } from "@mui/material";
import Header from "./Header";
import styles from "./MainHome.module.css";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from '@mui/icons-material/Group';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const AdminD = [
	"● Create company schedule",
	"● Invite Companies",
	"● Manage CRs ",
];
const studentD = [
	"● Apply for eligible jobs",
	"● View daily placement updates ",
	"● Generate Resumes",
];
const RecruiterD = ["● Create new Job Postings", "● Access created jobs","● Post selection roundwise"];

const MainHome = () => {
	const Footer = () => {
		return (
			<>
				<Box
					component="footer"
					sx={{
						py: 3,
						px: 2,
						mt: "auto",
						display: "flex",
						flexDirection: "column",
						backgroundColor: (theme) =>
							theme.palette.mode === "light"
								? theme.palette.grey[200]
								: theme.palette.grey[800],
					}}
				>
					<div style={{textAlign: "center"}}>
						TPO VJTI 2023 &#169; - All Rights Reserved.
					</div>
				</Box>
			</>
		);
	};

	const CustomButton = ({ text, color = "#753bd9" }) => {
		return (
			<button
				className={styles.btn}
				style={{ backgroundColor: `${color}` }}
			>
				{text}
			</button>
		);
	};

	const FeatureCard = ({ name, text, icon, url = "#" }) => {
		return (
			<div className={`${styles.feature_card}`}>
				<div className={styles.icon}>{icon}</div>
				<h3>{name}</h3>
				{text.map(function (name, index) {
					return <p key={index}>{name}</p>;
				})}
				<a href={url}>see more..</a>
			</div>
		);
	};

	return (
		<>
			<Header />

			<section className={`${styles.container} ${styles.hero}`}>
				<h1>Digitalizing Recruitment</h1>
				<p>
					<strong style={{ color: "#753bd9", fontSize: "20px" }}>
           Our Recruitment portal
					</strong>{" "}
					is designed to keep track of all the records of the students, companies , TPO and provide them a smart platform to interact with each other. 
Our goal is to reduce the reliance on manual processes, streamline the processes of the Recruitment to minimize the amount of time and effort required .
				</p>
				<CustomButton text="get started now" />
			</section>

			<section className={styles.features}>
				<div className={`${styles.container}`}>
					<button
						style={{
							backgroundColor: "#753bd9",
							color: "white",
							padding: "7px 15px",
						}}
					>
						Key Features
					</button>
					<h3>Our three roles!</h3>
					{/* <p>
						Our application provides a central repository of data
						comprising all the tests and other medical processes a
						patient went through, it reduces the scope of
						duplication of the same processes and thus prevents
						delay in the treatment. This data of patients can be
						used by hospitals to provide blood and other medical
						services to needy patients. patients have the power to
						provide their data to research organization so that they
						can research and develop solutions to medical problems.
					</p> */}
					<div className={`${styles.row} ${styles.features__flex}`}>
						<FeatureCard
							icon={
								<PersonAddIcon
									sx={{ color: "#753bd9", fontSize: "80px" }}
								/>
							}
							name="Admin"
							text={AdminD}
							url="/"
						/>
						<FeatureCard
							icon={
								<PersonIcon
									sx={{ color: "#753bd9", fontSize: "80px" }}
								/>
							}
							name="Recruiter"
							text={RecruiterD}
							url="/"
						/>
						<FeatureCard
							icon={
								<GroupIcon
									sx={{ color: "#753bd9", fontSize: "80px" }}
								/>
							}
							name="Student"
							text={studentD}
							url="/"
						/>
					</div>
				</div>
			</section>

			<Footer />
		</>
	);
};

export default MainHome;