import { Button } from "@components";

const Table = ({ fields, records, actions, ...prop }) => {
    return (
        <div  className=" table-container "  >
            <table {...prop}  className="min-w-full bg-white ">
                <thead className="bg-gray-200 truncate">
                    <tr>
                        {Object.entries(fields).map(([key, label]) => (
                            <th className="py-3"key={key}>{label}</th>
                        ))}
                        {actions && <th>Action</th>}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y diviide-gray-200">
                    {records.length >= 1 ? records.map((record) => (
                        <tr key={record._id} className="hover:bg-gray-200 truncate">
                            {Object.keys(fields).map((field) => (
                                <td key={field} className="ps-2">{record[field] ?? "N/A" }</td>
                            ))}
                            {actions && <td className="py-2 px-4 whitespace-nowrap">
                                {actions.map(({ label, icon = null, ShowWhen, onClick }) => {
                                    const k = Object.keys(ShowWhen)[0];
                                    if (record[k] === ShowWhen[k]) {
                                        return <Button key={label} onClick={() => onClick(record._id, label)}>
                                            {icon && icon} {label}
                                        </Button>
                                    }
                                })}
                            </td>}
                        </tr>
                    )) : <tr><td>Nothing to show up!</td></tr>}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
