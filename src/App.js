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

function App() {

	return (
		<div >
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
				</Routes>
				{/* hr routes goes here */}
				<Routes>
					<Route path='/hr'>
						<Route index element={<p>hrr</p>} />
						<Route path='register' element={<RegisterHR />} />
						<Route path='createjob' element={<CreateJob />} />
						<Route path='profile' element={<HRProfileScreen />} />
						<Route path='*' element={<h1>404 page!</h1>} />
					</Route>
				</Routes>
				{/* admin routes goes here  */}
				<Routes>
					<Route path='/admin'>
						<Route index element={<p>admin</p>} />
						<Route path='register' element={<RegisterAdmin />} />
						<Route path='tpopolicy' element={<TpoPolicy />} />
						<Route path='profile' element={<ProfileScreen />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
