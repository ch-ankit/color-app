import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        width: "20%",
        height: "25%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-3.5px",
    }
}

class DragableColorBox extends Component {
    render() {
        const { classes } = this.props
        return (
            <div className={classes.root} style={{ backgroundColor: this.props.color }}>
                {this.props.name}
            </div>
        );
    }
}

export default withStyles(styles)(DragableColorBox);