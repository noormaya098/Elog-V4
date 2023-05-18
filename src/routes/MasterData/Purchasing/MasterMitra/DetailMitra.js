import { Card } from "antd";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import FormDataDetailMitra from "./Form/FormData";
export default function DetailMitra() {
  const { mitraId } = useParams();


  return (
    <div>
      <Card>
        <Row>
          <Col>
            <FormDataDetailMitra mitraId={mitraId}/>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
