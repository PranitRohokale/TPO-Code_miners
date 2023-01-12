import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Sidebar from './Components/hrSidebar/Sidebar';


function App() {
  const router = createBrowserRouter([
		{
			path: "/",
			element: <Sidebar />,
		},
		
	]);

  return (
    <div >
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
