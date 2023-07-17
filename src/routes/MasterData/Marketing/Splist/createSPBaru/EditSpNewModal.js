import { Button, Card, Form, Input, Select, DatePicker } from 'antd'
import { Table } from 'react-bootstrap';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useParams } from "react-router-dom";
import moment from 'moment';
import * as Yup from 'yup';
import { useFormik } from 'formik'
import Swal from 'sweetalert2';
import Baseurl from '../../../../../Api/BaseUrl';
import ModalCreateDetail from '../ModalCreateDetail';
function EditSPNewModal() {
    const { idmp } = useParams();
    const [NomorSP, setNoSP] = useState("")
    const [DetailSemua, setDetailSemua] = useState("")
    const [AlamatInvoiceOptions, setAlamatInvoiceOptions] = useState("")
    const [AsuransiSelect, setAsuransiSelect] = useState('')
    const [JenisBarangSelection, setJenisBarangSelection] = useState("")
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    var counter = 1
    const DetailSP = async () => {
        try {
            const data = await axios.get(`${Baseurl}sp/get-SP-all-detail?keyword=&idmp=${idmp}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    },
                })
            setNoSP(data.data.sp)
            setDetailSemua(data.data)
            console.log(`idPerusahaan`, DetailSemua);
            formik.setValues({
                noSP: data.data.sp,
                service: data.data.service,
                jenisBarang: data.data.jenisBarang,
                customer: data.data.customer,
                pickup_date: data.data.pickup_date,
                order_date: data.data.order_date,
                bongkar_date: data.data.bongkar_date,
                asuransi: data.data.asuransi,
                alamatInvoice: data.data.alamatInvoice,
                idPerusahaan: data.data.idcustomer,
                marketing: data.data.marketing,
                telpCustomer: data.data.telpCustomer
            })
            console.log(NomorSP)

        } catch (error) {

        }
    }

    const [NamaMarketing, setNamaMarketing] = useState("")
    const DetailSPSelect = async () => {
        try {
            const data = await axios.get(`${Baseurl}sp/get-SP-select-create?keyword=&companyId=${DetailSemua.idcustomer}&divisi=sales&kode_cabang=JKT`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    },
                })
            setAlamatInvoiceOptions(data.data.data.address)
            setAsuransiSelect(data.data.data.insurance)
            setJenisBarangSelection(data.data.data.service)
            console.log(`dari edit`, data.data.data)
            setNamaMarketing(data.data.data?.marketing)
        } catch (error) {

        }
    }

    useEffect(() => {
        DetailSP()
        DetailSPSelect()
    }, [DetailSemua.idcustomer])


    const formik = useFormik({
        initialValues: {
            noSP: '',
            marketing: '',
            service: '',
            jenisbarang: '',
        },
        validationSchema: Yup.object({
            noSP: Yup.string().required('Kode Kendaraan is required'),
            marketing: Yup.string(),
            service: Yup.string(),
            jenisbarang: Yup.string(),
        }),
        onSubmit: (values) => {
            console.log(values);
        },
    });

    const EditSp = async () => {
        Swal.fire({
            title: 'Anda yakin?',
            text: "Anda tidak akan dapat mengembalikan ini!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, edit!',
            cancelButtonText: 'Tidak, batalkan!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.post(`${Baseurl}sp/edit-SP`, {
                        id_mp: idmp,
                        memo: "",
                        id_customer: DetailSemua.idcustomer,
                        jenis_barang: formik.values.jenisBarang,
                        packing: "",
                        marketing : formik.values.marketing,
                        asuransi: formik.values.asuransi,
                        tgl_pickup: formik.values.pickup_date,
                        tgl_bongkar: formik.values.bongkar_date,
                        service: formik.values.service,
                        alamat_invoice: formik.values.alamatInvoice,
                        biaya_muat: "",
                        biaya_muat_bongkar: "",
                        overtonase: "",
                        biaya_multi_drop: "",
                        biaya_lain: "",
                        diskon: "",
                        total_keseluruhan: ""
                    }, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: localStorage.getItem("token"),
                        },
                    });
                    DetailSP()
                    Swal.fire(
                        'Berhasil!',
                        'Data telah diedit.',
                        'success'
                    );
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Permintaan gagal',
                    });
                }
            }
        });
    }



    return (
        <div>
            {/* <Card> */}
          
            <ModalCreateDetail
                idmp={idmp} DetailSP={DetailSP} JenisBarangFormik={formik.values.jenisBarang} AlamatInvoiceOptions={AlamatInvoiceOptions} DetailSemua={DetailSemua} />
            {/* </Card> */}
        </div>
    )
}

export default EditSPNewModal