import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
    return (
        
        <div className="welcome">
            <h3>Good Day</h3>
        
            <h3>
                
                Welcome <Link to="/signin">Login</Link>
                
                <Link to="/signup">Register</Link>
            
            </h3>
        
        </div>
    );
};

export default Welcome;
