import { useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import clsx from "clsx";
import { readObjectValueByPath } from "@utils";
import { Button } from "@components";

const TableHeader = ({ fields, sortState, onSortToggle, hasActions }) => {
    return (
        <thead className="bg-theme">
            <tr>
                {Object.entries(fields).map(([key, label], index, arr) => (
                    <th
                        key={key}
                        className={clsx(
                            "px-4 py-3 font-medium uppercase whitespace-nowrap",
                            // index === 0 && "rounded-tl-lg",
                            // index === arr.length - 1 && !hasActions && "rounded-tr-lg"
                        )}
                    >
                        <div
                            className="flex items-center space-x-1 cursor-pointer select-none"
                            onClick={() => onSortToggle(key)}
                        >
                            <span className="">{label}</span>
                            <div className="flex flex-col text-[10px]">
                                {sortState[key] !== "asc" && (
                                    <FaChevronUp />
                                )}
                                {sortState[key] !== "desc" && (
                                    <FaChevronDown />
                                )}
                            </div>
                        </div>
                    </th>
                ))}
                {hasActions && (
                    <th className="px-4 py-3 font-medium uppercase rounded-tr-lg">
                        ACTION
                    </th>
                )}
            </tr>
        </thead>
    );
};

const Table = ({ fields, records, actions, onSort, empty, ...prop }) => {
    const [sortState, setSortState] = useState({});

    const handleSortToggle = (field) => {
        const current = sortState[field];
        const next = current === "asc" ? "desc" : "asc";
        setSortState({ [field]: next });
        onSort({ [field]: next });
    };

    return (
        <div className="overflow-x-auto rounded-lg bg-primary">
            <table {...prop} className="min-w-full text-sm text-left">
                <TableHeader
                    fields={fields}
                    sortState={sortState}
                    onSortToggle={handleSortToggle}
                    hasActions={!!actions}
                />

                <tbody className="divide-y dark:divide-[rgba(255,255,255,0.05)]">
                    {records.length > 0 ? (
                        records.map((record, rowIndex) => (
                            <tr
                                key={record._id}
                                className={clsx(
                                    "transition-all duration-200 group hover:bg-primary-hover",
                                    rowIndex % 2 === 0 ? "bg-primary" : "bg-primary-hover"
                                )}
                            >
                                {Object.keys(fields).map((field, i, arr) => (
                                    <td
                                        key={field}
                                        className={clsx(
                                            "px-4 py-0 text-sm text-primary",
                                            i === 0 && "rounded-l-xl",
                                            i === arr.length - 1 && !actions && "rounded-r-xl",
                                            "bg-inherit"
                                        )}
                                    >
                                        {readObjectValueByPath(record, field) || "N/A"}
                                    </td>
                                ))}
                                {actions && (
                                    <td className="px-4 py-3 whitespace-nowrap flex items-center gap-2 rounded-r-xl bg-inherit">
                                        {actions.map(({ label, icon, ShowWhen, onClick }) => {
                                            const key = Object.keys(ShowWhen)[0];
                                            if (record[key] == ShowWhen[key] || ShowWhen[key] === true) {
                                                return (
                                                    <Button
                                                        key={label}
                                                        onClick={() => onClick(record._id, label)}
                                                        className="text-sm button-secondary hover:bg-theme"
                                                    >
                                                        {icon} {label}
                                                    </Button>
                                                );
                                            }
                                        })}
                                    </td>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={Object.keys(fields).length + (actions ? 1 : 0)}
                                className="px-4 py-5 text-center italic text-secondary"
                            >
                                {empty ?? "Nothing to show!"}
                            </td>
                        </tr>
                    )}
                </tbody>

            </table>
        </div>
    );
};

export default Table;
