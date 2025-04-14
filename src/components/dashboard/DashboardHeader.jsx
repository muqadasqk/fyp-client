import { Button } from "@components";
import { signout } from "@features";
import { useAuth } from "@hooks";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser, faSignOutAlt, faBell } from "@fortawesome/free-solid-svg-icons";

const DashboardHeader = ({ toggleSidebar }) => {
    const dispatch = useDispatch();
    const { user } = useAuth();

    return (
        <header className="bg-white shadow-md"
        style={{borderBottom:"2px solid var(--out-line)"}}
        >
            <div className="flex items-center justify-between px-3 py-4" >
                <div className="flex items-center">
                        <button onClick={toggleSidebar} className="text-gray-500 focus:outline-none focus:text-gray-700 md:hidden">
                        <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
                        </button>
                        <img src="/images/fyp-ms-logo.png" alt="FYP Management System" 
                        className="w-30 mb-3 ml-3 md:hidden" />
                    </div>
                    <div className="flex items-center space-x-4">
                    <Button className="text-gray-500 focus:outline-none">
                    <FontAwesomeIcon icon={faBell} /> Notifications</Button>
                    </div>
                       
                        <div className="relative">
                            <button className="flex items-center space-x-2">
                                 <div>{user.name}</div></button> 
                            <ul className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2">
                                <li className="px-4 py-2 text-sm text-gray-700">Signed in as <br /> <strong>{user.email}</strong></li>
                                <li ><hr className="border-gray-200" /></li>
                                <li>
                                    <Button href="/profile"><FontAwesomeIcon icon={faUser} /> View Profile</Button>
                                </li>
                                <li>
                                    <Button onClick={() => dispatch(signout())}>
                                        <FontAwesomeIcon icon={faSignOutAlt} /> Signout
                                    </Button>
                                </li>
                            </ul>
                        </div>
                    </div>
                
            
        </header>
    );
};

export default DashboardHeader;