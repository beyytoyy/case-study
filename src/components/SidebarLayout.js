import React from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Avatar } from 'primereact/avatar';
import { Ripple } from 'primereact/ripple';
import { NavLink, Outlet } from 'react-router-dom';

const SidebarLayout = () => {
    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="surface-section h-screen flex-shrink-0 border-right-1 surface-border" style={{ width: '280px' }}>
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
                                    <Ripple />
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
                                    <Ripple />
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/settings"
                                    className={({ isActive }) =>
                                        `p-ripple flex align-items-center p-3 border-round text-700 hover:bg-primary hover:text-white transition-colors ${
                                            isActive ? 'bg-primary text-white' : ''
                                        }`
                                    }
                                >
                                    <i className="pi pi-users mr-2"></i>
                                    <span className="font-medium">Settings</span>
                                    <Ripple />
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="p-3 mt-auto">
                        <Avatar
                            image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
                            shape="circle"
                            className="mr-2"
                        />
                        <span className="font-medium">Amy Elsner</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow p-4">
                <Outlet />
            </div>
        </div>
    );
};

export default SidebarLayout;
