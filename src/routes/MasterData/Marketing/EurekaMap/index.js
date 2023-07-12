import React from "react";
import {
  Button,
  Card,
  Col,
  Image,
  Input,
  Row,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const { Column } = Table;

const Maps = () => {
  const data = [];
  return (
    <div>
      <Card>
        <Row style={{ marginBottom: 10 }}>
          <Col md={24}>
            <Typography>Eureka Map</Typography>
            <MapContainer
              center={[51.505, -0.09]}
              zoom={13}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[51.505, -0.09]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </Col>
        </Row>
        <Row>
          <Col md={24}>
            <Table dataSource={data}>
              <Column title="Status" dataIndex="age" key="age" />
              <Column title="Vehicle" dataIndex="age" key="age" />
              <Column title="Acc" dataIndex="address" key="address" />
              <Column title="Date Time" dataIndex="address" key="address" />
              <Column title="Idle Time" dataIndex="address" key="address" />
              <Column title="Location" dataIndex="address" key="address" />
              <Column title="Hotspot" dataIndex="address" key="address" />
              <Column title="Speed" dataIndex="address" key="address" />
              <Column title="Odo" dataIndex="address" key="address" />
            </Table>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Maps;
