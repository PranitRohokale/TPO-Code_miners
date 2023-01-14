import React from 'react'
import { Link } from 'react-router-dom'
import logo from './error404.jpg'
const Error = () => {
    return (
        <div>
            <div style={{ padding: "30px 470px", textAlign: "center", width: "1490px" }}>
                <img src={logo} width={500} height={500} />
            </div>

            <Link style={{ textDecoration: "none" }} to={"/"}>
                <button type="submit"
                    className="w-1/4 flex justify-center py-2 px-4 mx-auto my-8 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Home
                </button>
            </Link>
        </div>

    )
}

export default Error