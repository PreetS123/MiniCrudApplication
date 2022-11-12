import { nanoid } from "nanoid";
import React,{useState} from "react";
import styles from './Todo.module.css';


export const Todo=()=>{
    const [inpVal,setInpVal]= useState({});
     
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
    return (
        <>
        <div className={styles.addTodo}>
            <div>
                <input type="text" name='title' placeholder="title" onChange={handleChange} />
            </div>
            <div>
                <input type="text" name='image' placeholder="image" onChange={handleChange} />
            </div>
            <div>
                <button onClick={handleAdd}>ADD</button>
            </div>
        </div>
        </>
    )
}