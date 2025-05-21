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
  return (
    <form onSubmit={submitHandler} className="mb-6">
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new todo..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <div className="flex items-center space-x-4">
          <DateTimePicker
            onChange={onDateChange}
            value={dateValue}
            className="border border-gray-300 rounded-md"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Todo
          </button>
        </div>
      </div>
    </form>
  );
}


export default AddTodo
