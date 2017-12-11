import React, { Component } from 'react';


class Footer extends Component {
    constructor(props) {
        super(props);

        this.state = { time: '' };
    }
    componentDidMount() {
        setInterval(() => this.setState({ time: new Date().toLocaleString() }));
    }

    render() {
        return (
            <footer style={{position:"fixed", bottom:0, backgroundColor:"#ced3db"}} className='footer'>
                <div className='container'>
                    <span className='footer-copyright'>Copyright 2017 <a href='popovicsrdjan.com' target='_blank'>Srdjan Popovic</a></span>
                    <span className='float-right'>{this.state.time}</span>
                </div>
            </footer>
        );
    }
};

export default Footer;