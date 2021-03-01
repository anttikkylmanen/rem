import React from 'react';
import Reminder from './components/Reminder'
import Form from './components/Form'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      reminders: [],
      newName: '',
      newTime:''
    }
  }

  componentDidMount(){
    axios
      .get('http://localhost:3001/reminders')
      .then(response => {
      this.setState ({reminders: response.data})
      
})
  }

  // Ex2.6 tehtävänanto jäi vähän epäselväksi, 
 // mutta tässä yksi sovellus

  addTopic = (event) => {
    event.preventDefault()
    const reminderObject ={
      name: this.state.newName,
      timestamp: this.state.newTime, 
      id: this.state.reminders.length + 1
    }
    
    const names= this.state.reminders.map(name => name.name)
    names.includes(this.state.newName)?
      alert('Already in the list. Add a new reminder'):
    
    axios.post('http://localhost:3001/reminders', reminderObject)
      .then(response => {
        this.setState({
          reminders: this.state.reminders.concat(response.data),
           newName: '',
           newTime: ''
         })
    })
  }

  deleteEntry = (id) => {
    return () => {
      const url = `http://localhost:3001/reminders/${id}`
      const rmndrs = this.state.reminders.filter(rmndr => rmndr.id !== id)
      if (window.confirm("Do you really want to delete this?")) {
        axios.delete(url)
        .then(response =>{
          this.setState({
            reminders: rmndrs
          })  
        })
      }
      
    }
  }

handleTopicChange = (event) => {
    this.setState({ newName: event.target.value })
  }

handleDateChange = (event) => {
    this.setState({ newTime: event.target.value })
  }

  render() {
    return (
      <div>
        <h2>Add Reminder</h2>
        
          <Form 
            name={this.state.newName} 
            time={this.state.newTime} 
            fname={this.handleTopicChange} 
            fdate={this.handleDateChange}
            add={this.addTopic}
          />
        
        
        <h2>Reminders</h2>
        <ul>
          {this.state.reminders.map( reminder => <Reminder key={reminder.id} reminder= {reminder} del={this.deleteEntry(reminder.id)} />)}
        </ul>
        <div>
          debug: {this.state.newName}
        </div>
      </div>
      
    )
  }
}

export default App