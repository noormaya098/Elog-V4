import React, { useState } from "react";
import { Form, Row, Col, Dropdown, Button } from "react-bootstrap";

const SamplePage = () => {
  const [destination, setDestination] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [via, setVia] = useState("");
  const [shipment, setShipment] = useState("");
  const [items, setItems] = useState([
    { weight: "", qty: "", koli: "", volume: "", price: "", unloadPrice: "" },
  ]);

  const handleDestinationChange = (event) => {
    setDestination(event.target.value);
  };

  const handleVehicleChange = (event) => {
    setVehicle(event.target.value);
  };

  const handleViaChange = (event) => {
    setVia(event.target.value);
  };

  const handleShipmentChange = (event) => {
    setShipment(event.target.value);
  };

  const handleItemsChange = (index, event) => {
    const values = [...items];
    values[index][event.target.name] = event.target.value;
    setItems(values);
  };

  const addNewItem = () => {
    setItems([
      ...items,
      { weight: "", qty: "", koli: "", volume: "", price: "", unloadPrice: "" },
    ]);
  };

  return (
    <Form>
      <Form.Group as={Row} controlId="formDestination">
        <Form.Label column sm={2}>
          Destination Address
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            as="select"
            value={destination}
            onChange={handleDestinationChange}
          >
            <option value="">Select Destination</option>
            <option value="destination1">Destination 1</option>
            <option value="destination2">Destination 2</option>
            <option value="destination3">Destination 3</option>
          </Form.Control>
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formVehicle">
        <Form.Label column sm={2}>
          Vehicle
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            as="select"
            value={vehicle}
            onChange={handleVehicleChange}
          >
            <option value="">Select Vehicle</option>
            <option value="vehicle1">Vehicle 1</option>
            <option value="vehicle2">Vehicle 2</option>
            <option value="vehicle3">Vehicle 3</option>
          </Form.Control>
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formVia">
        <Form.Label column sm={2}>
          Via
        </Form.Label>
        <Col sm={10}>
          <Form.Control as="select" value={via} onChange={handleViaChange}>
            <option value="">Select Via</option>
            <option value="via1">Via 1</option>
            <option value="via2">Via 2</option>
            <option value="via3">Via 3</option>
          </Form.Control>
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formShipment">
        <Form.Label column sm={2}>
          Shipment
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            as="select"
            value={shipment}
            onChange={handleShipmentChange}
          >
            <option value="">Select Shipment</option>
            <option value="shipment1">Shipment 1</option>
            <option value="shipment2">Shipment 2</option>
            <option value="shipment3">Shipment 3</option>
          </Form.Control>
        </Col>
      </Form.Group>
      {items.map((item, index) => (
        <div key={index}>
          <Form.Group as={Row} controlId={`formWeight${index}`}>
            <Form.Label column sm={2}>
              Weight
            </Form.Label>
            <Col sm={4}>
              <Form.Control
                type="number"
                name="weight"
                value={item.weight}
                onChange={(e) => handleItemsChange(index, e)}
              />
            </Col>

            <Form.Label column sm={2}>
              Qty
            </Form.Label>
            <Col sm={4}>
              <Form.Control
                type="number"
                name="qty"
                value={item.qty}
                onChange={(e) => handleItemsChange(index, e)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId={`formKoli${index}`}>
            <Form.Label column sm={2}>
              Koli
            </Form.Label>
            <Col sm={4}>
              <Form.Control
                type="number"
                name="koli"
                value={item.koli}
                onChange={(e) => handleItemsChange(index, e)}
              />
            </Col>

            <Form.Label column sm={2}>
              Volume
            </Form.Label>
            <Col sm={4}>
              <Form.Control
                type="number"
                name="volume"
                value={item.volume}
                onChange={(e) => handleItemsChange(index, e)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId={`formPrice${index}`}>
            <Form.Label column sm={2}>
              Price
            </Form.Label>
            <Col sm={4}>
              <Form.Control
                type="number"
                name="price"
                value={item.price}
                onChange={(e) => handleItemsChange(index, e)}
              />
            </Col>

            <Form.Label column sm={2}>
              Unload Price
            </Form.Label>
            <Col sm={4}>
              <Form.Control
                type="number"
                name="unloadPrice"
                value={item.unloadPrice}
                onChange={(e) => handleItemsChange(index, e)}
              />
            </Col>
          </Form.Group>
        </div>
      ))}

      <Button variant="primary" onClick={addNewItem}>
        Add Item
      </Button>
    </Form>
  );
};

export default SamplePage;
