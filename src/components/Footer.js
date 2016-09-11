/**
 * Created by sasha on 11.09.16.
 */

import React, { Component, PropTypes } from 'react';
export default class Footer extends Component {

    static propTypes = {
        dispatch: PropTypes.func.isRequired
    }

    constructor (props) {
        super(props);
    }
    
    render () {
        return (
            <nav>
                Footer
            </nav>
        );
    }

}