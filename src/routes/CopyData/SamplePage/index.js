import React from "react";

import { Card, Col, Row } from "antd";
import {
  Area,
  AreaChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import ReactFrappeChart from "react-frappe-charts";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Portfolio from "../../components/dashboard/Crypto/Portfolio";
import BalanceHistory from "../../components/dashboard/Crypto/BalanceHistory";
import ChartCard from "../../components/dashboard/Crypto/ChartCard";
import PhotosCard from "../../components/Widgets/PhotosCard";
import UnreadMessagesCard from "../../components/Widgets/UnreadMessagesCard";
import BuildingCard from "../../components/Widgets/BuildingCard";
import { increamentData, lineData } from "./Metrics/data";
import PieChart from "./PieChart";
import "leaflet/dist/leaflet.css";

const SamplePage = () => {
  const data = [
    { year: "1991", value: 3 },
    { year: "1992", value: 4 },
    { year: "1993", value: 3.5 },
    { year: "1994", value: 5 },
    { year: "1995", value: 4.9 },
    { year: "1996", value: 6 },
    { year: "1997", value: 7 },
    { year: "1998", value: 9 },
    { year: "1999", value: 13 },
  ];

  const config = {
    data,
    height: 400,
    xField: "year",
    yField: "value",
    point: {
      size: 5,
      shape: "diamond",
    },
  };

  const data01 = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
    { name: "Group E", value: 278 },
    { name: "Group F", value: 189 },
  ];

  const data02 = [
    { name: "Group A", value: 2400 },
    { name: "Group B", value: 4567 },
    { name: "Group C", value: 1398 },
    { name: "Group D", value: 9800 },
    { name: "Group E", value: 3908 },
    { name: "Group F", value: 4800 },
  ];
  return (
    <div>
      <Row>
        <Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <ChartCard
            prize="$9,626"
            title="23"
            icon="bitcoin"
            children={
              <ResponsiveContainer width="100%" height={75}>
                <AreaChart
                  data={increamentData}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <Tooltip />
                  <defs>
                    <linearGradient id="color3" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="5%" stopColor="#163469" stopOpacity={0.9} />
                      <stop
                        offset="95%"
                        stopColor="#FE9E15"
                        stopOpacity={0.9}
                      />
                    </linearGradient>
                  </defs>
                  <Area
                    dataKey="price"
                    strokeWidth={0}
                    stackId="2"
                    stroke="#4D95F3"
                    fill="url(#color3)"
                    fillOpacity={1}
                  />
                </AreaChart>
              </ResponsiveContainer>
            }
            styleName="up"
            desc="Customer"
          />
        </Col>
        <Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <ChartCard
            prize="$7,831"
            title="07"
            icon="etherium"
            children={
              <ResponsiveContainer width="100%" height={75}>
                <AreaChart
                  data={increamentData}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <Tooltip />
                  <defs>
                    <linearGradient id="color4" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="5%" stopColor="#4ECDE4" stopOpacity={0.9} />
                      <stop
                        offset="95%"
                        stopColor="#06BB8A"
                        stopOpacity={0.9}
                      />
                    </linearGradient>
                  </defs>
                  <Area
                    dataKey="price"
                    type="monotone"
                    strokeWidth={0}
                    stackId="2"
                    stroke="#4D95F3"
                    fill="url(#color4)"
                    fillOpacity={1}
                  />
                </AreaChart>
              </ResponsiveContainer>
            }
            styleName="up"
            desc="SP"
          />
        </Col>
        <Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <ChartCard
            prize="$1,239"
            title="08"
            icon="ripple"
            children={
              <ResponsiveContainer width="100%" height={75}>
                <AreaChart
                  data={increamentData}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <Tooltip />
                  <defs>
                    <linearGradient id="color5" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#e81a24" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#FEEADA"
                        stopOpacity={0.8}
                      />
                    </linearGradient>
                  </defs>
                  <Area
                    dataKey="price"
                    strokeWidth={0}
                    stackId="2"
                    stroke="#FEEADA"
                    fill="url(#color5)"
                    fillOpacity={1}
                  />
                </AreaChart>
              </ResponsiveContainer>
            }
            styleName="down"
            desc="SM"
          />
        </Col>
        <Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <ChartCard
            prize="$849"
            title="47"
            icon="litcoin"
            children={
              <ResponsiveContainer width="100%" height={75}>
                <LineChart
                  data={lineData}
                  margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                >
                  <Tooltip />
                  <Line
                    dataKey="price"
                    stroke="#038FDE"
                    dot={{ stroke: "#FEA931", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            }
            styleName="down"
            desc="SPK"
          />
        </Col>
        <Col xl={12} lg={24} md={12} sm={24} xs={24}>
          <Portfolio />
        </Col>
        <Col xl={12} lg={24} md={12} sm={24} xs={24}>
          <BalanceHistory />
        </Col>
      </Row>
      <Row>
        <Col xl={4} lg={12} md={12} sm={12} xs={24}>
          <PhotosCard />
        </Col>
        <Col xl={4} lg={12} md={12} sm={12} xs={24}>
          <UnreadMessagesCard />
        </Col>
        <Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <BuildingCard />
        </Col>
        <Col xl={4} lg={12} md={12} sm={12} xs={24}>
          <PhotosCard />
        </Col>
        <Col xl={4} lg={12} md={12} sm={12} xs={24}>
          <UnreadMessagesCard />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={6}>
          <Card title="Customer" bordered={false}>
            Card content
          </Card>
        </Col>
        <Col span={6}>
          <Card title="SP" bordered={false}>
            Card content
          </Card>
        </Col>
        <Col span={6}>
          <Card title="SM" bordered={false}>
            Card content
          </Card>
        </Col>
        <Col span={6}>
          <Card title="SPK" bordered={false}>
            Card content
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Card title="SPK Grafik" bordered={false}>
            <ReactFrappeChart
              type="bar"
              colors={["#21ba45"]}
              axisOptions={{
                xAxisMode: "tick",
                yAxisMode: "tick",
                xIsSeries: 1,
              }}
              height={250}
              data={{
                labels: [
                  "Sun",
                  "Mon",
                  "Tue",
                  "Wed",
                  "Thu",
                  "Fri",
                  "Sat",
                  "Sun",
                ],
                datasets: [{ values: [18, 40, 30, 35, 8, 52, 17, 4] }],
              }}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Persentase Penjualan" bordered={false}>
            <PieChart
              labels={["Man", "Woman"]}
              data={[25, 75]}
              colors={["yellow", "red"]}
              height={250}
            />
          </Card>
        </Col>
      </Row>
      {/* <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer> */}
    </div>
  );
};

export default SamplePage;
