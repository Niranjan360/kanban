import { useRef } from "react";
import Navbar from "./Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const Addtask = () => {

    let tn = useRef();
    let td = useRef();
    let sd = useRef();
    let ed = useRef();
    let p = useRef();
    let navigate = useNavigate();

    let handleAddTask = (e)=>{
        e.preventDefault();

        let newTask = {
            taskname : tn.current.value ,
            desc     : td.current.value ,
            added_on : new Date().toLocaleDateString() ,
            start_date : new Date(sd.current.value).toDateString() ,
            end_date : new Date(ed.current.value).toDateString() ,
            priority : p.current.value
        }

        let config = {
            method : "POST" ,
            headers : {"Content-Type" : "application/json"} ,
            body : JSON.stringify(newTask)
        }

        fetch("http://localhost:4001/tasklist" , config)
        .then(()=>{
            toast.success("Task Added to DB");
            setTimeout(()=>{ navigate("/home") } , 2000)
        })
    }   

    return ( <div className="addtask-cont">
                <Navbar/>

                <h1>Add New Task</h1>
                <form onSubmit={handleAddTask}>
                    <input type="text" placeholder="Task name" ref={tn}/>
                    <textarea cols="20" rows="5" placeholder="Task Description" ref={td}></textarea>
                    <input type="date" ref={sd}/>
                    <input type="date" ref={ed}/>
                    <select ref={p}>
                        <option disabled selected>--SELECT--</option>
                        <option value="urgent">urgent</option>
                        <option value="high">high</option>
                        <option value="medium">medium</option>
                        <option value="low">low</option>
                    </select>

                    <input type="submit" value="Add task"/>
                </form>
                <ToastContainer />
             </div> );
}
export default Addtask;