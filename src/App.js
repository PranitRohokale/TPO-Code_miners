import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Sidebar from './Components/hrSidebar/Sidebar';
import Home from './Screens/Home/Home';

function App() {
  const router = createBrowserRouter([
		{
			path: "/",
			element: <Home />,
		},
		// {
		// 	path: "/hr/createjob",
		// 	element: <createJob/>,
		// },
	]);

  return (
    <div >
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
