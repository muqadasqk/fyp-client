import React from 'react'

const RangeSector = ({ ...props }) => {
    return (
        <select name="limit" {...props}>
            {[1, 5, 10, 20, 50, 100].map(size => <option key={size} value={size}>{size}</option>)}
        </select>
    )
}

export default RangeSector