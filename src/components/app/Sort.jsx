import { useState } from "react";

const Sort = ({ fields, set }) => {
    const [selectedField, setSelectedField] = useState(Object.keys(fields)[0]);

    const handleFieldChange = ({ target }) => {
        const { field, sortDirection } = target.value;
        setSelectedField(field);
        set({ [field]: sortDirection === "asc" ? 1 : -1 });
    };

    return (
       
             <select value={{ field: selectedField, sortDirection: fields[selectedField] }} onChange={handleFieldChange}
              className="bg-white border p-2  rounded-md">
                {Object.entries(fields).map(([field, label]) => (
                    ["asc", "desc"].map((sortDirection) => (
                        <option key={field + sortDirection} value={{ field, sortDirection }}>
                            {label} {sortDirection}
                        </option>
                    ))
                ))}
            </select>
          
        
    );
};

export default Sort;
