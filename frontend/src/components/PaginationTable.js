import { render } from "react-dom";
import React from "react";
import { TablePagination } from "react-pagination-table";
import "../styles/dashboardTable.css";

const PaginationTable = ({
  header,
  data,
  perPageItemCount,
  columns,
  title,
}) => {
  console.log("props=", data);

  return (
    <div>
      {Array.isArray(data) && data.length > 1 ? (
        <>
          <TablePagination
            title={title}
            headers={header}
            data={data}
            columns={columns}
            perPageItemCount={perPageItemCount}
            totalCount={data.length}
            //   arrayOption={[["size", "all", " "]]}
          />
        </>
      ) : (
        <>
          {" "}
          <div>{data || "No Data"}</div>
        </>
      )}
    </div>
  );
};

export default PaginationTable;
