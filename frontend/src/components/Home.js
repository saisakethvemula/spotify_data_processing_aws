import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
    
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);

    const handleToggle = () => {
        setIsLogin(!isLogin);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    // const handleLogin = async () => {
    //     const requestData = {
    //         email_id: email,
    //         password: password,
    //     };
    //     // https://gippiff5t9.execute-api.us-east-1.amazonaws.com/login_main
    //     // https://dxwtong0ob.execute-api.us-east-1.amazonaws.com/signup_main
    //     try {
    //         const response = await axios.post("https://gippiff5t9.execute-api.us-east-1.amazonaws.com/login_main", requestData);
    //         console.log(response.data); // Log the response data
    //     } 
    //     catch (error) {
    //         console.error(error);
    //     }
    //     // navigate(`/playlist`)
    // }

    const handleLogin = async (event) => {
        event.preventDefault();
        const API_ENDPOINT = 'https://gippiff5t9.execute-api.us-east-1.amazonaws.com/login_main';
        const requestData = {
          email_id: email,
          password: password,
        };
    
        try {
          const response = await axios.post(API_ENDPOINT, requestData);
          console.log(response.data); // Log the response data
          if (response.data === "auth"){
            navigate(`/playlist`, { state: { email } })
          }
          else if (response.data === "wrong"){
            alert("Wrong password")
          }
          else{
            alert("User doesn't exists")
          }
        } 
        catch (error) {
          console.error(error);
        }
    };

    const handleSignup = async (event) => {
        event.preventDefault();
        const API_ENDPOINT = 'https://dxwtong0ob.execute-api.us-east-1.amazonaws.com/signup_main';
        const requestData = {
          email_id: email,
          password: password,
        };
    
        try {
          const response = await axios.post(API_ENDPOINT, requestData);
          console.log(response.data); // Log the response data
          if (response.data === "added"){
            navigate(`/playlist`, { state: { email } })
          }
          else{
            alert('User exists, please login to continue')
          }
        } catch (error) {
          console.error(error);
        }
    };

    const styleObj = {
        fontSize: 14
    }

    return (
    <header style={{ 
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#f0f0f0"
        }}>
        <div style={{ 
            color: "#333",
            fontFamily: "Arial, sans-serif",
            fontSize: "24px",
            fontWeight: "bold",
            maxWidth: 1100
            }}>
            <h1>Welcome to MySpotify</h1>
            <h4>Objective:</h4>
            <p style={styleObj}>The objective of this project is to create a scalable, secure, and efficient data pipeline that
extracts, transforms, and loads data from the Spotify API into a normalized DynamoDB
database and makes it available for visualization and analysis on the front end. By doing so, we
aim to provide an accessible and user-friendly way of analyzing Spotify data, which can be used
by individuals and organizations to gain insights into their music preferences and behaviors.
Additionally, the project aims to demonstrate how various AWS services can be used together
to create a reliable and efficient data pipeline, which can be adapted to different use cases and
industries. The goal is to provide a valuable tool for music enthusiasts and professionals alike,
using Data Analytics while also highlighting the power and versatility of AWS services.</p>
            <h4>Usefulness:</h4>
            <p style={styleObj}>The above project can be useful in several ways. First, it provides a reliable and efficient way of
accessing and analyzing data from the Spotify API, which can be used by individuals and
organizations to gain insights into their music preferences and behaviors. This can be
particularly useful for music enthusiasts, marketers, and researchers who want to understand
trends, patterns, and behaviors in the music industry.
Second, the interactive interface provided by the project makes it easy for users to visualize and
analyze the data in various formats, such as line charts, bar charts, and pie charts. This can be
beneficial for users who want to explore the data in diverse ways and gain a deeper
understanding of their music habits.
Third, the project highlights the power and versatility of AWS services and provides a blueprint
for creating similar data pipelines in other industries and use cases. This can be useful for
developers and organizations who want to leverage AWS services for their data needs and build
scalable and reliable applications.
However, the above project differs from these databases in several ways. First, it uses the latest
data from the Spotify API, which provides real-time and accurate data on music preferences
and behaviors. Second, the project is built on AWS services, which provides scalability,
reliability, and security for the data pipeline. Third, the interactive interface provided by the
project makes it easy for users to visualize and analyze the data in different formats, which can
be beneficial for gaining insights and making data-driven decisions.
The target user group for the database application is music enthusiasts, marketers, and
researchers who want to gain insights into their music preferences and behaviors.
            </p>
        </div>
        <div>
        <form style={{ 
            display: "flex",
            flexDirection: "column",
            gap: "10px"
        }}>
            <label htmlFor="email" style={{ 
            color: "#333",
            fontFamily: "Arial, sans-serif",
            fontSize: "16px",
            fontWeight: "bold"
            }}>Email:</label>
            <input 
            onChange={handleEmailChange}
            type="email" 
            id="email" 
            name="email" 
            required 
            style={{ 
                padding: "10px",
                border: "none",
                borderRadius: "5px"
            }}
            />
            <label htmlFor="password" style={{ 
            color: "#333",
            fontFamily: "Arial, sans-serif",
            fontSize: "16px",
            fontWeight: "bold"
            }}>Password:</label>
            <input 
            onChange={handlePasswordChange}
            type="password" 
            id="password" 
            name="password" 
            required 
            style={{ 
                padding: "10px",
                border: "none",
                borderRadius: "5px"
            }}
            />
            {/* <button 
            type="submit"
            style={{ 
                padding: "10px 20px",
                backgroundColor: "#1DB954",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                fontFamily: "Arial, sans-serif",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer"
            }}
            onClick={handleLogin}
            >
            Log in
            </button>
            <label htmlFor="signup" style={{ 
            color: "#333",
            fontFamily: "Arial, sans-serif",
            fontSize: "16px",
            fontWeight: "bold"
            }}>SignUp?</label> */}
            {isLogin ? (
            <>
                <button
                type="submit"
                style={{
                    padding: "10px 20px",
                    backgroundColor: "#1DB954",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    fontFamily: "Arial, sans-serif",
                    fontSize: "16px",
                    fontWeight: "bold",
                    cursor: "pointer",
                }}
                onClick={handleLogin}
                >
                Log in
                </button>
                <label
                htmlFor="signup"
                style={{
                    color: "#333",
                    fontFamily: "Arial, sans-serif",
                    fontSize: "16px",
                    fontWeight: "bold",
                    cursor: "pointer",
                }}
                onClick={handleToggle}
                >
                Sign up?
                </label>
            </>
            ) : (
            <>
                <button
                type="submit"
                style={{
                    padding: "10px 20px",
                    backgroundColor: "#1DB954",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    fontFamily: "Arial, sans-serif",
                    fontSize: "16px",
                    fontWeight: "bold",
                    cursor: "pointer",
                }}
                onClick={handleSignup}
                >
                Sign up
                </button>
                <label
                htmlFor="signup"
                style={{
                    color: "#333",
                    fontFamily: "Arial, sans-serif",
                    fontSize: "16px",
                    fontWeight: "bold",
                    cursor: "pointer",
                }}
                onClick={handleToggle}
                >
                Sign in?
                </label>
            </>
            )}
        </form>
    </div>
    </header>
  );
};

export default Header;
