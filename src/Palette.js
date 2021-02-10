import React, { Component } from "react";
import ColorBox from "./ColorBox";
import "./Palette.css";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";

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
        const { colors, paletteName, emoji, id } = this.props.palette;
        const { level, format } = this.state;
        const colorBoxes = colors[level].map((color) => (
            <ColorBox
                background={color[format]}
                name={color.name}
                colorId={color.id}
                key={color.id}
                paletteName={id}
                showingFullPallete={true}
            />
        ));
        return (
            <div className="Palette">
                <Navbar
                    navbar={true}
                    level={level}
                    changer={this.changeLevel}
                    handleChange={this.changeColorFormat}
                />
                <div className="Palette-colors">
                    {colorBoxes}
                </div>
                <PaletteFooter emoji={emoji} paletteName={paletteName} />
            </div>
        );
    }
}

export default Palette;
