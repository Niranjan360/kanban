import { Link } from "react-router-dom";

const Navbar = () => {

    return ( <nav>  
                <div>
                    <Link to="/home">Home</Link>
                </div>

                <div>
                    <Link to="/addtask">Add</Link>
                    <Link to="/userprofile">Profile</Link>
                </div>
            </nav> );

}
 
export default Navbar;