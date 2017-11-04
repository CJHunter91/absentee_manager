import React, {Component} from 'react';
import moment from 'moment';

class UserInput extends Component{

render(){

  if (this.props.isOpen === false)
     return null

 let modalStyle = {
   position: 'fixed',
   top: '50%',
   left: '50%',
   height: '80%',
   width: '80%',
   transform: 'translate(-50%, -50%)',
   zIndex: '9999',
   background: '#9ad3de',
   borderRadius: '10px',
   border: 'solid white 2px'
 }

 if (this.props.style) {
   for (let key in this.props.style) {
     modalStyle[key] = this.props.style[key]
   }
 }

 let backdropStyle = {
   position: 'fixed',
   width: '100%',
   height: '100%',
   top: '0px',
   left: '0px',
   zIndex: '9998',
   background: 'rgba(0, 0, 0, 0.3)'
 }

 if (this.props.backdropStyle) {
   for (let key in this.props.backdropStyle) {
     backdropStyle[key] = this.props.backdropStyle[key]
   }
 }
 return(

  <article >
    <section id="user-input" className="modal-content" style={modalStyle}>
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
          <option value="All">All Day</option>
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
        <select name="value" value={this.props.data.type} onChange={this.props.updateAbscenseData} required>
          <option value="" disabled>Select absence type</option>
          <option value="V">Vacation</option>
          <option value="P">Public Holiday</option>
          <option value="T">Training</option>
        </select>
        <input type="submit" value="Add Absence"/>
      </form>
    </section>
    <div style={backdropStyle} onClick={e => this.close(e)}/>
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

