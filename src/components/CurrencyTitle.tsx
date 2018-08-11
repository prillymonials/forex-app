import React, { SFC } from 'react';
import PropTypes from 'prop-types';

import './CurrencyTitle.scss';

/**
 * Property of Currency Title Stateless Component.
 *
 * @interface ICurrencyTitleProps
 */
interface ICurrencyTitleProps {
    /**
     * A string will be put inside of `p` tag.
     *
     * @type {string}
     * @memberof ICurrencyTitleProps
     */
    title: string;
};

/**
 * Currency Title Stateless Component.
 * It will print the string wrapped in `p` tag.
 */
const CurrencyTitle: SFC<ICurrencyTitleProps> = ({ title }) => {
    return (
        <p className="rate-title">{title}</p>
    );
}

CurrencyTitle.propTypes = {
    title: PropTypes.string.isRequired
};

export default CurrencyTitle;