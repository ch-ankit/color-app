import React, { Component } from 'react';
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import './Navbar.css'

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(newLevel) {
        this.props.changer(newLevel)
    }
    render() {
        return (
            <header className="Navbar">
                <div className="logo">
                    <a href='#'> reactcolorpicker</a>
                </div>
                <div className="slider-container">
                    <span>Level:{this.props.level}</span>
                    <div className="Slider">
                        <Slider defaultValue={this.props.level} step={100} min={100} max={900} onAfterChange={this.handleChange} />
                    </div>
                </div>
            </header>
        );
    }
}

export default Navbar;