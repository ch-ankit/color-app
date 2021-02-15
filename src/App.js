import React, { Component } from 'react';
import Palette from './Palette'
import seedColors from './seedColors'
import { generatePallete } from './colorHelpers';
import { Route, Switch } from 'react-router-dom';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';

class App extends Component {
  findPallete(id) {
    return seedColors.find(function (palette) {
      return palette.id === id
    })
  }
  render() {
    return (
      <Switch>
        <Route exact path="/" render={(routeProps) => <PaletteList palettes={seedColors} {...routeProps} />} />
        <Route exact path="/palette/new" render={(routeProps)=> <NewPaletteForm {...routeProps}/>}/>
        <Route exact path="/palette/:id" render={(routeProps) => <Palette palette={generatePallete(this.findPallete(routeProps.match.params.id))} />} />
        <Route exact path="/palette/:paletteId/:colorId" render={(routeProps) => <SingleColorPalette colorId={routeProps.match.params.colorId} palette={generatePallete(this.findPallete(routeProps.match.params.paletteId))} />} />
      </Switch>
    );
  }
}

export default App;
