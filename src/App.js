import React, { Component } from 'react';
import Palette from './Palette'
import seedColors from './seedColors'
import { generatePallete } from './colorHelpers';
import { Route, Switch } from 'react-router-dom';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paletteList: seedColors
    }
    this.savePalette = this.savePalette.bind(this)
    this.findPallete = this.findPallete.bind(this)
  }
  findPallete(id) {
    return this.state.paletteList.find(function (palette) {
      return palette.id === id
    })
  }
  savePalette(newPalette) {
    this.setState({ paletteList: [...seedColors, newPalette] })
  }
  render() {
    return (
      <Switch>
        <Route exact path="/" render={(routeProps) => <PaletteList palettes={this.state.paletteList} {...routeProps} />} />
        <Route exact path="/palette/new" render={(routeProps) => <NewPaletteForm {...routeProps} savePalette={this.savePalette} />} />
        <Route exact path="/palette/:id" render={(routeProps) => <Palette palette={generatePallete(this.findPallete(routeProps.match.params.id))} />} />
        <Route exact path="/palette/:paletteId/:colorId" render={(routeProps) => <SingleColorPalette colorId={routeProps.match.params.colorId} palette={generatePallete(this.findPallete(routeProps.match.params.paletteId))} />} />
      </Switch>
    );
  }
}

export default App;
