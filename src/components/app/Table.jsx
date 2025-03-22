import { Loading } from "@components";

const Table = ({ heads, items, isLoading }) => {
    return (
        <div>
            {isLoading && <Loading />}
            <table>
                <thead>
                    <tr>
                        {heads.map((head, index) => (
                            <th key={index}>{head}</th>
                        ))}
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {heads.map((head, colIndex) => (
                                <td key={colIndex}>{row[head]}</td>
                            ))}
                            <td>{/* Add Action Buttons Here */}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
