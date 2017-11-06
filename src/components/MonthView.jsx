import React, { Component } from 'react';



class MonthView extends Component{


	absenteeRender(){
		const dates = this.props.getAbsenteeDates(this.props.date)
		var currentDay = null;
		if(dates.length > 0){
			return dates.map((absentee, index) => {
				if(absentee.title && currentDay !== absentee.date){
					currentDay = absentee.date;
					return(
						<article onClick={()=>{this.props.absenceClick({
							userid:absentee.userid,
							date:currentDay,
							unit:absentee.unit,
							value:absentee.value
						})}}
						key={index} 
						className="absence">
						<h4>{currentDay}</h4>
						<li>{absentee.title + " Public Holiday"}</li>
						</article>
						)
				}
				else if(currentDay !== absentee.date){
					currentDay = absentee.date;
					return(
						<article onClick={()=>{this.props.absenceClick({
							userid:absentee.userid,
							date:currentDay,
							unit:absentee.unit,
							value:absentee.value
						})}}
						key={index} 
						className="absence">
						<h4>{currentDay}</h4>
						<li>{absentee.userid} {absentee.name} {absentee.unit} {absentee.value}</li>
						</article>
						)
				}
				else{
					return(
						<article onClick={()=>{this.props.absenceClick({
							userid:absentee.userid,
							date:currentDay,
							unit:absentee.unit,
							value:absentee.value
						})}}
						key={index} 
						className="absence">
						<li>{absentee.userid} {absentee.name} {absentee.unit} {absentee.value}</li>
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