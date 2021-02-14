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
    },
    backButton: {
        color: "white",
        width: " 100px",
        height: " 30px",
        position: " absolute",
        display: " inline-block",
        top: "50%",
        left: "50%",
        marginLeft: " -50px",
        marginTop: " -15px",
        textAlign: " center",
        outline: " none",
        background: " rgba(255, 255, 255, 0.3)",
        fontSize: " 1rem",
        lineHeight: " 30px",
        textTransform: " uppercase",
        border: " none",
        textDecoration: " none",
    },
    colorBox: {
        width: "20%",
        height: "50%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-4.5px",
    },
    goBack: {
        backgroundColor: "black",
    },
    palleteColors: {
        height: "90%",
        justifyContent: "center",
        zIndex: "20",
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
            <div className={classes.palette}>
                <Navbar navbar={false} handleChange={this.changeColorFormat} />
                <div className={classes.palleteColors}>
                    {colorBoxes}
                    <div className={`${classes.goBack} ${classes.colorBox}`} >
                        <Link className={classes.backButton} to={`/palette/${this.props.palette.id}`}>Go Back</Link>
                    </div>
                </div>
                <PaletteFooter paletteName={this.props.colorId} />
            </div>
        );
    }
}

export default withStyles(styles)(SingleColorPalette);