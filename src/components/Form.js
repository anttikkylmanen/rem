import React from 'react'


const Form = ({name, time, fname,fdate,add}) => {
 
    return (
        <form onSubmit={add}>
        <div>
            
            Topic: 
            <input 
              value={name} 
              onChange={fname}
            />
          </div>
          <div>
            At time: 
            <input 
              type='datetime-local'
              value={time} 
              onChange={fdate}
            />
          </div>
          <div>
            <button type="submit">Add</button>
          </div>

       </form>
        
    )
}


export default Form