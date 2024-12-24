import { Link, Outlet, useNavigate } from "react-router-dom";
import '../App.css';
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import Sidebar from "../Components/Sidebar";  // Assuming you have a Sidebar component

export default function Layout() {
    const { user, token, setUser, setToken, isSidebarOpen, toggleSidebar } = useContext(AppContext);
    const navigate = useNavigate();

    async function handleLogout(e) {
        e.preventDefault();

        const res = await fetch("/api/logout", {
            method: 'post',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await res.json();
        console.log(data);

        if (res.ok) {
            setUser(null);
            setToken(null);
            localStorage.removeItem("token");
            navigate('/');
        }
    }

    return (
        <>
            <header>
                <nav className="flex items-center justify-between">
                    <div className="flex items-center">
                      

                        <Link to="/" className="nav-link ml-4" style={{ color: 'white' }}>
                            Home
                        </Link>
                    </div>

                    <div>
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <p className="text-slate-400 text-xs">
                                    Welcome back, {user.firstname}
                                </p>
                                <form onSubmit={handleLogout}>
                                    <button className="nav-link">Logout</button>
                                </form>
                            </div>
                        ) : (
                            <div className="space-x-4">
                                <Link to="/register" className="nav-link c-white" style={{ color: 'white' }}>
                                    Register
                                </Link>
                                <Link to="/login" className="nav-link" style={{ color: 'white' }}>
                                    Login
                                </Link>
                            </div>
                        )}
                    </div>
                </nav>
            </header>

              {/* Button to toggle the sidebar */}
              <button 
                            className="text-white bg-blue-500 px-4 py-2 rounded" 
                            onClick={toggleSidebar}
                        >
                            {isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
                        </button>

            <div className="flex">
                {/* Sidebar - shown or hidden based on isSidebarOpen */}
                {isSidebarOpen && (
                    <div className="w-1/4">
                        <Sidebar /> {/* Your Sidebar component */}
                    </div>
                )}

                {/* Main content */}
                <div className={isSidebarOpen ? "w-3/4 p-4" : "w-full p-4"}>
                    <Outlet />
                </div>
            </div>
        </>
    );
}
