import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import App from '../containers/App';

import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

it('shallow render', () => {
    shallow(<App />);
});

it('render without crashing', () => {
    const div = document.createElement('div');
    render(<App />, div);
    unmountComponentAtNode(div);
});