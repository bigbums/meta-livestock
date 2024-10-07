import Sidebar from "../Components/Sidebar";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
// import {n } from "react-router-dom";

export default function Home() {
    const [livestock, setLivestock] = useState([]);
    
    const location = useLocation();
    const success = location.state?.success; 
    

    // Fetch livestock data from the backend
    async function getLivestock() {
        const res = await fetch("/api/livestocks/list"); // Assuming you have this route set up in Laravel
        const data = await res.json();

        if (res.ok) {
            setLivestock(data);
        }
    }

    useEffect(() => {
        getLivestock();
    }, []);

    //console.log(livestock);
    return (
        <>
            <h1 className="title">Livestock Records</h1>

            <div className="flex">
        {/* Sidebar Component */}
        <Sidebar />
            

             {/* Main Content */}
             <div className="w-3/4 p-4">
            

            {success && (
                <div className="success-message bg-green-500 text-white p-2 mb-4">
                    {success}
                </div>
            )}
               <Link to="/createlivestock" className="nav-link c-white bg-black" style={{ color: 'white' }}>
                New Livestock
                </Link>
            {livestock.length > 0 ? (
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">Tag ID</th>
                            <th className="px-4 py-2 border">Type</th>
                            <th className="px-4 py-2 border">Species</th>
                            <th className="px-4 py-2 border">Breed</th>
                            <th className="px-4 py-2 border">Date of Birth</th>
                            <th className="px-4 py-2 border">Gender</th>
                            <th className="px-4 py-2 border">Health Status</th>
                            <th className="px-4 py-2 border">Herd ID</th>
                            <th className="px-4 py-2 border">Owner Name</th>
                            <th className="px-4 py-2 border">Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {livestock.map((livestock) => (
                            <tr key={livestock.id}>
                                <td className="px-4 py-2 border">{livestock.tag_id}</td>
                                <td className="px-4 py-2 border">{livestock.type}</td>
                                <td className="px-4 py-2 border">{livestock.species || 'N/A'}</td>
                                <td className="px-4 py-2 border">{livestock.breed || 'N/A'}</td>
                                <td className="px-4 py-2 border">{new Date(livestock.date_of_birth).toLocaleDateString()}</td>
                                <td className="px-4 py-2 border">{livestock.gender}</td>
                                <td className="px-4 py-2 border">{livestock.health_status || 'Unknown'}</td>
                                <td className="px-4 py-2 border">{livestock.herd_id}</td>
                                <td className="px-4 py-2 border">{livestock.owner.firstname}</td>
                                {/* <td className="px-4 py-2 border">{livestock.location.name || 'No Location'}</td> */}

                                <td className="px-4 py-2 border">
                                    <Link
                                        to={`/api/livestocks/detail/${livestock.id}`}
                                        className="bg-blue-500 text-white text-sm rounded-lg px-3 py-1"
                                    >
                                        Read more ...
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>There are no livestock records available.</p>
            )}
             </div>
             </div>
        </>
       
    );
}
