import React, { Component } from 'react';
import MiniPallete from './MiniPalette'
import { Link } from 'react-router-dom'
import styles from './styles/PaletteListStyles'
import { withStyles } from '@material-ui/styles';


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
                        <Link to="/palette/new">Create Palette</Link>
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