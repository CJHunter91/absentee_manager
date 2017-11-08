import React, { Component } from 'react';
import moment from 'moment';



class MonthView extends Component{

	splitDays(){
		var dayArray = []
		const dates = this.props.getAbsenteeDates(this.props.date).slice(0)
		if(dates.length > 0){
			var currentDay = dates[0].date
			var tempArray = []
			dates.forEach((absentee, index)=>{
				if(currentDay !== absentee.date && dates.length === index+1){
					currentDay = absentee.date;
					dayArray.push(tempArray);
					tempArray = [];
					tempArray.push(absentee);
					dayArray.push(tempArray);
				}
				else if(currentDay !== absentee.date){
					currentDay = absentee.date;
					dayArray.push(tempArray)
					tempArray = [];
					tempArray.push(absentee);
				}

				else if(dates.length === index+1){
					tempArray.push(absentee);
					dayArray.push(tempArray)
				}
				else{
					tempArray.push(absentee);
				}
			})
			return dayArray
		}
	}

	absenteeRender(){
		const dayArrays = this.splitDays()
		if(dayArrays !== undefined){
			return dayArrays.map((day, index)=>{
				return(
					<section key={index} className="day">
					<h4>{moment(day[0].date).format('ddd Do')}</h4>
					<ul>
					{day.map((absence, index)=>{
						if(absence.title){
							return(
								<li className="pholiday" key={index} onClick={()=>{this.props.absenceClick({
							userid:1,
							date:absence.date,
							unit:absence.unit,
							value:"P"
						})}}>
								{absence.title}
								</li>
								)
						}
						else if(absence.userid === this.props.userID){
							return(
								<li className="user" key={index} onClick={()=>{this.props.absenceClick({
							userid:absence.userid,
							date:absence.date,
							unit:absence.unit,
							value:absence.value
						})}}>
								{absence.name} {absence.unit} {absence.value}
								</li>
								)}
						else{
							return(
								<li key={index}>
								{absence.name} {absence.unit} {absence.value}
								</li>
								)}
						})}
					</ul>
					</section>
					)
			})}
	}

	render(){
		return(
			<section id="absentee-render">
			{this.absenteeRender()}
			</section>
			)
	}
}

export default MonthView;