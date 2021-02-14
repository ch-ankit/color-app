import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import styles from './styles/ColorBoxStyles'
import { withStyles } from '@material-ui/styles';


class ColorBox extends Component {
    constructor(props) {
        super(props);
        this.state = { copied: false }
        this.handleCopy = this.handleCopy.bind(this);
    }
    handleCopy() {
        this.setState({ copied: true }, () => {
            setTimeout(() => this.setState({ copied: false }), 1500)
        })
    }
    render() {
        const { name, background, paletteName, colorId, classes } = this.props;
        const { copied } = this.state;
        return (
            <CopyToClipboard text={background} onCopy={this.handleCopy}>
                <div className={classes.colorBox} style={{ background: background }}>
                    <div className={`${classes.copyOverlay} ${copied && classes.showOverlay}`} style={{ background: background }} />
                    <div className={`${classes.copyMessage} ${copied && classes.showMessageOverlay}`}>
                        <h1>Copied!!</h1>
                        <p className={classes.copyText}>{background}</p>
                    </div>
                    <div>
                        <div className={classes.boxContent}>
                            <span className={classes.colorName}>{name}</span>
                        </div>
                        <button className={classes.copyButton} onClick={this.handleCopy}>Copy</button>
                    </div>
                    {this.props.showingFullPallete &&
                        <Link to={`/palette/${paletteName}/${colorId}`} onClick={e => e.stopPropagation()}>
                            <span className={classes.seeMore}>More</span>
                        </Link>}
                </div>
            </CopyToClipboard >
        );
    }
}

export default withStyles(styles)(ColorBox)