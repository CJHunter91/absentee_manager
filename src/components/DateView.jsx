import React, { Component } from 'react';



class DateView extends Component{


absenteeRender(){
	const dates = this.props.getAbsenteeDates(this.props.date)
	var currentDay = null;
	if(dates.length > 0){
		return dates.map((absentee, index) => {

			if(currentDay !== absentee.date){
					currentDay = absentee.date;
					return(
						<article key={index} className="absence">
						<h3>{currentDay}</h3>
						<li>{absentee.name} {absentee.unit} {absentee.value}</li>
						</article>
						)
				}
			else{
				return(
						<article key={index} className="absence">
						<li>{absentee.name} {absentee.unit} {absentee.value}</li>
						</article>
						)
			}
		})
	}
}

render(){
	return(
		<article>
		{this.absenteeRender()}
		</article>
		)
	}
}

export default DateView;