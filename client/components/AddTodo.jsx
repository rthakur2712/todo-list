import axios from 'axios';
import React, { useRef, useState } from 'react'
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
const ValuePiece = Date | null;
const Value = ValuePiece | [ValuePiece, ValuePiece];

const AddTodo = ({setTodos,loadingBar})=>{

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [inputValue, setInputValue] = useState('');
  const [dateValue, onDateChange] = useState(new Date());
  const submitHandler = async(e)=>{
    // call the add todo functionality
    loadingBar.current.continuousStart();
    e.preventDefault();
    try{
      const res = await axios.post(`${BACKEND_URL}/todos`,{
        title : inputValue,
        deadline:dateValue
      });
      setTodos((prev)=>[...prev, res.data]);
      setInputValue('');
      console.log("Successfully posted todo",res.data);
    } catch(err){
      console.log("Unable to post todo",err);
    }
    loadingBar.current.complete();
  }
  return(
    <form onSubmit={submitHandler} >
      <input type='text' value={inputValue} onChange={(e)=>setInputValue(e.target.value)} ></input>
      <p>Deadline:</p>
      <DateTimePicker value={dateValue} onChange={onDateChange} />
      <button type='submit' >Submit</button>
    </form>
  )
}


export default AddTodo
