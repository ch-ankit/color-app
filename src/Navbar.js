import React, { Component } from "react";
import Slider from "rc-slider";
import Select from "@material-ui/core/Select";
import "rc-slider/assets/index.css";
import CloseIcon from "@material-ui/icons/Close";
import styles from "./styles/NavbarStyles"
import { MenuItem, Snackbar, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";


class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = { format: "hex", open: false };
        this.handleChange = this.handleChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.closeSnackbar = this.closeSnackbar.bind(this);
    }
    closeSnackbar() {
        this.setState({ open: false });
    }
    handleColorChange(e) {
        this.setState({ format: e.target.value, open: true });
        this.props.handleChange(e.target.value);
    }
    handleChange(newLevel) {
        this.props.changer(newLevel);
    }
    render() {
        const { classes } = this.props
        return (
            <header className={classes.navbar}>
                <div className={classes.logo}>
                    <Link to="/">reactcolorpicker</Link>
                </div>
                {this.props.navbar &&
                    <div>
                        <span>Level:{this.props.level}</span>
                        <div className={classes.slider}>
                            <Slider
                                defaultValue={this.props.level}
                                step={100}
                                min={100}
                                max={900}
                                onAfterChange={this.handleChange}
                            />
                        </div>
                    </div>}
                <div className={classes.selectContainer}>
                    <Select
                        value={this.state.format}
                        onChange={this.handleColorChange}
                    >
                        <MenuItem value="hex">HEX- #ffffff</MenuItem>
                        <MenuItem value="rgb">RGB- rgb(255,255,255)</MenuItem>
                        <MenuItem value="rgba">
                            RGBA- rgba(255,255,255,1.0)
                        </MenuItem>
                    </Select>
                </div>
                <Snackbar
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    open={this.state.open}
                    autoHideDuration={3000}
                    onClose={this.closeSnackbar}
                    message={
                        <span>
                            Format Changed To {this.state.format.toUpperCase()}
                        </span>
                    }
                    ContentProps={{
                        "aria-describedby": "message-id",
                    }}
                    action={[
                        <IconButton
                            onClick={this.closeSnackbar}
                            color="inherit"
                            key="close"
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </header>
        );
    }
}

export default withStyles(styles)(Navbar);
