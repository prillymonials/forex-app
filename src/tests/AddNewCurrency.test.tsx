import React, { ChangeEvent } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

import AddNewCurrency from '../components/AddNewCurrency';
import { CURRENCY_LIST } from '../utils/constants';

Enzyme.configure({ adapter: new Adapter() });

// tslint:disable-next-line:no-empty
const noop = (e?: any) => {};

const addNewCurrencyProps = {
    handleAddClick: noop,
    handleSelectChange: noop,
    handleSubmit: noop,
    isAdding: false,
    listCurrency: CURRENCY_LIST, 
    selectedCurrency: '',
};

describe('<AddNewCurrency /> specification.', () => {
    it('Render without crashing', () => {
        const div = document.createElement('div');
        render(<AddNewCurrency {...addNewCurrencyProps} />, div);
        unmountComponentAtNode(div);
    });

    it('Render Add button only', () => {
        const addNewCurrency = shallow(<AddNewCurrency {...addNewCurrencyProps} />);
        expect(addNewCurrency.find('#btnAdd').exists()).toBe(true);
        expect(addNewCurrency.find('select').exists()).toBe(false);
    });

    it('Render Add form only', () => {
        const newProps = { ...addNewCurrencyProps, isAdding: true };
        const addNewCurrency = shallow(<AddNewCurrency {...newProps} />);
        expect(addNewCurrency.find('#btnAdd').exists()).toBe(false);
        expect(addNewCurrency.find('select').exists()).toBe(true);
    });

    it('Total option in select', () => {
        const newProps = { ...addNewCurrencyProps, isAdding: true, listCurrency: [
            'IDR', 'SGD', 'INR', 'JPY'
        ] };
        const addNewCurrency = shallow(<AddNewCurrency {...newProps} />);
        expect(addNewCurrency.find('option').length).toBe(5);
    });

    it('Add button clicked', () => {
        const handleAddClick = sinon.spy();
        const newProps = { ...addNewCurrencyProps, handleAddClick };
        const addNewCurrency = shallow(<AddNewCurrency {...newProps} />);
        const btnAdd = addNewCurrency.find('#btnAdd');
        btnAdd.simulate('click');
        expect(handleAddClick.callCount).toBe(1);
    })

    it('Submit button clicked', () => {
        const handleSubmit = sinon.spy();
        const newProps = { ...addNewCurrencyProps, isAdding: true, handleSubmit };
        const addNewCurrency = shallow(<AddNewCurrency {...newProps} />);
        const btnSubmit = addNewCurrency.find('#btnSubmit');
        btnSubmit.simulate('click');
        expect(handleSubmit.callCount).toBe(1);
    });

    it('Select form changed', () => {
        const handleSelectChange = sinon.spy();
        const newProps = { ...addNewCurrencyProps, isAdding: true, handleSelectChange };
        const addNewCurrency = shallow(<AddNewCurrency {...newProps} />);
        const select = addNewCurrency.find('select');
        select.simulate('change', { target: { value: 'SGD' } });
        expect(handleSelectChange.callCount).toBe(1);
    })
});