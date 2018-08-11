import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Content from '../containers/Content';

Enzyme.configure({ adapter: new Adapter() });

const contentProps = { amount: 1 };

describe('<Content /> specification.', () => {
    beforeEach(() => {
        // @ts-ignore
        fetch.resetMocks();
    });

    it('Render without crashing', () => {
        // @ts-ignore
        fetch.mockResponse(JSON.stringify({ rates: { IDR: 100.55 } }));

        const div = document.createElement('div');
        render(<Content {...contentProps} />, div);
        setTimeout(() => {
            unmountComponentAtNode(div);
        }, 2000);
    });
    
    it('Has `ContentCard` component', () => {
        const content = shallow(<Content {...contentProps} />);
        expect(content.find('ContentCard').exists()).toBe(true);
    });
    
    it('Has `AddNewCurrency` component', () => {
        const content = shallow(<Content {...contentProps} />);
        expect(content.find('AddNewCurrency').exists()).toBe(true);
    });

    it('Has button in `AddNewCurrency` component', () => {
        const content = shallow(<Content {...contentProps} />);
        const addNewCurrency = content.find('AddNewCurrency');
        expect(addNewCurrency.shallow().find('#btnAdd').exists()).toBe(true);
    });

    it('Has select form in `AddNewCurrency` component', () => {
        const content = shallow(<Content {...contentProps} />);
        (content.instance() as any).handleAddClick();
        const addNewCurrency = content.find('AddNewCurrency');
        expect(addNewCurrency.shallow().find('select').exists()).toBe(true);
    });

    it('Success test API', async () => {
        // @ts-ignore
        fetch.mockResponse(JSON.stringify({ rates: { IDR: 100.55 } }));

        const content = shallow(<Content {...contentProps} />);
        await (content.instance() as any).fetchApi();
        expect(content.state('mapCurrency')).not.toEqual({});
    });

    it('Failed to hit API, not found response', async () => {
        // @ts-ignore
        fetch.mockResponse('Not Found', { status: 404 });

        const content = shallow(<Content {...contentProps} />);
        await (content.instance() as any).fetchApi();
        expect(content.state('mapCurrency')).toEqual({});
    });

    it('Failed to hit API, javascript error', async () => {
        // @ts-ignore
        fetch.mockResponse(new Error('Javascript Error.'));

        const content = shallow(<Content {...contentProps} />);
        await (content.instance() as any).fetchApi();
        expect(content.state('mapCurrency')).toEqual({});
    });

    it('Failed to hit API, invalid API response.', async () => {
        // @ts-ignore
        fetch.mockResponse(
            JSON.stringify({ message: 'Authorization is needed.' }), { status: 401 });

        const content = shallow(<Content {...contentProps} />);
        await (content.instance() as any).fetchApi();
        expect(content.state('mapCurrency')).toEqual({});
    });

    it('Total Card is same with the state', () => {
        const content = shallow(<Content {...contentProps} />);
        content.setState({ listCurrency: ['IDR', 'SGD', 'JPY'] });
        expect(content.find('ContentCard').length).toBe(3);
    });

    it('When function adding button is running', () => {
        const content = shallow(<Content {...contentProps} />);
        expect(content.state('isAdding')).toBe(false);
        (content.instance() as any).handleAddClick();
        expect(content.state('isAdding')).toBe(true);
    });

    it('When function select change is running', () => {
        const content = shallow(<Content {...contentProps} />);
        expect(content.state('selectedCurrency')).toBe('');
        (content.instance() as any).handleSelectChange({ target: { value: 'SGD' } });
        expect(content.state('selectedCurrency')).toBe('SGD');
    });

    it('When function submit is running, but not selected', () => {
        const content = shallow(<Content {...contentProps} />);
        expect(content.state('selectedCurrency')).toBe('');
        (content.instance() as any).handleAddClick();
        (content.instance() as any).handleSubmit();
        expect(content.state()).toEqual({
            isAdding: true,
            listCurrency: ['IDR'],
            mapCurrency: {},
            selectedCurrency: '',
        })
    });

    it('When function submit is running, but selected', () => {
        const content = shallow(<Content {...contentProps} />);
        expect(content.state('selectedCurrency')).toBe('');
        (content.instance() as any).handleAddClick();
        (content.instance() as any).handleSelectChange({ target: { value: 'SGD' } });
        (content.instance() as any).handleSubmit();
        expect(content.state()).toEqual({
            isAdding: false,
            listCurrency: ['IDR', 'SGD'],
            mapCurrency: {},
            selectedCurrency: '',
        })
    });

    it('When delete function is running, but delete nothing', () => {
        const content = shallow(<Content {...contentProps} />);
        expect(content.state('listCurrency')).toEqual(['IDR']);
        content.setState({ listCurrency: ['IDR', 'SGD', 'JPY'] });
        (content.instance() as any).handleDelete('INR')();
        expect((content.state('listCurrency') as any).length).toBe(3);
    });

    it('When delete function is running, but delete something', () => {
        const content = shallow(<Content {...contentProps} />);
        expect(content.state('listCurrency')).toEqual(['IDR']);
        content.setState({ listCurrency: ['IDR', 'SGD', 'JPY'] });
        (content.instance() as any).handleDelete('SGD')();
        expect((content.state('listCurrency') as any).length).toBe(2);
    });
});
