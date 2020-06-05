import React, { Component } from "react";
import ColorBox from "./ColorBox";
import "./Palette.css";
import Navbar from "./Navbar";

class Palette extends Component {
    constructor(props) {
        super(props);
        this.state = { level: 500, format: "hex" };
        this.changeLevel = this.changeLevel.bind(this);
        this.changeColorFormat = this.changeColorFormat.bind(this);
    }
    changeColorFormat(val) {
        this.setState({ format: val });
    }
    changeLevel(newLevel) {
        this.setState({ level: newLevel });
    }
    render() {
        const { colors, paletteName, emoji } = this.props.palette;
        const { level, format } = this.state;
        const colorBoxes = colors[level].map((color) => (
            <ColorBox
                background={color[format]}
                name={color.name}
                key={color.id}
            />
        ));
        return (
            <div className="Palette">
                <Navbar
                    level={level}
                    changer={this.changeLevel}
                    handleChange={this.changeColorFormat}
                />
                <div className="Palette-colors">
                    {colorBoxes}
                    {/* Bunch of Color Boxes */}
                </div>
                <footer className="Palette-footer">
                    {paletteName}
                    <span className="emoji">{emoji}</span>
                </footer>
            </div>
        );
    }
}

export default Palette;
