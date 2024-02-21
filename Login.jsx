import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    let un = useRef();
    let uPwd = useRef();
    let navigate = useNavigate();

    // to redirect if user is already authenticated
    useEffect(()=>{
        let cu = JSON.parse(localStorage.getItem("currentUser"));
        if(cu != null)
        {
            navigate("/home");
        }
    } , [])

    let handleLogin = (e)=>{
        e.preventDefault();  
        fetch("http://localhost:4000/users")
        .then(res=>res.json())
        .then((usersData)=>{
            let result = usersData.find(
                (user)=>{return user.username==un.current.value || user.email==un.current.value}
                );
            if(result==undefined)
            {
                toast.error("User not found , please give valid name");
            }
            else if(result.password != uPwd.current.value)
            {
                toast.error("Invalid password !!")
            }
            else
            {
                toast.success("Login successfull");
                localStorage.setItem("currentUser" , JSON.stringify(result));
                setTimeout(()=>{ navigate("/home") } , 3000)
            }

        })
    }

    return ( <div className="login-cont">
                <div className="form-cont">
                    <div className="b1">
                        <div>
                            <h1>New Account</h1>
                            <form onSubmit={handleLogin}>
                                <input type="text" placeholder="Username or Email" ref={un}/>
                                <input type="password" placeholder="Password" ref={uPwd}/>

                                <input type="submit" value="Login" />
                            </form>
                            <span>Don't Have an account ? <Link to="/signup">Create here</Link> </span>
                        </div>
                    </div>
                    <div className="b2">
                        <img src="https://img.freepik.com/premium-vector/secure-login-sign-up-concept-illustration-user-use-secure-login-password-protection-website-social-media-account-vector-flat-style_7737-2270.jpg" alt="" />
                    </div>
                </div>
                <ToastContainer />
            </div> );
}
 
export default Login;