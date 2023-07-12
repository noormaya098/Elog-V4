import { Card } from "antd";
import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button, Table } from "react-bootstrap";
import employee from "./employee.png";
import "./DetailSJ.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Baseurl from "../../../../../Api/BaseUrl";
function DetailSJ() {
    const { id } = useParams();
    const [isiDetail , setIsidetails ] = useState([])
    console.log(`ini id`,id);
    
    useEffect(()=>{

        const detail = async () => {
            const isi = await axios.get(`${Baseurl}sm/get-SM-detail?id_msm=${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            });
            const detail = isi.data.data
            setIsidetails(detail)
            console.log(detail);
        }
        detail()
    },[])



  return (
    <div>
      <Card>
        <div className="imageContainer">
          <img
            className="employeeImage"
            src={employee}
            alt="Employee"
            width="300px"
          />
        </div>
        <Row>
          <Col sm={4}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="disabledSelect">No.SP :</Form.Label>
              <Form.Control id="disabledSelect"></Form.Control>
            </Form.Group>
          </Col>
          <Col sm={4}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="disabledSelect">Pickup Address :</Form.Label>
              <Form.Control id="disabledSelect"></Form.Control>
            </Form.Group>
          </Col>
          
        </Row>
        <Row>
          <Col sm={4}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="disabledSelect">No. SM :</Form.Label>
              <Form.Control value={isiDetail?.msm} id="disabledSelect"></Form.Control>
            </Form.Group>
          </Col>
          <Col sm={4}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="disabledSelect">
                Destination Address :
              </Form.Label>
              <Form.Control id="disabledSelect"></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={4}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="disabledSelect">DO :</Form.Label>
              <Form.Control id="disabledSelect"></Form.Control>
            </Form.Group>
          </Col>
          <Col sm={2}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="disabledSelect">Weight :</Form.Label>
              <Form.Control id="disabledSelect"></Form.Control>
            </Form.Group>
          </Col>
          <Col sm={2}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="disabledSelect">Koli :</Form.Label>
              <Form.Control id="disabledSelect"></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={4}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="disabledSelect">Service :</Form.Label>
              <Form.Control disabled></Form.Control>
            </Form.Group>
          </Col>
          <Col sm={2}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="disabledSelect">Exp/pcs :</Form.Label>
              <Form.Control id="disabledSelect"></Form.Control>
            </Form.Group>
          </Col>
          <Col sm={2}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="disabledSelect">Items :</Form.Label>
              <Form.Control id="disabledSelect"></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={4}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="disabledSelect">Customer :</Form.Label>
              <Form.Control disabled></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={4}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="disabledSelect">Pickup Date :</Form.Label>
              <Form.Control value={isiDetail?.tgl_muat} disabled></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={8}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="disabledSelect">Memo :</Form.Label>
              <Form.Control></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={8}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="disabledSelect">
                Destination Address :
              </Form.Label>
              <div className="d-flex align-items-center">
                <Form.Control className="mr-2 mb-3">
                </Form.Control>
              </div>
            </Form.Group>
          </Col>
        </Row>
        <br />
        <hr />
        <br />
        <Row>
          <Col sm={4}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="disabledSelect">
                Kendaraan Pickup :
              </Form.Label>
              <Form.Select className="mr-2 mb-3">
                <option>-</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col sm={4}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="disabledSelect">Mitra 1:</Form.Label>
              <Form.Select className="mr-2 mb-3">
                <option>-</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col sm={4}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="disabledSelect">Mitra 2:</Form.Label>
              <Form.Select className="mr-2 mb-3">
                <option>-</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={4}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="disabledSelect">Vehicle Pickup:</Form.Label>
              <Form.Select className="mr-2 mb-3">
                <option>-</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col sm={4}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="disabledSelect">Vehicle 1:</Form.Label>
              <Form.Select className="mr-2 mb-3">
                <option>-</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col sm={4}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="disabledSelect">Vehicle 2:</Form.Label>
              <Form.Select className="mr-2 mb-3">
                <option>-</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={4}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="disabledSelect">
                Kontainer Pickup:
              </Form.Label>
              <Form.Control className="mr-2 mb-3"></Form.Control>
            </Form.Group>
          </Col>
          <Col sm={4}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="disabledSelect">Kontainer 1:</Form.Label>
              <Form.Control value={isiDetail?.kontainer} className="mr-2 mb-3"></Form.Control>
            </Form.Group>
          </Col>
          <Col sm={4}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="disabledSelect">Kontainer 2:</Form.Label>
              <Form.Control className="mr-2 mb-3"></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={4}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="disabledSelect">Nopol Pickup:</Form.Label>
              <Form.Control value={isiDetail?.nopol} className="mr-2 mb-3"></Form.Control>
            </Form.Group>
          </Col>
          <Col sm={4}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="disabledSelect">Nopol 1:</Form.Label>
              <Form.Control value={isiDetail?.nopol} className="mr-2 mb-3"></Form.Control>
            </Form.Group>
          </Col>
          <Col sm={4}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="disabledSelect">Nopol 2:</Form.Label>
              <Form.Control className="mr-2 mb-3"></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={4}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="disabledSelect">Supir Pickup:</Form.Label>
              <Form.Control value={isiDetail?.pickup_supir} className="mr-2 mb-3"></Form.Control>
            </Form.Group>
          </Col>
          <Col sm={4}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="disabledSelect">Supir 1:</Form.Label>
              <Form.Control value={isiDetail?.pickup_supir} className="mr-2 mb-3"></Form.Control>
            </Form.Group>
          </Col>
          <Col sm={4}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="disabledSelect">Supir 2:</Form.Label>
              <Form.Control className="mr-2 mb-3"></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={4}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="disabledSelect">Hp Supir Pickup:</Form.Label>
              <Form.Control value={isiDetail?.telp} className="mr-2 mb-3"></Form.Control>
            </Form.Group>
          </Col>
          <Col sm={4}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="disabledSelect">Hp Supir 1:</Form.Label>
              <Form.Control value={isiDetail?.telp}  className="mr-2 mb-3"></Form.Control>
            </Form.Group>
          </Col>
          <Col sm={4}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="disabledSelect">Hp Supir 2:</Form.Label>
              <Form.Control className="mr-2 mb-3"></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <br />
        <hr />
        <br />
        <b>Comments :</b>
        <Table striped bordered hover className="mt-2">
          <thead>
            <tr>
              <th>No</th>
              <th>Comment</th>
              <th>User</th>
              <th>Tgl Comment</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td>@twitter</td>
              <td>@twitter</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </Card>
    </div>
  );
}

export default DetailSJ;
