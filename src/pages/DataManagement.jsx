import React, { useState, useEffect } from 'react';
import { useTable, usePagination, useRowSelect, useGlobalFilter, useAsyncDebounce } from 'react-table';
import { get, put } from '../services/api';

const DataManagement = () => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await get('/user-data');
      setData(result);
      setOriginalData(result);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const updateData = async (rowIndex, columnId, value) => {
    try {
      const updatedRow = { ...data[rowIndex], [columnId]: value };
      await put(`/user-data/${updatedRow.id}`, updatedRow);
      const updatedData = data.map((row, index) => (index === rowIndex ? updatedRow : row));
      setData(updatedData);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Name',
        accessor: 'name',
        Cell: EditableCell,
      },
      {
        Header: 'Email',
        accessor: 'email',
        Cell: EditableCell,
      },
      {
        Header: 'Role',
        accessor: 'role',
        Cell: EditableCell,
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    state: { pageIndex, pageSize },
    gotoPage,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Cell: EditableCell },
      updateData,
    },
    useGlobalFilter,
    usePagination,
    useRowSelect
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Data Management</h1>
      <table {...getTableProps()} className="min-w-full bg-white">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} className="px-4 py-2 border">
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} className="px-4 py-2 border">
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!pageIndex}>
          {'<<'}
        </button>{' '}
        <button onClick={() => gotoPage(pageIndex - 1)} disabled={!pageIndex}>
          {'<'}
        </button>{' '}
        <button onClick={() => gotoPage(pageIndex + 1)} disabled={pageIndex + 1 >= pageSize}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageSize - 1)} disabled={pageIndex + 1 >= pageSize}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageSize}
          </strong>{' '}
        </span>
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateData,
}) => {
  const [value, setValue] = useState(initialValue);

  const onChange = e => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    updateData(index, id, value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return <input value={value} onChange={onChange} onBlur={onBlur} />;
};

export default DataManagement;