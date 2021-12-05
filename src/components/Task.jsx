import React, { useState } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import dateFnsFormat from 'date-fns/format'
import isAfter from 'date-fns/isAfter'
import isBefore from 'date-fns/isBefore';
import addDays from 'date-fns/esm/fp/addDays/index.js';
import isToday from 'date-fns/isToday';

const Task_Header_Mapping = {
    INBOX: 'Inbox',
    TODAY:'Today',
    NEXT_7: 'Next 7 days',
}


const FORMAT = 'dd/MM/yyyy'
const Addtask =({onCancel, onAddTask})=>{
    const [task,setTask] = useState(''); 
    const [date, setDate]=useState(null);
    function formatDate(date, format, locale) {
       return dateFnsFormat(date, format, { locale });
    }
    return(
         <div className='add-task-dialogue'>
                <input onChange={(e)=> setTask(e.target.value)}/>
              <div className='add-task-action-container'>
                <div className='btn-container'>
                    <button className='add-btn' disabled={!task} onClick={()=>{
                        onAddTask(task, date);
                        onCancel();
                        setTask('');
                    }}>Add Task</button>
                    <button className='cancel-btn' onClick={()=>onCancel()}>Cancel</button>
                </div>
                <div className='icon-container'>
                    <DayPickerInput
                     formatDate={formatDate}
                     format={FORMAT}
                     onDayChange={(day)=>setDate(day)}
                     placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
                     dayPickerProps={{
                         modifiers:{
                             disabled:[{before: new Date() }]
                         }
                     }}
                    />
                </div>
              </div>
            </div>
    );
}

const TaskItems = ({selectedTab, list})=>{
    let listToRender = [...list];
    if(selectedTab === 'NEXT_7'){
       listToRender= listToRender.filter(listItem => 
        isAfter(listItem.date, new Date()) && 
        isBefore(listItem.date, addDays(new Date(), 7))
        )
        
    }
    if(selectedTab === 'TODAY'){
       listToRender = listToRender.filter(listItem =>isToday(listItem.date) ) 
    }

    return (
        <div className='task-items-container'>
        {listToRender.map(listItem =>(
            <div className='task-item'>
              <p>{listItem.text}</p>
              <p> {dateFnsFormat(new Date(listItem.date), FORMAT)}</p>
            </div>
         ))}
     </div>
     )
}

const Task = ({selectedTab}) => {
    const [showAddTask, setShowAddTask] = useState(false);
    const [list, setList] = useState([]);

    const addNewTask = (text, date)=>{
        const newTaskItem = {text, date: date || new Date()}
         setList((prevState)=>[...prevState, newTaskItem]);
    };
    return (
        <div className='tasks'>
            <h1>{Task_Header_Mapping[selectedTab]}</h1>

            {selectedTab === 'INBOX' ? <div className='add-task-btn' onClick={()=>setShowAddTask((prevState)=>!prevState)}> 
                <span className='plus'>+</span>
                <span className='add-task-text'>Add task</span>
            </div> : ''}
           {showAddTask && <Addtask onAddTask={addNewTask} onCancel={()=>setShowAddTask(false)}/>}
           {list.length>0?<TaskItems list={list} selectedTab={selectedTab} />:<p>No task yet</p>}
        </div>
    )
}

export default Task
