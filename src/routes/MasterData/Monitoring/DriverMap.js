import { Card } from 'antd'
import React, { useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'

function DriverMap() {
  const [showDriverTable, setShowDriverTable] = useState(true)
  const [showOrderDriver, setShowOrderDriver] = useState(true)

  const driverData = [
    { id: 1, status: "Online", driver: "Driver 1", contact: "1234567890", location: "Location 1", date: "2023-05-21", update: "2023-05-21" },
    { id: 2, status: "Offline", driver: "Driver 2", contact: "0987654321", location: "Location 2", date: "2023-05-21", update: "2023-05-21" },
    { id: 3, status: "Offline", driver: "Driver 3", contact: "0987654321", location: "Location 2", date: "2023-05-21", update: "2023-05-21" }
  ]

  return (
    <div>
      <Row>
        <Card>
          <Col>
          <Card>
            <p className='d-flex justify-content-center'>ceritanya gambar location</p>
          </Card>
            <Button size='sm' onClick={() => setShowDriverTable(!showDriverTable)}>
               Driver Location
            </Button>
            {showDriverTable && (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Status</th>
                    <th>Driver</th>
                    <th>Contact</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Update</th>
                  </tr>
                </thead>
                <tbody>
                  {driverData.map((data) => (
                    <tr key={data.id}>
                      <td>{data.id}</td>
                      <td>{data.status}</td>
                      <td>{data.driver}</td>
                      <td>{data.contact}</td>
                      <td>{data.location}</td>
                      <td>{data.date}</td>
                      <td>{data.update}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
            <br/>
            <Button size='sm' onClick={() => setShowOrderDriver(!showOrderDriver)}>
              Order Driver
            </Button>
            {showOrderDriver && (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Driver</th>
                    <th>Keterangan</th>
                    <th>Custumer</th>
                    <th>Tujuan</th>
                    <th>Date Update</th>
                  </tr>
                </thead>
                <tbody>
                  {driverData.map((data) => (
                    <tr key={data.id}>
                      <td>{data.id}</td>
                      <td>{data.driver}</td>
                      <td>{data.contact}</td>
                      <td>{data.date}</td>
                      <td>{data.location}</td>
                      <td>{data.date}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Col>
        </Card>
      </Row>
    </div>
  )
}

export default DriverMap
