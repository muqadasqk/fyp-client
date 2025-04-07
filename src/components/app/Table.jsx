import { spinner } from "@assets";
import { Button } from "@components";

const Table = ({ fields, records, actions, isLoading }) => {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        {Object.entries(fields).map(([key, label]) => (
                            <th key={key}>{label}</th>
                        ))}
                        {actions && <th>Action</th>}
                    </tr>
                </thead>
                <tbody>
                    {/* {isLoading && <tr>
                        <td><img src={spinner} alt="Loading spinner" width={20} /></td>
                    </tr>} */}
                    {records.length >= 1 ? records.map((record) => (
                        <tr key={record._id}>
                            {Object.keys(fields).map((field) => (
                                <td key={field}>{record[field]}</td>
                            ))}
                            {actions && <td>
                                {actions.map(({ label, icon = null, ShowWhen, fn }) => {
                                    const k = Object.keys(ShowWhen)[0];
                                    if (record[k] === ShowWhen[k]) return <Button key={label} onClick={() => fn(record._id, label)}>
                                        {icon && icon} {label}
                                    </Button>
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
