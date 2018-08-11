import React, { SFC } from 'react';
import PropTypes from 'prop-types';

import CurrencyTitle from './CurrencyTitle';

import './ContentCard.scss';

/**
 * Property of Content Card Stateless Component.
 *
 * @interface IContentCardProps
 */
interface IContentCardProps {
    /**
     * The code of the currency.
     *
     * @type {string}
     * @memberof IContentCardProps
     */
    code: string;
    /**
     * The name of currency based on the code currency.
     *
     * @type {string}
     * @memberof IContentCardProps
     */
    name: string;
    /**
     * Rate of 1 USD to the converted currency.
     * Eg: 1 USD = **15.000** IDR.
     *
     * @type {number}
     * @memberof IContentCardProps
     */
    rate: number;
    /**
     * Amount of USD will be trade to the current currency.
     *
     * @type {number}
     * @memberof IContentCardProps
     */
    amount: number;
    /**
     * Handle an event when delete button/icon is clicked.
     * 
     * @type {function}
     * @memberof IContentCardProps
     */
    handleDelete: () => void;
};

/**
 * Content Card Stateless Component.
 * The information about current currency will be trade from USD currency.
 * The card can be deleted when delete button/icon is clicked.
 */
const ContentCard: SFC<IContentCardProps> = ({ code, name, rate, amount, handleDelete }) => {
    return (
        <div className="card mt-3">
            <div className="card-body">
                <div className="d-flex align-items-stretch">
                    <div className="flex-grow-1">
                        {/* Compute the amount in current currency. Precision in 3 decimal place. */}
                        <div className="rate-total">
                            <h2>{code}</h2>
                            <h2 className="float-right">{(rate * amount).toLocaleString()}</h2>
                        </div>
                        <CurrencyTitle title={`${code} - ${name}`} />
                        {/* Information about 1 USD to current currency. Precision in 3 decimal place. */}
                        <small>1 USD = {code} {rate.toLocaleString()}</small>
                    </div>
                    {/* Delete button/icon */}
                    <div className="rate-delete align-self-center">
                        <i className="fa fa-times-circle" id="deleteIcon" onClick={handleDelete} />
                    </div>
                </div>
            </div>
        </div>
    );
}

ContentCard.propTypes = {
    amount: PropTypes.number.isRequired,
    code: PropTypes.string.isRequired,
    handleDelete: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    rate: PropTypes.number.isRequired,
};

export default ContentCard;