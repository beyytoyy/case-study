import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SidebarLayout from './components/SidebarLayout';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import GeoJsonMap  from './pages/GeoJsonMap';
import My3DChart  from './pages/My3DChart';
import Login from './pages/Login'; // A page without the sidebar

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Pages with Sidebar */}
                <Route path="/" element={<SidebarLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="reports" element={<Reports />} />
                    <Route path="map" element={<GeoJsonMap />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="charts" element={<My3DChart />} />
                </Route>

                {/* Pages without Sidebar */}
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
};

export default App;
