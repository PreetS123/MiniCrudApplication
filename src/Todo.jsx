import { nanoid } from "nanoid";
import React,{useState,useEffect} from "react";
import styles from './Todo.module.css';
import { AiFillDelete } from "react-icons/ai";
import {FaRegEdit} from 'react-icons/fa';

export const Todo=()=>{
    const [inpVal,setInpVal]= useState({});
     const [data,setData]= useState([])
    /* Logic for adding todo tada in json server starts here  */
    const TodoPost=(value)=>{
        // console.log(value)
        const obj={
            title:value.title,
            image:value.image,
            completed:false,
            _id:nanoid()
        }
        fetch(`http://localhost:8080/posts`,{
            method:'POST',
            body:JSON.stringify(obj),
            headers:{
                'content-type':'application/json'
            }
        })
    }
     const handleAdd=()=>{
        // console.log(inpVal) 
           TodoPost(inpVal);
     }
       const handleChange=(e)=>{
          setInpVal({...inpVal,[e.target.name]:e.target.value})
       }


    //    fetch todo js part starts here

      const fetchTodo=()=>{
        fetch(`http://localhost:8080/posts`,{
            method:'GET'
        }).then(r=>r.json())
        .then(d=>{
            // console.log(d);
            setData(d);
        })
        .catch(er=>{
            console.log(er);
            alert('ERROR OCCURED CHECK THE CONSOLE')
        })
      }
     

      useEffect(()=>{
          fetchTodo()
      },[data?.length])
    //    console.log('d',data)


      // deleteing js part starts from here 

      const handleDelete=(id)=>{
        fetch(`http://localhost:8080/posts/${id}`,{
            method:'DELETE',   
        })
        .then(r=> r.json())
        .then(d=>{
              fetchTodo(d)
        })
      }

    return (
        <>
          {/* addTodo HTML part starts here  */}
        <div className={styles.addTodo}>
            <div>
                <label htmlFor="title"> Item:</label>
                <input type="text" name='title' placeholder="title" onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="image">Image_Url:</label>
                <input type="text" name='image' placeholder="image" onChange={handleChange} />
            </div>
            <div>
                <button onClick={handleAdd}>ADD</button>
            </div>
        </div>
        {/* fetch Todo html part starts here */}
        <div className={styles.fetchTodo}>
              {
                data?.map(item=>{
                    return (
                        <div key={item._id} className={styles.oneTodo}>
                            <img src={item.image} alt={item.id} />
                            <p>{item.title}</p>
                            <div className={styles.btnbox}>
                                <button onClick={()=>handleDelete(item.id)}><AiFillDelete/></button>
                                <button><FaRegEdit/></button>
                            </div>
                        </div>
                    )
                })
              }
        </div>
        </>
    )
}