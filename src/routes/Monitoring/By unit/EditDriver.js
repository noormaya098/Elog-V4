import React from "react";
import { Button, Modal, Row, Col, Form, Card } from "react-bootstrap";
import { useState, useEffect } from "react";

function EditDriver() {
  const [formValues, setFormValues] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // onSubmit(formValues);
  };

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "file" ? target.files[0] : target.value;
    const name = target.name;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={4}>
            <Form.Group controlId="driverImage">
              <Form.Label>Foto Driver</Form.Label>
              <Form.Control
                type="file"
                name="driverImage"
                accept="image/*"
                onChange={handleInputChange}
              />
              <Form.Text className="text-muted">Upload foto driver</Form.Text>
              {formValues.driverImage && (
                <img
                  src={URL.createObjectURL(formValues.driverImage)}
                  alt="Driver Image Preview"
                  style={{ maxWidth: "100%", marginTop: "1rem" }}
                />
              )}
            </Form.Group>
          </Col>
          <Col xs={8}>
            <Form.Group controlId="driverName">
              <Form.Label>Nama Driver</Form.Label>
              <Form.Control
                type="text"
                name="driverName"
                value={formValues.driverName}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="driverId">
              <Form.Label>ID Driver</Form.Label>
              <Form.Control
                type="text"
                name="driverId"
                value={formValues.driverId}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button type="submit" style={{ marginTop: "10px" }}>
              Simpan Perubahan
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default EditDriver;
