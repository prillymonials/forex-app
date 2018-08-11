import React, { ChangeEvent } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

import ContentCard from '../components/ContentCard';

Enzyme.configure({ adapter: new Adapter() });

// tslint:disable-next-line:no-empty
const noop = () => {};

const contentCardProps = {
    amount: 1,
    code: 'IDR', 
    handleDelete: noop,
    name: 'Indonesian Rupiah', 
    rate: 15000, 
}

describe('<ContentCard /> specification.', () => {
    it('Render without crashing', () => {
        const div = document.createElement('div');
        render(<ContentCard {...contentCardProps} />, div);
        unmountComponentAtNode(div);
    });

    it('`Rate Total` class', () => {
        const contentCard = shallow(<ContentCard {...contentCardProps} />);
        const rateTotal = contentCard.find('.rate-total h2');
        expect(rateTotal.at(0).text()).toBe('IDR');
        expect(rateTotal.at(1).text()).toBe('15,000');
    });

    
    it('`Rate Total` computation', () => {
        const propsOne = { ...contentCardProps, amount: 2.5, rate: 15.05 };
        const propsTwo = { ...contentCardProps, amount: 50.2, rate: 298.2217 };
        const propsThree = { ...contentCardProps, amount: 100, rate: 198229.22997788};

        const contentCard = shallow(<ContentCard {...contentCardProps} />);

        const rateTotalOne = contentCard.setProps(propsOne).find('.rate-total h2');
        expect(rateTotalOne.at(1).text()).toBe('37.625');

        const rateTotalTwo = contentCard.setProps(propsTwo).find('.rate-total h2');
        expect(rateTotalTwo.at(1).text()).toBe('14,970.729');

        const rateTotalThree = contentCard.setProps(propsThree).find('.rate-total h2');
        expect(rateTotalThree.at(1).text()).toBe('19,822,922.998');
    });

    it(`Information about 1 USD`, () => {
        const propsOne = { ...contentCardProps, amount: 2.5, rate: 15.05 };
        const propsTwo = { ...contentCardProps, amount: 50.2, rate: 6298.2212 };
        const propsThree = { ...contentCardProps, amount: 100, rate: 3198229.22997788};
        const propsFour = { ...contentCardProps, amount: 100, rate: 1999.9999};

        const contentCard = shallow(<ContentCard {...contentCardProps} />);

        const infoOne = contentCard.setProps(propsOne).find('small');
        expect(infoOne.text()).toBe('1 USD = IDR 15.05');

        const infoTwo = contentCard.setProps(propsTwo).find('small');
        expect(infoTwo.text()).toBe('1 USD = IDR 6,298.221');

        const infoThree = contentCard.setProps(propsThree).find('small');
        expect(infoThree.text()).toBe('1 USD = IDR 3,198,229.23');

        const infoFour = contentCard.setProps(propsFour).find('small');
        expect(infoFour.text()).toBe('1 USD = IDR 2,000');
    });

    it('Spy on delete clicked', () => {
        const handleDelete = sinon.spy();
        const newProps = { ...contentCardProps, handleDelete };

        const contentCard = shallow(<ContentCard {...newProps} />);
        const deleteIcon = contentCard.find('#deleteIcon');
        deleteIcon.simulate('click');

        expect(handleDelete.callCount).toBe(1);
    });
});