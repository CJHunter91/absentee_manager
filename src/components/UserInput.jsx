import React, {Component} from 'react';
import moment from 'moment';

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
        <input name="date" type="date" 
          value={this.props.data.date} 
          onChange={this.props.updateAbscenseData}
          min={moment().format('YYYY-MM-DD')}
          required
          />
        <select name="unit" value={this.props.data.unit} onChange={this.props.updateAbscenseData}>
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
        <select name="value" value={this.props.data.value} onChange={this.props.updateAbscenseData} required>
          <option value="" disabled>Select absence type</option>
          <option value="V">Vacation</option>
          <option value="P">Public Holiday</option>
          <option value="T">Training</option>
          <option value="M">Offsite Meeting</option>
          <option value="S">Sickness</option>
        </select>
        <input className="button" type="submit" value="Add Absence"/>
      </form>
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

