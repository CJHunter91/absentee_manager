import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import moment from 'moment';
import Agenda from '../containers/Agenda';
Enzyme.configure({ adapter: new Adapter() });

var cal;

beforeEach(() =>{
	cal = shallow(<Agenda />);
})

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Agenda />, div);
});

it('gets todays date', ()=>{
	const date = cal.instance().getTodaysDate();
	const newDate = new Date()
	const month = newDate.getMonth()+1;
	const year = newDate.getFullYear();
	const day = newDate.getDate();
	expect(date.format('YYYY[-]MM[-]D')).toBe(`${year}-${month}-${day}`);
})

it('gets the next day', () =>{
	const date = cal.instance().getTodaysDate();
	const nextDate = new Date(Date.parse(date));
	nextDate.setDate(nextDate.getDate() + 1)
	const month = nextDate.getMonth()+1;
	const year = nextDate.getFullYear();
	const day = nextDate.getDate();
	expect(cal.instance().getNextDate(date).format('YYYY[-]MM[-]D')).toBe(`${year}-${month}-${day}`);
})

it('gets absentee objects for a given month', () =>{
	const data = cal.instance().getAbsenteeDates(moment('2017-11-03'));
	expect(data.length).toBe(24)
})

it('sorts the absentee dates into chronological order', ()=>{
	const sampleData = [
 {"date": "2016-12-30"},
 {"date": "2016-12-28"},
 {"date": "2016-12-14"},
 {"date": "2016-12-29"}];
 	const expectedData = [ 
 { "date": '2016-12-14' },
 { "date": '2016-12-28' },
 { "date": '2016-12-29' },
 { "date": '2016-12-30' } ]
 	const sorted = cal.instance().sortAbsenteeDates(sampleData)
	expect(sorted).toEqual(expectedData)
})
