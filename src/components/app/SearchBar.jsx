import { useState, useCallback } from "react";
import { debounce } from "lodash";

const SearchBar = ({ fields, set, ...props }) => {
    const [text, setText] = useState("");
    const [field, setField] = useState("*");
    const debouncedSet = useCallback(debounce(set, 500), [set]);

    const handleChange = ({ target }) => {
        const searchValue = target.value;
        const query =
            field === "*"
                ? Object.entries(fields).reduce((acc, [key]) => ({ ...acc, [key]: searchValue }), {})
                : { [field]: searchValue };

        setText(searchValue);
        debouncedSet(query);
    };

    const handleFieldChange = ({ target }) => {
        setField(target.value)
        const query = target.value === "*"
            ? Object.entries(fields).reduce((acc, [key]) => ({ ...acc, [key]: text }), {})
            : { [target.value]: text };
        set(query);
    }

    return (
        <div className="flex gap-1">
          
           <select onChange={handleFieldChange} value={field}
           className="bg-white border p-2 rounded-md"
>
                <option value="*">All Fields</option>
                {Object.entries(fields).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                ))}
                
            </select>
        
           <div className="relative">
           <input
               className="bg-white  lg:w-[280%] border p-2 rounded-md "
                type="search"
                value={text}
                onChange={handleChange}
                placeholder={field === "*" ? "Filter records by all fields..." : `Filter records by ${fields[field].toLowerCase()}`}
                {...props}
            />
          </div>
         
        </div>
    );
};

export default SearchBar;
