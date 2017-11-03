import React, { Component } from 'react';
import moment from 'moment';



class DateView extends Component{


absenteeRender(){
	const dates = this.props.getAbsenteeDates(this.props.date)
	console.log(dates)
	if(dates.length > 0){
		return dates.map((absentee) => {
			return(
				<h3>{absentee.date}</h3>
				)
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