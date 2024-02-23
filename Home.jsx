import { Link, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import useFetch from "../hooks/useFetch";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useRef, useState } from "react";

const Home = () => {

    let[forceRender , setForceRender] = useState(0);
    let[tasklist , settasklist] = useState(null);                                       // use genric names to save data
    let[pending , setPending] = useState(true);
    let[error , setError] = useState(null);

    let[temp , setTemp] = useState(null);                                       // use genric names to save data
    let searchKey = useRef();
    let sort = useRef();
    let order = useRef();



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
            .then((data)=>{ 
                let pr = {
                    low : 0 ,
                    medium : 1 ,
                    high : 2 ,
                    urgent : 3
                }

                data.forEach((v)=>{
                    v.p = pr[v.priority];
                    console.log(v.p , v.priority);
                })


                settasklist(data);  
                setTemp(data);   
                setPending(false);
            })            // save the data to state
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

    let handleSearch = ()=>{
        let filterdArray = temp.filter((v,i,a)=>{ 
            return v.taskname.includes(searchKey.current.value) || v.id==searchKey.current.value
        });
        settasklist( [...filterdArray] );
    }

    let handleSort = ()=>{

        let x = sort.current.value;

        let cond = {
            name : (i,j)=>{ return i.taskname > j.taskname} ,
            start : (i,j)=>{ return new Date(i.start_date)> new Date(j.start_date)} ,
            end : (i,j)=>{ return new Date(i.end_date) > new Date(j.end_date)} ,
            added : (i,j)=>{ return new Date(i.added_on) > new Date(j.added_on)} ,
            priority : (i,j)=>{ return i.p > j.p} ,
        }
        
        let tl = [...tasklist];
        for (let i = 0; i < tl.length; i++) 
        {
            for (let j = i+1; j < tl.length; j++) 
            {
                if( cond[x](tl[i] , tl[j]) )
                {
                    let tmp = tl[i];
                    tl[i] = tl[j];
                    tl[j] = tmp; 
                }                
            }            
        }

        if(order.current.value == "high")
        {
            tl.reverse()
        }
        console.log(tl);
        settasklist(tl);
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
                                    <input type="text" placeholder="Task / Id " ref={searchKey} />
                                    <button onClick={handleSearch}>search</button>
                                </div>
                                <div className="sort-bar">
                                    <select ref={sort}>
                                        <option disabled selected>--Select--</option>
                                        <option value="name">Name</option>
                                        <option value="start">Start</option>
                                        <option value="end">End</option>
                                        <option value="added">Added</option>
                                        <option value="priority">Priority</option>
                                    </select>
                                    <select ref={order}>
                                        <option disabled selected>--Select--</option>
                                        <option value="high">high to Low</option>
                                        <option value="low">Low to High</option>
                                    </select>
                                    <button onClick={handleSort}>Apply</button>
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