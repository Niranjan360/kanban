import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Profile = () => {

    let navigate = useNavigate();

    let handleLogout = ()=>{
        if(window.confirm("Logout ?"))
        {
            localStorage.removeItem("currentUser");
            navigate("/")
        }
    }

    return ( <div className="profile conc">
                <Navbar/>

                <div className="profile-details">
                    <h1>Name</h1>
                    <h3>Email</h3>
                    <h3>Phone</h3>
                    <h3>DOB</h3>

                    <button onClick={handleLogout}>Logout</button>
                    <button>Delete account</button>
                </div>
            </div> );
}
 
export default Profile;