import React, { Component } from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { ChromePicker } from 'react-color'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { arrayMove } from 'react-sortable-hoc';
import DraggableColorList from './DraggableColorList';

const drawerWidth = 400;

const styles = (theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        height: "calc(100vh - 64px)",
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
});

class NewPaletteForm extends Component {
    static defaultProps = {
        maxColors: 20
    }
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            currentColor: "teal",
            newColorName: "",
            colors: this.props.paletteList[0].colors,
            newPaletteName: ''
        }
        this.addNewColor = this.addNewColor.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.randomColorGenerator = this.randomColorGenerator.bind(this)
        this.deleteColor = this.deleteColor.bind(this)
        this.clearColors = this.clearColors.bind(this)
    }
    componentDidMount() {
        ValidatorForm.addValidationRule('isColorNameUnique', value => this.state.colors.every(({ name }) => value.toLowerCase() !== name.toLowerCase())
        )

        ValidatorForm.addValidationRule('isColorUnique', () =>
            this.state.colors.every(({ color }) => color !== this.state.currentColor)
        )
        ValidatorForm.addValidationRule('isPaletteUnique', (value) =>
            this.props.paletteList.every(({ paletteName }) => value.toLowerCase() !== paletteName.toLowerCase())
        )
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };
    handleChangeComplete = (color) => {
        this.setState({ currentColor: color.hex });
    };
    addNewColor() {
        const newColor = { color: this.state.currentColor, name: this.state.newColorName }
        this.setState({ colors: [...this.state.colors, newColor], newColorName: '' })
    }
    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value })
    }
    randomColorGenerator() {
        const allColors = this.props.paletteList.map(p => p.colors).flat()
        var rand = Math.floor(Math.random() * allColors.length)
        const randomColor = allColors[rand]
        this.setState({ colors: [...this.state.colors, randomColor], newColorName: '' })
    }
    handleSubmit() {
        const newPalette = { paletteName: this.state.newPaletteName, colors: this.state.colors, id: this.state.newPaletteName.replace(/ /g, '-') }
        this.props.savePalette(newPalette)
        this.props.history.push('/')
    }
    deleteColor(colorName) {
        this.setState({
            colors: this.state.colors.filter(color => color.name !== colorName)
        })
    }
    clearColors() {
        this.setState({ colors: [] })
    }
    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ colors }) => ({
            colors: arrayMove(colors, oldIndex, newIndex),
        }));
    };

    render() {
        const { classes } = this.props
        const { open, currentColor, colors } = this.state
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    color='default'
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Persistent drawer
                        </Typography>
                        <ValidatorForm onSubmit={this.handleSubmit}>
                            <TextValidator
                                value={this.state.newPaletteName}
                                name="newPaletteName"
                                onChange={this.handleChange}
                                validators={['required', 'isPaletteUnique']}
                                errorMessages={['Enter a palette name', 'Name already taken']}
                            />
                            <Button variant="contained" color="primary" type='submit'>Save Palette</Button>
                        </ValidatorForm>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <Typography variant="h4">
                        Design Your Palette
                    </Typography>
                    <div>
                        <Button variant="contained" color="secondary" onClick={this.clearColors} >
                            Clear Palette
                        </Button>
                        <Button variant="contained" color="primary" onClick={this.randomColorGenerator} disabled={colors.length >= this.props.maxColors}>
                            Random Color
                        </Button>
                    </div>
                    <ChromePicker color={currentColor} onChangeComplete={this.handleChangeComplete} />
                    <ValidatorForm onSubmit={this.addNewColor}>
                        <TextValidator
                            value={this.state.newColorName}
                            name="newColorName"
                            onChange={this.handleChange}
                            validators={['required', 'isColorNameUnique', 'isColorUnique']}
                            errorMessages={['Color name is required', 'Color name must be unique', 'Color Already Used']}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ backgroundColor: currentColor }}
                            type="submit"
                            disabled={colors.length >= this.props.maxColors}
                        >
                            {colors.length >= this.props.maxColors ? `Palette Full` : `Add Color`}
                        </Button>
                    </ValidatorForm>
                </Drawer>
                <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.drawerHeader} />
                    <DraggableColorList axis='xy' colors={this.state.colors} deleteColor={this.deleteColor}
                        onSortEnd={this.onSortEnd}
                    />
                </main>
            </div>
        );
    }
}
export default withStyles(styles, { withTheme: true })(NewPaletteForm);
