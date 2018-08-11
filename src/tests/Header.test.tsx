import React, { ChangeEvent } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

import Header from '../components/Header';

Enzyme.configure({ adapter: new Adapter() });

// tslint:disable-next-line:no-empty
const noop = (_: ChangeEvent<HTMLInputElement>) => {};

const headerProps = { handleInputChange: noop };

describe('<Header /> specification.', () => {
    it('Render without crashing', () => {
        const div = document.createElement('div');
        render(<Header {...headerProps} />, div);
        unmountComponentAtNode(div);
    });

    it('Is `div` component with `row` class', () => {
        const header = shallow(<Header {...headerProps} />);
        expect(header.is('div.row')).toBe(true);
    });

    it('Has `div` component with `col` class', () => {
        const header = shallow(<Header {...headerProps} />);
        expect(header.find('div.col').exists()).toBe(true);
    });

    it('Has `CurrencyTitle` component', () => {
        const header = shallow(<Header {...headerProps} />);
        expect(header.find('CurrencyTitle').exists()).toBe(true);
    });

    it('`CurrencyTitle` title props', () => {
        const header = shallow(<Header {...headerProps} />);
        expect(header.find('CurrencyTitle').props().title).toBe('USD - United States Dollars');
        expect(header.find('CurrencyTitle').shallow().is('p')).toBe(true);
        expect(header.find('CurrencyTitle').shallow().find('p').text()).toBe('USD - United States Dollars');
    });

    it('`USD` in HTML', () => {
        const header = shallow(<Header {...headerProps} />);
        const usdLabelClass = header.find('.input-group-prepend .input-group-text');
        expect(usdLabelClass.length).toBe(1);
        expect(usdLabelClass.text()).toBe('USD');
    });

    it('Value in input is 1', () => {
        const header = shallow(<Header {...headerProps} />);
        expect(header.find('#amountUsd').render().val()).toBe('1');
    });

    it('Changing the value of input', () => {
        const handleInputChange = sinon.spy();
        const header = mount(<Header handleInputChange={handleInputChange} />);
        const input = header.find('#amountUsd');
        input.simulate('change', { target: { value: '20' } });
        expect(handleInputChange.callCount).toBe(1);
    });
});
