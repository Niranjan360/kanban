import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {

    let un = useRef();
    let ue = useRef();
    let up = useRef();
    let uDob = useRef();
    let uPwd = useRef();
    let uCPwd = useRef();
    let navigate = useNavigate();

    let handleSignup = (e)=>{
        e.preventDefault();

        // checking if any duplicate of email or phones
        fetch("http://localhost:4000/users")
        .then(res=>res.json())
        .then((data)=>{
            var validated = true;

            if(data.some((user)=>{ return user.email==ue.current.value}))
            {
                validated = false;
                toast.error("email already present !! please use different email");
            }

            if(data.some((user)=>{ return user.phone==up.current.value}))
            {
                validated = false;
                toast.error("Phone number already present !! please use different number");
            }

            if(uPwd.current.value != uCPwd.current.value)
            {
                validated = false;
                toast.error("password missmatch");
            }

            if( validated )
            {
                let newUser = {
                    username: un.current.value,
                    email:ue.current.value,
                    phone:up.current.value,
                    dob:uDob.current.value,
                    password:uPwd.current.value,
                }

                let config = {
                    method : "POST",
                    headers : {"Content-Type":"application/json"},
                    body : JSON.stringify(newUser)
                }

                fetch("http://localhost:4000/users" , config)
                .then(()=>{ 
                    toast.success("Account has been Created");
                    setTimeout( ()=>{navigate("/")} , 3000);
                })
            }

        })
        
    }

    return ( <div className="signup-cont">
                <div className="form-cont">
                    <div className="b1">
                        <div>
                            <h1>New Account</h1>
                            <form onSubmit={handleSignup}>
                                <input type="text" placeholder="Username" ref={un}/>
                                <input type="email" placeholder="Email id" ref={ue}/>
                                <input type="phone" placeholder="Mobile Number"  ref={up}/>
                                <input type="date" placeholder="Date of birth" ref={uDob}/>
                                <input type="password" placeholder="Password" ref={uPwd}/>
                                <input type="text" placeholder="ConfirmPassword" ref={uCPwd}/>

                                <input type="submit" value="Signup" />
                            </form>
                            <span>Already Have an account ? <Link to="/">Login here</Link> </span>
                        </div>
                    </div>
                    <div className="b2">
                        <img src="https://img.freepik.com/premium-vector/secure-login-sign-up-concept-illustration-user-use-secure-login-password-protection-website-social-media-account-vector-flat-style_7737-2270.jpg" alt="" />
                    </div>
                </div>
                <ToastContainer />
            </div> );
}
 
export default Signup;