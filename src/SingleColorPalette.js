import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';

const styles = {
    palette: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
    }

}

class SingleColorPalette extends Component {
    constructor(props) {
        super(props);
        this._shades = this.gatherShades(this.props.palette, this.props.colorId)
        this.state = { format: "hex" };
        this.changeColorFormat = this.changeColorFormat.bind(this)
    }
    gatherShades(palette, colorToFilterBy) {
        let shades = []
        let allColors = palette.colors;
        for (let key in allColors) {
            shades = shades.concat(allColors[key].filter(color => color.id === colorToFilterBy))
        }
        return shades.slice(1);
    }
    changeColorFormat(val) {
        this.setState({ format: val });
    }

    render() {
        const { classes } = this.props
        const colorBoxes = this._shades.map(color => (
            <ColorBox key={color.name} name={color.name} background={color[this.state.format]} showingFullPallete={false} />
        ))
        return (
            <div className={`SingleColorPalette ${classes.palette}`}>
                <Navbar navbar={false} handleChange={this.changeColorFormat} />
                <div className='Palette-colors'>
                    {colorBoxes}
                    <div className="go-back ColorBox" >
                        <Link className="back-button" to={`/palette/${this.props.palette.id}`}>Go Back</Link>
                    </div>
                </div>
                <PaletteFooter paletteName={this.props.colorId} />
            </div>
        );
    }
}

export default withStyles(styles)(SingleColorPalette);