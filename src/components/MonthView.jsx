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
								<li key={index} onClick={()=>{this.props.absenceClick({
							userid:1,
							date:absence.date,
							unit:absence.unit,
							value:"P"
						})}}>
								{absence.title}
								</li>
								)
						}
						else{
							return(
								<li key={index} onClick={()=>{this.props.absenceClick({
							userid:absence.userid,
							date:absence.date,
							unit:absence.unit,
							value:absence.value
						})}}>
								{absence.name} {absence.unit} {absence.value}
								</li>
								)}
						})}
					</ul>
					</section>
					)
			})}

		// if(dates.length > 0){
		// 	return dates.map((absentee, index) => {
		// 		if(absentee.title && currentDay !== absentee.date){
		// 			currentDay = absentee.date;
		// 			return(
		// 				<article onClick={()=>{this.props.absenceClick({
		// 					userid:absentee.userid,
		// 					date:currentDay,
		// 					unit:absentee.unit,
		// 					value:absentee.value
		// 				})}}
		// 				key={index} 
		// 				className="absence">
		// 				<h4>{moment(currentDay).format('ddd Do')}</h4>
		// 				<li>{absentee.title + " Public Holiday"}</li>
		// 				</article>
		// 				)
		// 		}
		// 		else if(currentDay !== absentee.date){
		// 			currentDay = absentee.date;
		// 			return(
		// 				<article onClick={()=>{this.props.absenceClick({
		// 					userid:absentee.userid,
		// 					date:currentDay,
		// 					unit:absentee.unit,
		// 					value:absentee.value
		// 				})}}
		// 				key={index} 
		// 				className="absence">
		// 				<h4>{moment(currentDay).format('ddd Do')}</h4>
		// 				<li>{absentee.name} {absentee.unit} {absentee.value}</li>
		// 				</article>
		// 				)
		// 		}
		// 		else{
		// 			return(
		// 				<article onClick={()=>{this.props.absenceClick({
		// 					userid:absentee.userid,
		// 					date:currentDay,
		// 					unit:absentee.unit,
		// 					value:absentee.value
		// 				})}}
		// 				key={index} 
		// 				className="absence">
		// 				<li>{absentee.name} {absentee.unit} {absentee.value}</li>
		// 				</article>
		// 				)
		// 		}
		// 	})
		// }
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