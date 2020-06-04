import React, { Component } from 'react';
import Slider from 'rc-slider'
import Select from "@material-ui/core/Select"
import 'rc-slider/assets/index.css'
import './Navbar.css'
import { MenuItem } from '@material-ui/core';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = { format: 'hex' }
        this.handleChange = this.handleChange.bind(this)
        this.handleColorChange = this.handleColorChange.bind(this)
    }
    handleColorChange(e) {
        this.setState({ format: e.target.value })
        this.props.handleChange(e.target.value)
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
                <div className="select-container">
                    <Select value={this.state.format} onChange={this.handleColorChange}>
                        <MenuItem value="hex">HEX- #ffffff</MenuItem>
                        <MenuItem value="rgb">RGB- rgb(255,255,255)</MenuItem>
                        <MenuItem value="rgba">RGBA- rgba(255,255,255,1.0)</MenuItem>
                    </Select>
                </div>
            </header>
        );
    }
}

export default Navbar;