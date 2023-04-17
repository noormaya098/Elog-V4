import { Card, Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import DataTable from "react-data-table-component";
import useSpStore from "./Api Get/GetSPList";
import { Tag } from "antd";

function SpList() {
  const posts = useSpStore((state) => state.posts);
  const fetchPosts = useSpStore((state) => state.fetchPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const spDetails = useSpStore((state) => state.spDetails);
  // const fetchSpDetails = useSpStore((state) => state.fetchSpDetails);

  console.log(spDetails, `test`);
  useEffect(() => {
    fetchPosts();
    // fetchSpDetails();
  }, [fetchPosts]);

  const itemsPerPage = 10;
  const totalItems = posts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPosts = posts.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // const handleButtonClick = (index) => {
  //   const actualIndex = (currentPage - 1) * itemsPerPage + index;
  //   const idmp = posts[actualIndex].idmp;
  //   fetchSpDetails(idmp);
  // };

  const JudulTable = [
    {
      name: "No.",
      selector: (spList) => spList.no,
    },
    {
      name: "SP ID",
      selector: (spList) => spList.sp,
    },
    {
      name: "Perusahaan",
      selector: (spList) => spList.perusahaan,
    },
    {
      name: "Marketing",
      selector: (posts) => posts.salesName,
    },
    {
      name: "Service",
      selector: (spList) => spList.service,
    },
    // {
    //   name: "Vehicle",
    //   selector: (spList) => spList.year,
    // },
    {
      name: "Pickup Date",
      selector: (spList) => spList.pickupDate,
    },
    {
      name: "Destination",
      selector: (spList) => {
        // Find the matching spDetail object in spDetails based on spList.idmp
        const spDetail = spDetails.find((detail) => detail.idmp == spList.destination);
    
        // If a matching spDetail is found, return its value (assuming it has a 'value' property)
        if (spDetail) {
          return spDetail.destination;
        } else {
          // If there's no match, you can return a default value or leave it empty
          return "No matching data";
        }
      },
    },
    // {
    //   name: "Act",
    //   selector: (spList) => spList.year,
    // },
    
    {
      name: "OPS",
      selector: (spList) =>
        spList.approveOps == "Y" ? (
          <Tag color="green">Approved</Tag>
        ) : spList.dateApproveOps == "Invalid date" ? (
          <Tag color="red">Waiting</Tag>
        ) : spList.dateApproveOps != "Invalid  date" ? (
          <Tag color="orange">Reject</Tag>
        ) : (
          <Tag color="red">Waiting</Tag>
        ),
    },
    // {
    //   name: "Purch",
    //   selector: (spList) => spList.year,
    // },
  ];

  return (
    <div>
      <Card>
        <Row>
          <Col sm={3}>
            <h4>SP List</h4>
          </Col>
          <DataTable columns={JudulTable} data={currentPosts} />
          <Pagination
            current={currentPage}
            total={totalItems}
            pageSize={itemsPerPage}
            onChange={handlePageChange}
          />
        </Row>
      </Card>
    </div>
  );
}

export default SpList;
