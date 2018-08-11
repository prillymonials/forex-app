import React, { Component, ChangeEvent } from 'react';

import './App.scss';

import Header from '../components/Header';
import Content from './Content';
import { INITIAL_CURRENCY_AMOUNT } from '../utils/constants';

/**
 * State of Application Component.
 *
 * @interface IAppState
 */
interface IAppState {
    /**
     * Amount of USD want to be exchanged with another foreign currency.
     * Default value is 1 USD.
     *
     * @type {number}
     * @memberof IAppState
     */
    amount: number;
};

/**
 * The main layout of Application.
 *
 * @class App
 * @extends {Component<{}, IAppState>}
 */
class App extends Component<{}, IAppState> {
    public static propTypes = {};

    public state: IAppState = {
        amount: INITIAL_CURRENCY_AMOUNT,
    };

    public render() {
        return (
            <div className="container">
                <Header handleInputChange={this.setAmount} />
                <Content amount={this.state.amount} />
            </div>
        );
    }

    /**
     * Function to set the state of Amount when `input` element is inputted.
     *
     * @private
     * @memberof App
     */
    private setAmount = (e: ChangeEvent<HTMLInputElement>) => {
        const amount = e.target.value ? parseFloat(e.target.value) : 0;
        this.setState({ amount });
    }
}

export default App;