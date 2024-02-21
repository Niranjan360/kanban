import { useRef } from "react";
import Navbar from "./Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const Updatetask = () => {

    let tn = useRef();
    let td = useRef();
    let sd = useRef();
    let ed = useRef();
    let p = useRef();
    let navigate = useNavigate();
    let {id} = useParams();

    // to show prv obj details
    useEffect(()=>{
        fetch("http://localhost:4001/tasklist/"+id)
        .then(res=>res.json())
        .then((prevObj)=>{
            tn.current.value = prevObj.taskname;
            td.current.value = prevObj.desc;
            sd.current.value = prevObj.start_date;
            ed.current.value = prevObj.end_date;
            p.current.value = prevObj.priority;
        })
    } , [])

    let handleupdateTask = (e)=>{
        e.preventDefault();

        let updatedTask = {
            taskname : tn.current.value ,
            desc     : td.current.value ,
            added_on : new Date().toLocaleDateString() ,
            start_date : new Date(sd.current.value).toDateString() ,
            end_date : new Date(ed.current.value).toDateString() ,
            priority : p.current.value
        }

        let config = {
            method : "PUT" ,
            headers : {"Content-Type" : "application/json"} ,
            body : JSON.stringify(updatedTask)
        }

        fetch("http://localhost:4001/tasklist/"+id , config)
        .then(()=>{
            toast.success("Task Updated in DB");
            setTimeout(()=>{ navigate("/home") } , 2000)
        })
    }   

    return ( <div className="addtask-cont">
                <Navbar/>

                <h1>Update  Task {id}</h1>
                <form onSubmit={handleupdateTask}>
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

                    <input type="submit" value="Update task"/>
                </form>
                <ToastContainer />
             </div> );
}
export default Updatetask;