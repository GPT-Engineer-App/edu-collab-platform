import React, { useState, useEffect } from 'react';
import { useTable, usePagination, useRowSelect, useGlobalFilter, useAsyncDebounce } from 'react-table';
import { get, put, del } from '../services/api'; // Import the delete function

const DataManagement = () => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirmation, setDeleteConfirmation] = useState({ show: false, id: null }); // State for delete confirmation

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
      const updatedData = [...data];
      updatedData[rowIndex] = updatedRow;
      setData(updatedData);

      await put(`/user-data/${updatedRow.id}`, updatedRow);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const deleteData = async (id) => {
    try {
      await del(`/user-data/${id}`);
      setData(data.filter(row => row.id !== id));
      setDeleteConfirmation({ show: false, id: null });
    } catch (error) {
      console.error('Error deleting data:', error);
    }
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

  const defaultColumn = {
    Cell: EditableCell,
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
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Role',
        accessor: 'role',
      },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <button
            onClick={() => setDeleteConfirmation({ show: true, id: row.original.id })}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Delete
          </button>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
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
          {rows.map(row => {
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
      {deleteConfirmation.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow">
            <p>Are you sure you want to delete this data?</p>
            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => deleteData(deleteConfirmation.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Yes
              </button>
              <button
                onClick={() => setDeleteConfirmation({ show: false, id: null })}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataManagement;