import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Sidebar from './Components/hrSidebar/Sidebar';
import Home from './Screens/Home/Home';
import RegisterHR from './Screens/HR/RegisterHr/RegisterHR';
import RegisterAdmin from './Screens/Admin/RegisterAdmin/RegisterAdmin';
import CreateJob from './Screens/HR/CreateJob/CreateJob';
import TpoPolicy from './Screens/Admin/TpoPolicy/TpoPolicy';
import ProfileScreen from './Screens/Admin/Profile/Profile';
import HRProfileScreen from './Screens/HR/Profile/Profile';
import Login from './Screens/Login/Login';
import Logout from './Screens/Logout';
import AdminDashboard from './Screens/Admin/Dashboard/Dashboard';
import ViewStudents from './Screens/Admin/ViewStudents/ViewStudents';
import PastJobs from './Screens/HR/PastJobs/PastJobs';
import Job from './Screens/HR/Job';
import ApplicantList from './Screens/HR/ApplicantList';
import RoundDetails from './Screens/HR/RoundDetail';
import Schedule from './Screens/Admin/Schedule';
import CreateRound from './Screens/HR/CreateRound';
import Error from './Screens/Error';
import MainHome from './Screens/Home/MainHome';

function App() {
	return (
		<div >
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<MainHome />} />
					<Route path='/login' element={<Login />} />
				</Routes>
				{/* hr routes goes here */}
				<Routes>
					<Route path='/hr'>
						<Route index element={<HRProfileScreen />} />
						<Route path='register' element={<RegisterHR />} />
						<Route path='createjob' element={<CreateJob />} />
						<Route path='profile' element={<HRProfileScreen />} />
						{/* <Route path='results' element={< />} /> */}

						<Route path='createdjobs'  >
							<Route index element={<PastJobs />} />
							<Route path=':jobId' element={<Job />} >
								<Route path='applicantList' element={<ApplicantList />} />
								<Route path=':roundId' element={<RoundDetails />} />
								<Route path='createRound' element={<CreateRound />} />
							</Route>
						</Route>
						<Route path='*' element={<Error/>} />
					</Route>
				</Routes>
				{/* admin routes goes here  */}
				<Routes>
					<Route path='/admin'>
						<Route index element={<AdminDashboard />} />
						<Route path='register' element={<RegisterAdmin />} />
						<Route path='tpopolicy' element={<TpoPolicy />} />
						<Route path='profile' element={<ProfileScreen />} />
						<Route path='schedule' element={<Schedule />} />
						<Route path='studentlist' element={<ViewStudents />} />
						<Route path='*' element={<Error/>} />
					</Route>
				</Routes>
				<Routes>
					<Route path='/logout' element={<Logout />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
