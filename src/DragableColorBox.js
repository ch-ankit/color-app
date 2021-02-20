import React, { Component } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { SortableElement } from 'react-sortable-hoc'
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
        "&:hover svg": {
            color: 'white',
            transform: 'scale(1.2)'
        }
    },
    boxComponent: {
        position: "absolute",
        width: "100%",
        left: " 0px",
        bottom: "0px",
        padding: "10px",
        letterSpacing: "1px",
        textTransform: "uppercase",
        display: 'flex',
        justifyContent: 'space-between'
    },
    deleteIcon: {
        color: "rgba(0,0,0,0.5)",
        transition: 'all 0.3s ease-in-out'
    }
}

class DragableColorBox extends Component {
    render() {
        const { classes } = this.props
        return (
            <div className={classes.root} style={{ backgroundColor: this.props.color }}>
                <div className={classes.boxComponent}>
                    <span>
                        {this.props.name}
                    </span>
                    <DeleteIcon className={classes.deleteIcon} onClick={this.props.handleClick} />
                </div>
            </div>
        );
    }
}

export default SortableElement(withStyles(styles)(DragableColorBox));