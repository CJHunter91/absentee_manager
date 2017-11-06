import React, { Component } from 'react';



class MonthView extends Component{


absenteeRender(){
	const dates = this.props.getAbsenteeDates(this.props.date)
	var currentDay = null;
	if(dates.length > 0){
		return dates.map((absentee, index) => {

			if(currentDay !== absentee.date && this.props.userID === absentee.userid){
					currentDay = absentee.date;
					return(
						<article onClick={()=>{this.props.absenceClick({
							date:currentDay,
							unit:absentee.unit,
							value:absentee.value
						})}}
						key={index} 
						className="absence">
						<h4>{currentDay}</h4>
						<li>{absentee.name} {absentee.unit} {absentee.value}</li>
						</article>
						)
				}
			else if(currentDay !== absentee.date){
					return(
						<article key={index} className="absence">
						<h4>{currentDay}</h4>
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

export default MonthView;