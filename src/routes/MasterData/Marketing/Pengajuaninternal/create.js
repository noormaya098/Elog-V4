import { Button, Card, Col, DatePicker, Form, Input, Row, Select } from "antd";
import React from "react";
import { Field, Formik,ErrorMessage } from "formik";
import * as Yup from "yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


const { Option } = Select;

const CreatePengajuaninternal = () => {
  const initialValues = {
    noPengajuan: "",
    pemohon: null,
    divisi: null,
    noSurat: "",
    perihal: null,
    tglSurat: null,
    judulSurat: "",
    isiSurat: "",
  };

  const validationSchema = Yup.object().shape({
    noPengajuan: Yup.string().required("Required"),
    pemohon: Yup.object().nullable().required("Required"),
    divisi: Yup.object().nullable().required("Required"),
    noSurat: Yup.string().required("Required"),
    perihal: Yup.object().nullable().required("Required"),
    tglSurat: Yup.date().required("Required"),
    judulSurat: Yup.string().required("Required"),
    isiSurat: Yup.string().required("Required"),
  });

  const optionsPemohon = [
    { value: "John Doe", label: "John Doe" },
    { value: "Jane Doe", label: "Jane Doe" },
    { value: "Bob Smith", label: "Bob Smith" },
  ];

  const optionsDivisi = [
    { value: "Divisi A", label: "Divisi A" },
    { value: "Divisi B", label: "Divisi B" },
    { value: "Divisi C", label: "Divisi C" },
  ];

  const optionsPerihal = [
    { value: "Perihal A", label: "Perihal A" },
    { value: "Perihal B", label: "Perihal B" },
    { value: "Perihal C", label: "Perihal C" },
  ];

  const onFinish = (values) => {
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <div>
      <Card>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onFinish}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            isSubmitting,
          }) => (
            <Form layout="vertical" onFinish={handleSubmit}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="No Pengajuan"
                    name="noPengajuan"
                    validateStatus={errors.noPengajuan && touched.noPengajuan ? "error" : ""}
                    help={errors.noPengajuan && touched.noPengajuan ? errors.noPengajuan : null}
                  >
                    <Input onChange={handleChange} onBlur={handleBlur} value={values.noPengajuan} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Pemohon"
                    name="pemohon"
                    validateStatus={errors.pemohon && touched.pemohon ? "error" : ""}
                    help={errors.pemohon && touched.pemohon ? errors.pemohon : null}
                  >
                    <Select options={optionsPemohon} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Divisi"
                    name="divisi"
                    validateStatus={errors.divisi && touched.divisi ? "error" : ""}
                    help={errors.divisi && touched.divisi ? errors.divisi : null}
                  >
                    <Select options={optionsDivisi} />
                  </Form.Item>
                </Col>
                
                </Row>
                <div className="form-item">
                    <label htmlFor="perihal">Perihal</label>
                    <Select
                      options={optionsPerihal}
                      name="perihal"
                      onChange={(value) => setFieldValue("perihal", value)}
                    />
                    <ErrorMessage name="perihal" component="div" className="error-message" />
                  </div>

                  <div className="form-item">
                    <label htmlFor="tglSurat">Tgl Surat</label>
                    <DatePicker
                      selected={values.tglSurat}
                      onChange={(date) => setFieldValue("tglSurat", date)}
                      className={touched.tglSurat && errors.tglSurat ? "error" : ""}
                    />
                    <ErrorMessage name="tglSurat" component="div" className="error-message" />
                  </div>

                  <div className="form-item">
                    <label htmlFor="judulSurat">Judul Surat</label>
                    <Field type="text" name="judulSurat" className={touched.judulSurat && errors.judulSurat ? "error" : ""} />
                    <ErrorMessage name="judulSurat" component="div" className="error-message" />
                  </div>


                <div className="form-item">
                  <label htmlFor="isiSurat">Isi Surat</label>
                  <ReactQuill
                    value={values.isiSurat}
                    onChange={(value) => setFieldValue("isiSurat", value)}
                    className={touched.isiSurat && errors.isiSurat ? "error" : ""}
                  />
                  <ErrorMessage name="isiSurat" component="div" className="error-message" />
                </div>


                  <div className="form-actions">
                    <Button type="primary" htmlType="submit" disabled={isSubmitting}>
                      Submit
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
            </Card>
          </div>
          
        
  );

};

export default CreatePengajuaninternal;

