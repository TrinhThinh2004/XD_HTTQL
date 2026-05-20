import React from 'react';

const Table = ({ 
  columns, 
  data, 
  loading, 
  emptyMessage = 'Không có dữ liệu',
  rowKey = 'id'
}) => {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-border bg-white shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50/50">
          <tr>
            {columns.map((column, index) => (
              <th 
                key={index}
                className={`px-6 py-4 text-xs font-bold text-textSecondary uppercase tracking-wider border-b border-border ${column.className || ''}`}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="animate-pulse">
                {columns.map((_, j) => (
                  <td key={j} className="px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </td>
                ))}
              </tr>
            ))
          ) : data.length === 0 ? (
            <tr>
              <td 
                colSpan={columns.length} 
                className="px-6 py-10 text-center text-textSecondary italic"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr 
                key={row[rowKey] || rowIndex} 
                className="hover:bg-primaryLight/5 transition-colors duration-150 group"
              >
                {columns.map((column, colIndex) => (
                  <td 
                    key={colIndex} 
                    className={`px-6 py-4 text-sm text-textPrimary ${column.className || ''}`}
                  >
                    {column.render ? column.render(row[column.key], row, rowIndex) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
