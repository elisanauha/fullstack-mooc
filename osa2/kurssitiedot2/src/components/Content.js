import React from 'react';
import Part from './Part'

const Content = (props) => {
    const partsRendered = props.parts.map(part => <Part part={part} key={part.id} ></Part>)

    return (
        <div>
            {partsRendered}
        </div>
    )
}

export default Content;