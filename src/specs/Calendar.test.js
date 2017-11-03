import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Calendar from '../containers/Calendar';

Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Calendar />, div);
});

it('gets todays date', ()=>{
	const cal = shallow(<Calendar />);
	const date = cal.instance().getTodaysDate();
	const newDate = new Date()
	const month = newDate.getMonth()+1;
	const year = newDate.getFullYear();
	const day = newDate.getDate();
	expect(date).toBe(`${year}-${month}-${day}`);
})