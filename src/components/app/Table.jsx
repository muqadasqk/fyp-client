import { Button } from "@components";

const Table = ({ fields, records, actions, ...prop }) => {
    return (
        <div>
            <table {...prop}>
                <thead>
                    <tr>
                        {Object.entries(fields).map(([key, label]) => (
                            <th key={key}>{label}</th>
                        ))}
                        {actions && <th>Action</th>}
                    </tr>
                </thead>
                <tbody>
                    {records.length >= 1 ? records.map((record) => (
                        <tr key={record._id}>
                            {Object.keys(fields).map((field) => (
                                <td key={field}>{record[field] ?? "N/A"}</td>
                            ))}
                            {actions && <td>
                                {actions.map(({ label, icon = null, ShowWhen, fn }) => {
                                    const k = Object.keys(ShowWhen)[0];
                                    if (record[k] === ShowWhen[k]) {
                                        return <Button key={label} onClick={() => fn(record._id, label)}>
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
