import { useTable } from "react-table";
import { Button, Row, Table } from "react-bootstrap";
import { useSortBy } from "react-table";
import { useGlobalFilter } from "react-table";
import { GlobalFilter } from "./GlobalFilter";



export const ReactTable = (props) => {
  const { data = [], columns = [], fetchMorePosts, lastKey, nextPosts_loading } = props;

  // console.log("this is tab last",lastKey);

  if (!columns || columns.length <= 0) throw Error("Please provide columns");

  const tableInstance = useTable({ columns, data },useGlobalFilter, useSortBy);
  const { getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    // Get the state from the instance
    state: {globalFilter},setGlobalFilter } = tableInstance;

  return (
    <>
   
    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
    <Table  {...getTableProps()}>
      <thead className="text-center" style={{background:"#C2EDCE"}}> 
        {headerGroups.map((headerGroup) => (
          <tr className="border border-info" {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th className="border border-info"  {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
                {column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : ""}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody style={{backgroundImage: "linear-gradient(to right, #badfe7, #c8e6e3, #daebe3, #eaf0e8, #f6f6f2)"}} {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr className="border border-info" {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td className="border border-info" {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
    <div>
    {nextPosts_loading ? (
          <p>Loading..</p>
        ) : lastKey.length > 0 ? (
          <Row className="g-0">
            <Button className="mx-auto w-25" style={{background:"#388087",border:"none"}} onClick={() => fetchMorePosts(lastKey)}>Update</Button>
          </Row>
           ) : (
          <span>All data updated</span>
        )}
        
    </div>
    </>
  );
};
