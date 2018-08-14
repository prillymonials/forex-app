import React, { SFC, ChangeEvent } from 'react';
import PropTypes from 'prop-types';

import CurrencyTitle from '../components/CurrencyTitle';

import { 
    BASE_CURRENCY, 
    HASH_MAP_CURRENCY_NAME, 
    INITIAL_CURRENCY_AMOUNT,
} from '../utils/constants';

/**
 * Property of the Header Stateless Component.
 *
 * @interface IHeaderProps
 */
interface IHeaderProps {
    /**
     * This function is for setting USD amount on parent containers.
     * The amount will be throw to the `Content` Component for computation.
     * 
     * @type {function}
     * @memberof IHeaderProps
     */
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Header Stateless Component.
 * It will be put in the top of the page.
 * This component contains the amount of base currency will be trade.
 */
const Header: SFC<IHeaderProps> = ({ handleInputChange }) => {
    return (
        <div className="row">
            <div className="col">
                {/* Currency Title, it will show `USD - United States Dollar`. */}
                <CurrencyTitle title={`${BASE_CURRENCY} - ${HASH_MAP_CURRENCY_NAME[BASE_CURRENCY]}`} />
                <div className="row">
                    <div className="col">
                        {/* Input group for amount USD currency. */}
                        <div className="input-group mb-3">
                            {/* This span will be put in left of input. */}
                            <div className="input-group-prepend">
                                <span className="input-group-text" id={BASE_CURRENCY}>{BASE_CURRENCY}</span>
                            </div>
                            <input
                                id="amountUsd"
                                type="number"
                                className="form-control text-right" 
                                placeholder="Amount"
                                min={0}
                                defaultValue={INITIAL_CURRENCY_AMOUNT.toString()}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Header.propTypes = {
    handleInputChange: PropTypes.func.isRequired,
};

export default Header;

