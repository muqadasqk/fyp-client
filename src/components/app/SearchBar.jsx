import React from 'react'

const SearchBar = ({ ...props }) => {
    return (
        <input type="search" name="query" {...props} />
    )
}

export default SearchBar