import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import "../../css/Profile.css"
import {Link, useNavigate} from 'react-router-dom';
import Loader from "../GeneralScreens/Loader";
import {AuthContext} from '../../context/AuthContext';
import {BiLogOut} from "react-icons/bi";

const Profile = () => {
    const {config} = useContext(AuthContext)
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true)

    const editDate = (createdAt) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const d = new Date(createdAt);
        var datestring = d.getDate() + " " + monthNames[d.getMonth()] + " , " + d.getFullYear()
        return datestring
    }

    const navigate = useNavigate()

    useEffect(() => {

        const getUserProfile = async () => {

            setLoading(true)

            try {
                const {data} = await axios.get("/user/profile", config)

                setUser(data.data)

                setLoading(false)
            } catch (error) {
                navigate('/')
            }
        }

        getUserProfile()
    }, [setLoading])

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate('/')
    };


    return (
        <div className="Inclusive_profile_page">
            {
                loading ? <Loader/> :
                    <>
                        <div className="profile-top-wrap">

                            <span>
                                Membership Information
                            </span>

                            <a onClick={handleLogout}><BiLogOut/> Close Account</a>

                        </div>
                        <ul>

                            <li>
                                <span>
                                    Username
                                </span>
                                <div>
                                    {user.username}
                                </div>
                            </li>
                            <li>
                                <span>E-Mail</span>
                                <div>
                                    {user.email}
                                </div>

                            </li>
                            <li>

                                <span> Account Created Date </span>
                                <div>
                                    {editDate(user.createdAt)}
                                </div>
                            </li>

                        </ul>

                        <div className='btns_wrap'>
                            <button className='profileEditBtn'>
                                <Link to="/edit_profile">
                                    Edit Profile
                                </Link>
                            </button>
                            <button className='changePassBtn'>
                                <Link to="/change_password">
                                    Change Password
                                </Link>
                            </button>
                        </div>
                    </>
            }
        </div>
    )
}

export default Profile;
