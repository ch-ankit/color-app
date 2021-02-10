import React, { Component } from 'react';
import MiniPallete from './MiniPalette'
import { withStyles } from '@material-ui/styles';

const styles = {
    root: {
        backgroundColor: 'blue',
        height: '120vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    container: {
        width: "50%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        flexWrap: 'wrap'
    },
    nav: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        color: 'white'
    },
    palettes: {
        boxSizing: 'border-box',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(3,30%)',
        gridGap: '5%'

    }
}

class PaletteList extends Component {
    constructor(props) {
        super(props);
        this.goToPalette = this.goToPalette.bind(this);
    }

    goToPalette(id) {
        this.props.history.push(`/palette/${id}`)
    }
    render() {
        const { palettes, classes } = this.props
        const paletteList = palettes.map(palette => <MiniPallete {...palette} handleClick={() => this.goToPalette(palette.id)} />)
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1>React Colors</h1>
                    </nav>
                    <div className={classes.palettes}>
                        {paletteList}
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(PaletteList);