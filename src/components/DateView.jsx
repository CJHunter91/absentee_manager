import React, { Component } from 'react';



class DateView extends Component{


absenteeRender(){
	const dates = this.props.getAbsenteeDates(this.props.date)
	if(dates.length > 0){
		return dates.map((absentee, index) => {
			return(
				<article key={index} id="absence">
				<h3>{absentee.date}</h3>
				</article>
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