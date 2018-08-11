import React, { Component, ChangeEvent } from 'react';
import PropTypes from 'prop-types';
import 'whatwg-fetch';

import ContentCard from '../components/ContentCard';
import AddNewCurrency from '../components/AddNewCurrency';

import { IHash, IApiResponse } from '../utils/interfaces';
import { CURRENCY_LIST, HASH_MAP_CURRENCY_NAME } from '../utils/constants';

/**
 * Property of the Content Component. 
 *
 * @interface IContentProps
 */
interface IContentProps {
    /**
     * Receive amount in USD for computation in another currency.
     *
     * @type {number}
     * @memberof IContentProps
     */
    amount: number;
};

/**
 * State of Header Component.
 *
 * @interface IContentState
 */
interface IContentState {
    /**
     * State when button and select form is selected based on isAdding state.
     * Default value is false.
     *
     * @type {boolean}
     * @memberof IContentState
     */
    isAdding: boolean;
    /**
     * List of selected currency want to trade with USD.
     * Default value is ['IDR'].
     *
     * @type {string[]}
     * @memberof IContentState
     */
    listCurrency: string[];
    /**
     * Hash map from API for list available currencies in 1 USD.
     * Eg: `{ IDR: 15000.00, JPN: 100.00, ... }`
     *
     * @type {IHash<number>}
     * @memberof IContentState
     */
    mapCurrency: IHash<number>;
    /**
     * The selected currency will be added into selected currency
     * list when isAdding is `true`.
     *
     * @type {string}
     * @memberof IContentState
     */
    selectedCurrency: string;
};

class Content extends Component<IContentProps, IContentState> {
    public static propTypes = {
        amount: PropTypes.number.isRequired,
    };

    public state: IContentState = {
        isAdding: false,
        listCurrency: ['IDR'],
        mapCurrency: {},
        selectedCurrency: ''
    };

    public componentDidMount() {
        this.fetchApi();
    }

    public render() {
        const { isAdding, selectedCurrency, mapCurrency, listCurrency } = this.state;
        const { amount } = this.props;

        /**
         * Filtering available currency from currency list. 
         * It will not show the selected currency in the select form.
         */
        const availableCurrency = CURRENCY_LIST.filter(currency => 
            listCurrency.indexOf(currency) === -1);

        return (
            <div className="row">
                <div className="col">
                    {/* Looping each of selected currency */}
                    {listCurrency.map(currency => (
                        <ContentCard
                            key={`card-${currency}`}
                            code={currency}
                            name={HASH_MAP_CURRENCY_NAME[currency]}
                            rate={mapCurrency[currency] || 0}
                            amount={amount}
                            handleDelete={this.handleDelete(currency)}
                        />
                    ))}
                    <AddNewCurrency
                        isAdding={isAdding}
                        selectedCurrency={selectedCurrency}
                        listCurrency={availableCurrency}
                        handleSubmit={this.handleSubmit}
                        handleSelectChange={this.handleSelectChange}
                        handleAddClick={this.handleAddClick}
                    />
                </div>
            </div>
        );
    }

    /**
     * This function will retrieve current currencies with base USD.
     * It will return object {IApiResponse}, if API success to called.
     * Otherwise, it will called the window.alert for error occured.
     *
     * @private
     * @returns {Promise<void>}
     * @memberof Content
     */
    private async fetchApi(): Promise<void> {
        try {
            const response = await fetch('https://exchangeratesapi.io/api/latest?base=USD');
            const data: IApiResponse = await response.json();

            if (!data.rates) {
                throw new Error('Invalid Response.');
            }

            this.setState((oldState) => {
                return {
                    ...oldState,
                    mapCurrency: data.rates
                };
            });
        } catch (e) {
            alert('Something error happened. Please try again later.');
        }
    }

    /**
     * Handling an event when add button is clicked.
     * Change the isAdding state to `true`.
     * And make it render a select form instead a button.
     *
     * @private
     * @memberof Content
     */
    private handleAddClick = (): void => {
        this.setState((oldState) => {
            return {
                ...oldState,
                isAdding: true,
            }
        });
    }

    /**
     * Handling an event when select form is changed.
     * It will set the selectedCurrency state before adding it to
     * listCurrency state.
     *
     * @private
     * @memberof Content
     */
    private handleSelectChange = (e: ChangeEvent<HTMLSelectElement>): void => {
        const selectedCurrency = e.target.value;

        this.setState((oldState) => {
            return {
                ...oldState,
                selectedCurrency
            }
        });
    }

    /**
     * Handling an event when submit button is clicked.
     * When select value is empty, it will alert to select the currency.
     * Otherwise it will add to the listCurrency state,
     * make select value empty, hide the form and show add button.
     *
     * @private
     * @memberof Content
     */
    private handleSubmit = (): void => {
        const { listCurrency, selectedCurrency } = this.state;
        
        if (selectedCurrency === '') {
            alert('Please select the currency.');
            return;
        }
        
        listCurrency.push(selectedCurrency);

        this.setState((oldState) => {
            return {
                ...oldState,
                isAdding: false,
                listCurrency,
                selectedCurrency: '',
            }
        });
    }

    /**
     * Handling an event when delete button/icon is clicked.
     * This will refresh the listCurrency and delete the selected
     * currency by currency code.
     *
     * @private
     * @memberof Content
     */
    private handleDelete = (currencyCode: string) => {
        const listCurrency = this.state.listCurrency.filter(
            currency => currency !== currencyCode);

        return (): void => {
            this.setState((oldState) => {
                return {
                    ...oldState,
                    listCurrency
                }
            })
        }
    }
}

export default Content;