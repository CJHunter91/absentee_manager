import React, { Component } from 'react';
import moment from 'moment';



class DateView extends Component{


monthRender(){
	const endOfMonth = moment(this.props.date).endOf('month');
	const startOfMonth = moment(this.props.date).startOf('month')
	var monthArray = []
	for(let date = startOfMonth; date.isBefore(endOfMonth); date.add(1, 'days')){
		monthArray.push(<h5>{date.format('D')}</h5>)
	}
	return monthArray;
}

render(){
	return(
		<article>
		{this.monthRender()}
		</article>
		)
	}
}

export default DateView;