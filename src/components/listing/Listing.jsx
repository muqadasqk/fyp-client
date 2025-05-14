import { Pagination, SearchBar, Table } from '@components';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

export const Listing = ({ onChange, recordList, paginationData, searchableFields, sortableFields, recordFields, actions }) => {
    const dispatch = useDispatch();
    const [page, setPage] = useState({ current: 1, size: 10, query: {}, sort: { createdAt: -1 } });

    useEffect(() => {
        dispatch(onChange(page));
    }, [page, dispatch])

    return <div className="p-5 bg-primary border rounded-lg border-primary overflow-x-hidden">
        <SearchBar
            fields={searchableFields}
            set={(query) => setPage((p) => ({ ...p, query }))}
        />

        <Table
            records={recordList}
            fields={recordFields}
            actions={actions}
            onSort={(sort) => setPage((p) => ({ ...p, sort }))}
        />

        <Pagination onSort={(size) => setPage((p) => ({ ...p, size }))} data={paginationData} set={(current) => setPage((p) => ({ ...p, current }))} />
    </div>
}

export default Listing;
