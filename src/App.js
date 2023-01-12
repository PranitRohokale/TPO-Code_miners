import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Sidebar from './Components/hrSidebar/Sidebar';
import Home from './Screens/Home/Home';
import RegisterHR from './Screens/HR/RegisterHr/RegisterHR';
import RegisterAdmin from './Screens/Admin/RegisterAdmin/RegisterAdmin';
import CreateJob from './Screens/HR/CreateJob/CreateJob';

function App() {
  const router = createBrowserRouter([
		{
			path: "/",
			element: <Home />,
		},
		{
			path: "/hr/register",
			element: <RegisterHR/>,
		},
		{
			path: "/admin/register",
			element: <RegisterAdmin/> ,
		},
		{
			path: "/hr/createjob",
			element: <CreateJob/>,
		},
	]);

  return (
    <div >
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
