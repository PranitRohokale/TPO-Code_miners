import React from "react";
import { Link } from "react-router-dom";
import { adminSidebar } from "./adminSidebar";
import styles from "./Sidebar.module.css";

const ASidebar = ({ value }) => {
	return (
		<div className={styles.sidebar_wrapper}>
			<Link to="/">
			<div className={styles.logoDiv} style={{width:"5em", height:'3em' , margin:'auto ', marginBottom:"3em"}}>
					<img src="https://img.collegepravesh.com/2016/01/VJTI-Mumbai-Logo.png"  alt="" />
				</div>	
			</Link>
			<hr className="bg-gray-200 border-0" />
			<div>
				<ul className={styles.sidebarList}>
					{adminSidebar.map((item, index) => {
						return (
							<li key={item.name}>
								<div
									className={`${item.name === value ? styles.active : ""
										}`}
								>
									{item.icon}
									<Link style={{ textDecoration: "none" }} to={item.url}>{item.name}</Link>
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export default ASidebar;
