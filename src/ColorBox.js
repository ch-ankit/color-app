import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import chroma from 'chroma-js'
import './ColorBox.css'
import { withStyles } from '@material-ui/styles';

const styles = {
    copyText: {
        color: props => chroma(props.background).luminance() >= 0.7 ? 'black' : 'white'
    },
    colorName: {
        color: props => chroma(props.background).luminance() <= 0.08 ? 'white' : 'black'
    }
}
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
        const isLightColor = chroma(background).luminance() >= 0.7;
        return (
            <CopyToClipboard text={background} onCopy={this.handleCopy}>
                <div className="ColorBox" style={{ background: background }}>
                    <div className={`copy-overlay ${copied && `show`}`} style={{ background: background }} />
                    <div className={`copy-msg ${copied && `show`}`}>
                        <h1>Copied!!</h1>
                        <p className={classes.copyText}>{background}</p>
                    </div>
                    <div className="copy-container">
                        <div className="box-content">
                            <span className={classes.colorName}>{name}</span>
                        </div>
                        <button className={`copy-button ${isLightColor && 'dark-text'}`} onClick={this.handleCopy}>Copy</button>
                    </div>
                    {this.props.showLink && <Link to={`/palette/${paletteName}/${colorId}`} onClick={e => e.stopPropagation()}><span className={`see-more ${isLightColor && 'dark-text'}`}>More</span></Link>}
                </div>
            </CopyToClipboard >
        );
    }
}

export default withStyles(styles)(ColorBox)