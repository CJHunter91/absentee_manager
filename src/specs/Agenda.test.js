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

it('gets absentee objects for a given month', () =>{
	const testData = cal.instance().getAbsenteeDates(moment('2017-11-03'));
	expect(testData.length).toBe(24)
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

it('can find a specific absence',()=>{
	const absenceData = {
   		"userid": 1,
   		"name": "Matthew Webb",
   		"date": "2016-12-30",
   		"unit": "PM",
   		"value": "P"
			}
	const absence = cal.instance().findAbsence(data, absenceData);
	expect(absence).toEqual(absenceData)
})

const data = [{
   "userid": 1,
   "name": "Matthew Webb",
   "date": "2016-12-29",
   "unit": "AM",
   "value": "P"
 },
 {
   "userid": 1,
   "name": "Matthew Webb",
   "date": "2016-12-29",
   "unit": "PM",
   "value": "P"
 },
 {
   "userid": 1,
   "name": "Matthew Webb",
   "date": "2016-12-30",
   "unit": "AM",
   "value": "P"
 },
 {
   "userid": 1,
   "name": "Matthew Webb",
   "date": "2016-12-30",
   "unit": "PM",
   "value": "P"
 },
 {
   "userid": 2,
   "name": "Thomas William Burgess",
   "date": "2017-04-10",
   "unit": "AM",
   "value": "P"
 },
 {
   "userid": 2,
   "name": "Thomas William Burgess",
   "date": "2017-05-08",
   "unit": "PM",
   "value": "P"
 }]