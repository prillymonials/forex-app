import React, { SFC, ChangeEvent } from 'react';
import PropTypes from 'prop-types';

/**
 * Property of Add New Currency Stateless Component.
 *
 * @interface IAddNewCurrencyProps
 */
interface IAddNewCurrencyProps {
    /**
     * A flag for a button or select form will be shown in
     * this component.
     *
     * @type {boolean}
     * @memberof IAddNewCurrencyProps
     */
    isAdding: boolean;
    /**
     * List of available currency for trading.
     * It cannot be duplicated from the selected list
     * since validation is handled in parent.
     *
     * @type {string[]}
     * @memberof IAddNewCurrencyProps
     */
    listCurrency: string[]; 
    /**
     * The selected currency state from select form 
     * when `isAdding` is true.
     *
     * @type {string}
     * @memberof IAddNewCurrencyProps
     */
    selectedCurrency: string;
    /**
     * Handling an event when submit button is clicked.
     * It will insert the selected form to list selected currency.
     * 
     * @type {function}
     * @memberof IAddNewCurrencyProps
     */
    handleSubmit: () => void;
    /**
     * Handling an event when select form is change.
     * It will be called when `isAdding` is true.
     * 
     * @type {function}
     * @memberof IAddNewCurrencyProps
     */
    handleSelectChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    /**
     * Handling an event when add button is click.
     * It will change view from the add button to select form.
     * 
     * @type {function}
     * @memberof IAddNewCurrencyProps
     */
    handleAddClick: () => void;
}

const AddNewCurrency: SFC<IAddNewCurrencyProps> = (
    { isAdding, listCurrency, selectedCurrency, handleSubmit, handleSelectChange, handleAddClick }
) => {
    return (
        <div className="row mt-3">
            <div className="col">
                {/* Validating is add button or select form will be shown. */}
                {!isAdding ? (
                    <button 
                        className="btn btn-primary w-100"
                        onClick={handleAddClick}
                        id="btnAdd"
                    >
                        <i className="fa fa-plus" /> Add New Currency
                    </button>
                ) : (
                    <div className="input-group mb-3">
                        <select 
                            value={selectedCurrency} 
                            onChange={handleSelectChange} 
                            className="form-control"
                        >
                            {/* Placeholder for the select form. Throw error if it selected */}
                            <option value="">-- Please Select --</option>
                            {/* Loop of each of currency */}
                            {listCurrency.map(currency => (
                                <option key={currency} value={currency}>{currency}</option>
                            ))}
                        </select>
                        {/* This button will be shown in the right of the select form.*/}
                        <div className="input-group-append">
                            <button 
                                className="btn btn-success" 
                                type="button" 
                                onClick={handleSubmit}
                                id="btnSubmit"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

AddNewCurrency.propTypes = {
    handleAddClick: PropTypes.func.isRequired,
    handleSelectChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isAdding: PropTypes.bool.isRequired,
    listCurrency: PropTypes.array.isRequired,
    selectedCurrency: PropTypes.string.isRequired,
};

export default AddNewCurrency;