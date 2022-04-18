import React from "react";
import { ICourse } from "../../utils/types/types";
import ReactPaginate from "react-paginate";

interface TableListProps {
  courses: ICourse[];
  itemsCount: number;
}

const TableList: React.FC<TableListProps> = ({ children }) => {
  return <></>;
};

export default TableList;
