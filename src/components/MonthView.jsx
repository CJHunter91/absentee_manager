import React, { Component } from 'react';
import moment from 'moment';



class MonthView extends Component{

	splitDays(){
		var dayArray = []
		const dates = this.props.getAbsenteeDates(this.props.date).slice(0)
		if(dates.length > 0){
			console.log(dates)
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
					dayArray.push(this.combineUnits(tempArray))
					tempArray = [];
					tempArray.push(absentee);
				}

				else if(dates.length === index+1){
					tempArray.push(absentee);
					dayArray.push(this.combineUnits(tempArray))
				}
				else{
					tempArray.push(absentee);
				}
			})
			console.log(dayArray)
			return dayArray
		}
	}

	combineUnits(day){
		if(day.length <= 1){
			return day
		}
		const sorted = day.sort(function(a,b){
			if(a.name && b.name){
			return a.name.localeCompare(b.name);
		}
		})
		var currentAbsence = null
		var newArray = [];
		for(let absentee of day){
			if(absentee.title){
				newArray.unshift(absentee);	
			}
			else if(currentAbsence === null){
				currentAbsence = absentee
			}
			else if(absentee.name !== currentAbsence.name){
				newArray.push(currentAbsence);
				newArray.push(absentee);
				currentAbsence = null;
			}
			else if(absentee.name === currentAbsence.name
				&& absentee.value === currentAbsence.value){
				const newAbsence = Object.assign({},absentee)
				newAbsence.unit = "ALL"
				newArray.push(newAbsence);
				currentAbsence = null;
			}

		}
		return newArray;
	}

	absenteeRender(){
		const dayArrays = this.splitDays()
		console.log(dayArrays)
		if(dayArrays !== undefined){
			return dayArrays.map((day, index)=>{
				return(
					<section key={index} className="day">
					<h3>{moment(day[0].date).format('ddd Do')}</h3>
					<table>
					<tbody>
					{day.map((absence, index)=>{
						if(absence.title){
							return(
								<tr className="pholiday" key={index} onClick={()=>{this.props.absenceClick({
							userid:1,
							date:absence.date,
							unit:absence.unit,
							value:"P"
						})}}>
								<td>
								{absence.title}
								</td>
								</tr>
								)
						}
						else if(absence.userid === this.props.userID){
							return(
								<tr className="user" key={index} onClick={()=>{this.props.absenceClick({
							userid:absence.userid,
							date:absence.date,
							unit:absence.unit,
							value:absence.value
						})}}>
								<td>{absence.name}</td>
								<td>{absence.unit}</td>
								<td>{absence.value}</td>
								</tr>
								)}
						else{
							return(
								<tr key={index}>
								<td>{absence.name}</td>
								<td>{absence.unit}</td>
								<td>{absence.value}</td>
								</tr>
								)}
						})}
					</tbody>
					</table>
					</section>
					)
			})}
	}

	render(){
		return(
			<section className="absentee-render">
			{this.absenteeRender() ? this.absenteeRender() : <p>No absences this month</p>}
			</section>
			)
	}
}

export default MonthView;