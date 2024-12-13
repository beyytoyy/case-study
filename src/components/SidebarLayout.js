import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

const SidebarLayout = () => {
    const location = useLocation();

    // Map routes to titles
    const pageTitles = {
        '/': 'Dashboard',
        '/reports': 'Reports',
        '/map': 'GeoJSON Map',
        '/chart': 'Charts',
        '/settings': 'Settings',
    };

    const title = pageTitles[location.pathname] || 'Page';

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <div
                className="surface-section h-full flex-shrink-0 border-right-1 surface-border"
                style={{ width: '280px', overflowY: 'auto' }}
            >
                <div className="flex flex-column h-full">
                    <div className="p-4 flex align-items-center justify-content-between">
                        <span className="font-bold text-lg">Your Logo</span>
                    </div>
                    <div className="overflow-y-auto">
                        <ul className="list-none p-3">
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `p-ripple flex align-items-center p-3 border-round text-700 hover:bg-primary hover:text-white transition-colors ${
                                            isActive ? 'bg-primary text-white' : ''
                                        }`
                                    }
                                >
                                    <i className="pi pi-home mr-2"></i>
                                    <span className="font-medium">Dashboard</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/map"
                                    className={({ isActive }) =>
                                        `p-ripple flex align-items-center p-3 border-round text-700 hover:bg-primary hover:text-white transition-colors ${
                                            isActive ? 'bg-primary text-white' : ''
                                        }`
                                    }
                                >
                                    <i className="pi pi-map mr-2"></i>
                                    <span className="font-medium">GeoJSON Map</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/reports"
                                    className={({ isActive }) =>
                                        `p-ripple flex align-items-center p-3 border-round text-700 hover:bg-primary hover:text-white transition-colors ${
                                            isActive ? 'bg-primary text-white' : ''
                                        }`
                                    }
                                >
                                    <i className="pi pi-chart-line mr-2"></i>
                                    <span className="font-medium">Reports</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow flex flex-column">
                {/* Fixed Header */}
                <div
                    className="fixed flex justify-content-between align-items-center px-4 py-2 surface-0 shadow-1 border-bottom-1 surface-border"
                    style={{
                        zIndex: 10,
                        height: '4rem',
                        left: '280px', // Sidebar width
                        right: 0, // Spans the rest of the viewport
                    }}
                >
                    {/* Dynamic Page Title */}
                    <h1 className="text-lg font-bold">{title}</h1>

                    {/* Static Menu Buttons */}
                    <div className="flex gap-3">
                        <button className="p-button p-button-outlined">Settings</button>
                        <button className="p-button p-button-outlined">Logout</button>
                    </div>
                </div>

                {/* Page Content */}
                <div
                    className="p-4"
                    style={{
                        marginTop: '4rem', // Push content below the fixed header
                        overflowY: 'auto', // Allow vertical scrolling
                    }}
                >
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default SidebarLayout;
