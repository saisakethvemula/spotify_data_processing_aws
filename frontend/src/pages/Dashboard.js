import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Home from "../components/Home";

const Dashboard = () => {

    return (
        <div>
            <div className="bg-gray-100" style={{ overflow: "scroll" }}>
                <div>
                    <Header />
                </div>
            </div>
            <div>
                <Home />
            </div>
        </div>
    );
}
    
export default Dashboard;
