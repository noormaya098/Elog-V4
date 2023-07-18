import React from "react";
import {
  Table,
  Space,
  Button,
  Col,
  Input,
  Pagination,
  Card,
  Modal,
  Tag,
  Select,
  Row,
} from "antd";
import OrderTable from "./OrderTable";
import ApprovalTable from "./ApprovalTable";
import CommentsTable from "./CommentsTable";
import MarketingApprovalBox from "./MarketingApprovalBox ";
import Header from "./Header";

function PrintSP() {
  return (
    <div>
      <Card>
        <Header/>
        <OrderTable />
        <ApprovalTable />
        <CommentsTable />
        <MarketingApprovalBox />
      </Card>
    </div>
  );
}

export default PrintSP;
