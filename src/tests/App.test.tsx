import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from '../containers/App';

Enzyme.configure({ adapter: new Adapter() });

describe('<App /> specification.', () => {
    it('Render without crashing', () => {
        // @ts-ignore
        fetch.resetMocks();
        // @ts-ignore
        fetch.mockResponse(JSON.stringify({ rates: { IDR: 100.55 } }));

        const div = document.createElement('div');
        render(<App />, div);
        setTimeout(() => {
            unmountComponentAtNode(div);
        }, 2000);
    });

    it('Is `div` component with `container` class', () => {
        const app = shallow(<App />);
        expect(app.is('div.container')).toBe(true);
    });

    it('Has `Header` component', () => {
        const app = shallow(<App />);
        expect(app.find('Header').exists()).toBe(true);
    });

    it('Has `Content` component', () => {
        const app = shallow(<App />);
        expect(app.find('Content').exists()).toBe(true);
    });

    it('Default State', () => {
        const app = shallow(<App />);
        expect((app.state() as any).amount).toBe(1);
    });

    it('State will be change to 0', () => {
        const app = shallow(<App />);
        (app.instance() as any).setAmount({ target: { value: '' } });
        expect(app.state('amount')).toBe(0);
    });

    it('State will be change to 10', () => {
        const app = shallow(<App />);
        (app.instance() as any).setAmount({ target: { value: '10' } });
        expect(app.state('amount')).toBe(10);
    });

    it('State will be change twice', () => {
        const app = shallow(<App />);
        (app.instance() as any).setAmount({ target: { value: '10.05' } });
        expect(app.state('amount')).toBe(10.05);
        (app.instance() as any).setAmount({ target: { value: '50.55' } });
        expect(app.state('amount')).toBe(50.55);
    });
});
