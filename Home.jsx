import { Link, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import useFetch from "../hooks/useFetch";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";

const Home = () => {

    let[forceRender , setForceRender] = useState(0);
    let[tasklist , settasklist] = useState(null);                                       // use genric names to save data
    let[pending , setPending] = useState(true);
    let[error , setError] = useState(null);

    useEffect(()=>{
        setTimeout(()=>{
            fetch("http://localhost:4001/tasklist")                                                         // fetch data based on dynamic api passed in param
            .then((res)=>{
                if(res.ok)
                {
                    return res.json();
                }
                throw new Error("Sorry !! Invalid request")
            })
            .then((data)=>{ settasklist(data);    setPending(false);})            // save the data to state
            .catch((err)=>{ setError(err.message); setPending(false);})
        } , 500)   
        
    } , [forceRender])
    

    let handleDelete = (id)=>{
        if(window.confirm("Are you sure ?"))
        {
            fetch("http://localhost:4001/tasklist/"+id , {method:"DELETE"})
            .then(()=>{
                toast.warn("Task deleted !");
                setForceRender(forceRender+1);
            })
        }
    }


    return ( <>
                <div className="home-cont">
                    <Navbar/>
                    {pending && <h1>Please wait ............</h1>}
                    {error && <h1>{error}</h1>}
                    {tasklist && 
                        <>
                            <div className="filter">
                                <div className="searchbar">
                                    <input type="text" placeholder="Task / Id / start / End / Added" />
                                    <button>search</button>
                                </div>
                                <div className="sort-bar">
                                    <select>
                                        <option disabled selected>--Select--</option>
                                        <option value="Name">Name</option>
                                        <option value="Start">Start</option>
                                        <option value="End">End</option>
                                        <option value="Added">Added</option>
                                        <option value="Priority">Priority</option>
                                    </select>
                                    <select>
                                        <option value="high">high to Low</option>
                                        <option value="low">Low to High</option>
                                    </select>
                                    <button>Apply</button>
                                    <button>clear</button>
                                </div>
                            </div>
                            
                            <table cellSpacing="0px">
                                <thead>
                                    <tr>
                                        <th>Sl no</th>
                                        <th>Task Name</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Priority</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    tasklist.map((v,i,a)=>{ 
                                        return(<tr key={v.taskname + v.id}>
                                                    <td>{i+1}</td>
                                                    <td>{v.taskname}</td>
                                                    <td>{v.start_date}</td>
                                                    <td>{v.end_date}</td>
                                                    <td>{v.priority}</td>
                                                    <td>
                                                        <Link to={`/updatetask/${v.id}`}><button>✏</button></Link>
                                                        <button onClick={()=>{handleDelete(v.id)}}>🗑</button>
                                                    </td>
                                                </tr>)
                                    })
                                }
                                </tbody>
                            </table>
                        </>
                    }
                </div>  
                <ToastContainer />
            </> );
}
 
export default Home;