import React, {Component} from 'react';
import moment from 'moment';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

class UserInput extends Component{

render(){

  if (this.props.isOpen === false)
     return null

 return(

  <article >
    <section id="user-input" className="modal-content">
    <span id="close" onClick={this.props.closeModal} className="close">&times;</span>
      <h4>Absence Request</h4>
      <form onSubmit={this.props.submitData}>
        <label>Date</label>
        <DayPicker name="date" type="date" 
          selectedDays={new Date (this.props.data.date)} 
          onDayClick={this.props.onDayClick}
          min={moment().format('YYYY-MM-DD')}
          disabledDays={[{ daysOfWeek: [0, 6]},{before: new Date() }]}
          todayButton="Go to Today"
          required
          />
        <label>Unit</label> 
        <select name="unit" value={this.props.data.unit} onChange={this.props.updateAbscenseData}>
          <option value="AM">AM</option>
          <option value="PM">PM</option>
          <option value="ALL">All</option>
        </select>
        <label>Reason</label>
        <select name="value" value={this.props.data.value} onChange={this.props.updateAbscenseData} required>
          <option value="" disabled>Select absence type</option>
          <option value="V">Vacation</option>
          <option value="T">Training</option>
          <option value="M">Offsite Meeting</option>
          <option value="S">Sickness</option>
        </select>
        <input className="button" type="submit" value="Add Absence"/>
      </form>
      <button className="button"onClick={()=>{this.props.remove();this.props.closeModal();}}>Remove</button>
      <div className="alert">
        {this.props.clash}
      </div>
    </section>
    <div id="backdrop" onClick={e => this.close(e)}/>
  </article>
  )
}
close(e) {
 e.preventDefault()

 if (this.props.closeModal) {
   this.props.closeModal()
 }
}
}

export default UserInput;

