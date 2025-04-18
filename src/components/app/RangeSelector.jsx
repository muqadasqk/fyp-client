const RangeSelector = ({ name, ...props }) => {
    return (
        <select name={name} {...props}>
            {[10, 20, 50, 100, 200, 500, 1000].map((range) => (
                <option key={range} value={range}>{range} Records</option>
            ))}
        </select>
    )
}

export default RangeSelector