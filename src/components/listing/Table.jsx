import { useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import clsx from "clsx";
import { readObjectValueByPath } from "@utils";
import { Button } from "@components";

const TableHeader = ({ fields, sortState, onSortToggle, hasActions }) => {
    return (
        <thead>
            <tr className="bg-primary">
                {Object.entries(fields).map(([key, label], index, arr) => (
                    <th
                        key={key}
                        className={clsx(
                            "px-6 py-3 text-left text-xs font-medium uppercase truncate",
                            index === 0 && "rounded-tl-md",
                            index === arr.length - 1 && !hasActions && "rounded-tr-md"
                        )}
                    >
                        <div
                            className="flex items-center space-x-1 cursor-pointer"
                            onClick={() => onSortToggle(key)}
                        >
                            <span>{label}</span>
                            <div className="flex flex-col text-gray-400 text-[10px]">
                                {sortState[key] !== 'asc' && (
                                    <FaChevronUp className={clsx({ "text-default": key === Object.keys(sortState)[0] })} />
                                )}
                                {sortState[key] !== 'desc' && (
                                    <FaChevronDown className={clsx({ "text-default": key === Object.keys(sortState)[0] })} />
                                )}
                            </div>
                        </div>
                    </th>
                ))}
                {hasActions && (
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase truncate rounded-tr-md">
                        Action
                    </th>
                )}
            </tr>
        </thead>
    );
};

const Table = ({ fields, records, actions, onSort, ...prop }) => {
    const [sortState, setSortState] = useState({});

    const handleSortToggle = (field) => {
        let direction = 'desc';

        if (sortState[field] === 'desc') {
            direction = 'asc';
        } else if (sortState[field] === 'asc') {
            direction = 'desc';
        }

        setSortState({ [field]: direction });
        onSort({ [field]: direction });
    };

    return (
        <div className="table-container w-full overflow-x-auto hide-scrollbar">
            <table {...prop} className="min-w-full">
                <TableHeader
                    fields={fields}
                    sortState={sortState}
                    onSortToggle={handleSortToggle}
                    hasActions={!!actions}
                />

                <tbody className="divide-y dark:divide-[rgba(255,255,255,0.03)]">
                    {records.length >= 1 ? records.map((record) => (
                        <tr key={record._id} className="hover:bg-primary-hover">
                            {Object.keys(fields).map((field) => (
                                <td key={field} className="py-2 px-4 whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
                                    {readObjectValueByPath(record, field) ?? "N/A"}
                                </td>
                            ))}
                            {actions && (
                                <td className="py-2 px-4 whitespace-nowrap">
                                    {actions.map(({ label, icon = null, ShowWhen, onClick }) => {
                                        const k = Object.keys(ShowWhen)[0];
                                        if (record[k] === ShowWhen[k] || ShowWhen[k] === true) {
                                            return (
                                                <Button
                                                    title={`Click to ${label.toLowerCase()}`}
                                                    key={label}
                                                    onClick={() => onClick(record._id, label)}
                                                    className="p-2 rounded"
                                                >
                                                    {icon && icon}
                                                </Button>
                                            );
                                        }
                                    })}
                                </td>
                            )}
                        </tr>
                    )) : (
                        <tr>
                            <td
                                className="px-4 py-2 text-primary text-sm text-center"
                                colSpan={Object.keys(fields).length + (actions ? 1 : 0)}
                            >
                                Nothing to show up!
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
