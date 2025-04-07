import { useState } from "react";

const Sort = ({ fields, set }) => {
    const [selectedField, setSelectedField] = useState(Object.keys(fields)[0]);
    const [sortDirection, setSortDirection] = useState('desc');

    const handleFieldChange = ({ target }) => {
        const field = target.value;
        setSelectedField(field);
        set({ [field]: sortDirection === "asc" ? 1 : -1 });
    };

    const handleSortDirectionChange = ({ target }) => {
        const direction = target.value;
        setSortDirection(direction);
        set({ [selectedField]: direction === "asc" ? 1 : -1 });
    };

    return (
        <div>
            <select value={selectedField} onChange={handleFieldChange}>
                {Object.entries(fields).map(([field, label]) => (
                    <option key={field} value={field}>
                        {label}
                    </option>
                ))}
            </select>

            <select value={sortDirection} onChange={handleSortDirectionChange}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
        </div>
    );
};

export default Sort;
