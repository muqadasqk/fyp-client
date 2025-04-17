const RangeSelector = ({ name, ...props }) => {
    return (
         <select name={name} {...props}  className="bg-white border p-2 rounded-md">
            {[10, 20, 50, 100, 200, 500, 1000].map((range) => (
                <option key={range} value={range}>{range}</option>
            ))}
        </select>
      
    )
}

export default RangeSelector