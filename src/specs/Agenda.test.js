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
