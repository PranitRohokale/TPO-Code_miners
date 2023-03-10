import React from 'react'
import { useNavigate } from "react-router-dom";

const Schedule = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div className="App">
            <button type="button" style={{backgroundColor: "#EB455F"}} className="m-2 inline-block px-10 py-3 text-white font-medium text-sm leading-tight uppercase rounded shadow-md  hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
                onClick={(e) => {
                    e.preventDefault();
                    navigate(
                        `/admin`
                    );
                }}>
                Home</button>
                <iframe width={1496} height={1000} src="https://sahilkedare.github.io/calendar-ka-app"></iframe>
            </div>
        </div>
    )
}

export default Schedule