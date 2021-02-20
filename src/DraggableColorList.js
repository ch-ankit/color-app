import React, { Component } from 'react';
import { SortableContainer } from 'react-sortable-hoc'
import DragableColorBox from './DragableColorBox'

class DraggableColorList extends Component {
    render() {
        const { colors } = this.props
        return (
            <div style={{ height: '100%' }}>
                {colors.map((color, i) => (
                    <DragableColorBox index={i} key={color.name} color={color.color} name={color.name} handleClick={() => this.props.deleteColor(color.name)} />
                ))}
            </div>
        );
    }
}

export default SortableContainer(DraggableColorList);