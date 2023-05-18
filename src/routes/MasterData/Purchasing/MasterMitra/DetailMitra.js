import { Card } from "antd";
import React from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { useParams } from "react-router-dom";
import FormDataDetailMitra from "./Form/DataProfile";
import DataReferensi from "./Form/DataReferensi";
export default function DetailMitra() {
  const { mitraId } = useParams();

  return (
    <div>
      <Card>
        <Row className="d-flex justify-content-end">
          <Col > 
          <Tabs
      defaultActiveKey="home"
      transition={false}
      id="noanim-tab-example"
      className="mb-3 d-flex justify-content-end"
    >
              
              <Tab eventKey="home" title="DATA PROFILE">
                <FormDataDetailMitra mitraId={mitraId} />
              </Tab>
              <Tab eventKey="profile" title="DATA REFERENSI">
              <DataReferensi/>
              </Tab>
              <Tab eventKey="longer-tab" title="DATA KEUANGAN">
                Tab content for Loooonger Tab
              </Tab>
              <Tab eventKey="contact" title="PIC">
                Tab content for Contact
              </Tab>
              <Tab eventKey="contacts" title="Report">
                Tab content for Contact
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
