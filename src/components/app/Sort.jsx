import { useState } from "react";
import PropTypes from "prop-types";

const Sort = ({ fields, set }) => {
    const defaultField = Object.keys(fields)[0];
    const [selectedField, setSelectedField] = useState(defaultField);
    const [sortDirection, setSortDirection] = useState("desc");

    const handleFieldChange = ({ target }) => {
        const [field, direction] = target.value.split("|");
        setSelectedField(field);
        setSortDirection(direction);
        set({ [field]: direction === "asc" ? 1 : -1 });
    };

    return (
        <select
            value={`${selectedField}|${sortDirection}`}
            onChange={handleFieldChange}
            className="theme-dark:bg-secondaryBackground theme-light:bg-white border p-2 rounded-md"
        >
            {Object.entries(fields).map(([field, label]) =>
                ["asc", "desc"].map((direction) => (
                    <option key={`${field}-${direction}`} value={`${field}|${direction}`}>
                        {direction === "asc" ? "⬆️" : "⬇️"} {label}
                    </option>
                ))
            )}
        </select>
    );
};

Sort.propTypes = {
    fields: PropTypes.object.isRequired,
    set: PropTypes.func.isRequired,
};

export default Sort;
