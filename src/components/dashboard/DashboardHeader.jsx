import { Button } from "@components";
import { signout } from "@features";
import { useAuth } from "@hooks";
import { FaBars, FaUser, FaSignOutAlt, FaBell } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const DashboardHeader = ({ toggleSidebar }) => {
    const dispatch = useDispatch();
    const { user } = useAuth();

    return (
        <header>
            <div>
                <div>
                    <div>
                        <button onClick={toggleSidebar}><FaBars /></button>
                        <img src="/images/fyp-ms-logo.png" alt="FYP Management System" width={20} />
                    </div>
                    <div>
                        <Button><FaBell /> Notifications</Button>
                        <div>
                            <button><div>{user.name}</div></button>
                            <ul>
                                <li>Signed in as <br /> <strong>{user.email}</strong></li>
                                <li><hr /></li>
                                <li>
                                    <Button href="/profile"><FaUser /> View Profile</Button>
                                </li>
                                <li>
                                    <Button onClick={() => dispatch(signout())}>
                                        <FaSignOutAlt /> Signout
                                    </Button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;