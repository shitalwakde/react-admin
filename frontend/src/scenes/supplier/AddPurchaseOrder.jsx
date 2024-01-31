import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Select,
  MenuItem,
  Box,
  Button,
  TextField,
  InputLabel,
  FormControl,
  InputAdornment,
} from "@mui/material";
import { Formik, FormikConsumer } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import toast from "react-hot-toast";
import EventIcon from "@mui/icons-material/Event";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const newLocal = {
  // purchase order
  poNo: "",
  poDate: "",
  taxType: "",
  supplierInvoiceNo: "",
  // supplier
  supplierId: "",
  supplierName: "",
  address: "",
  state: "",
  contactNo: "",
  balance: "",
  // subContractor
  subContractorname: "",
  subContractorId: "",
  projectName: "",
  projectId: "",
  // product
  productCode: "",
  HSNCode: "",
  productname: "",
  quantity: "",
  pricePerUnit: "",
  discount: "",
  discPercent:"",
  discAmt:"",
  taxableAmt: "",
  cgst: "",
  cgstAmt: "",
  sgst: "",
  sgstAmt: "",
  igst: "",
  igstAmt: "",
  cess: "",
  cessAmt: "",
  totalAmt: "",

  // total
  totalPrice: "",
  totalDiscount: "",
  subTotal: "",
  totalCgst: "",
  totalSgst: "",
  totalIgst: "",
  totalCess: "",
  grandTotal: "",
};

const AddPurchaseOrder = () => {
  const [initialValues, setInitialValues] = useState(newLocal);
  const [selectedValues, setSelectedValues] = useState({});
  const [companyData, setCompanyData] = useState([]);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isFromDatePickerOpen, setFromDatePickerOpen] = useState(false);
  const navigate = useNavigate();

  const handleReset = () => {};

  const handleAdd = () => {};

  const handleNew = () => {};

  const handleExit = () => {};

  const handleSave = () => {};

  const handleDetail = () => {};

  const handleFormSubmit = () => {};

  return (
    <Box m="30px" paddingBottom="20px">
      <Header title="Purchase Order" />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        <FormikConsumer>
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
                <Box m="20px"> 
                <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 4",
                  },
                  border: "1px solid #ccc",
                  padding: "15px",
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="PO No"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.poNo}
                  name="poNo"
                  error={!!touched.poNo && !!errors.poNo}
                  helperText={touched.poNo && errors.poNo}
                  sx={{ gridColumn: "span 1" }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="PO Date(MM-dd-yyyy)"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={
                    values.poDate ? format(values.poDate, "MM-dd-yyyy") : ""
                  }
                  name="poDate"
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        onClick={() => setFromDatePickerOpen(true)}
                      >
                        <EventIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ gridColumn: "span 1" }}
                />
                {isFromDatePickerOpen && (
                  <DatePicker
                    placeholderText="Select date"
                    selected={values.poDate}
                    onChange={(date) => {
                      setFieldValue("poDate", date); // Use "dob" as the field name
                      setFromDatePickerOpen(false);
                    }}
                    onBlur={() => setFromDatePickerOpen(false)}
                  />
                )}
                <FormControl
                  fullWidth
                  variant="filled"
                  sx={{ gridColumn: "span 1" }}
                >
                  <InputLabel htmlFor="taxType">Select Tax Type</InputLabel>
                  <Select
                    value={values.taxType}
                    onChange={handleChange}
                    name="taxType"
                    onBlur={handleBlur}
                    error={!!errors.taxType}
                  >
                    <MenuItem value="Exclusive">Exclusive</MenuItem>
                    <MenuItem value="Exclusive">Exclusive</MenuItem>
                  </Select>
                  {!!errors.taxType && (
                    <Box color="red" mt={1} sx={{ fontSize: "0.6rem" }}>
                      {errors.taxType}
                    </Box>
                  )}
                </FormControl>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Supplier Invoice No"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.supplierInvoiceNo}
                  name="supplierInvoiceNo"
                  error={
                    !!touched.supplierInvoiceNo && !!errors.supplierInvoiceNo
                  }
                  helperText={
                    touched.supplierInvoiceNo && errors.supplierInvoiceNo
                  }
                  sx={{ gridColumn: "span 1" }}
                />
              </Box>
              <Box
                marginTop="30px"
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 4",
                  },
                  border: "1px solid #ccc",
                  padding: "15px",
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Supplier ID"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.supplierId}
                  name="supplierId"
                  error={!!touched.supplierId && !!errors.supplierId}
                  helperText={touched.supplierId && errors.supplierId}
                  sx={{ gridColumn: "span 1" }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <FormControl
                  fullWidth
                  variant="filled"
                  sx={{ gridColumn: "span 1" }}
                >
                  <InputLabel htmlFor="supplierName">
                    Select Supplier Name
                  </InputLabel>
                  <Select
                    value={values.supplierName}
                    onChange={handleChange}
                    name="supplierName"
                    onBlur={handleBlur}
                    error={!!errors.supplierName}
                  >
                    <MenuItem value="supplierId">Karan singh</MenuItem>
                    <MenuItem value="supplierId">Karan singh</MenuItem>
                  </Select>
                  {!!errors.supplierName && (
                    <Box color="red" mt={1} sx={{ fontSize: "0.6rem" }}>
                      {errors.supplierName}
                    </Box>
                  )}
                </FormControl>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.address}
                  name="address"
                  error={!!touched.address && !!errors.address}
                  helperText={touched.address && errors.address}
                  sx={{ gridColumn: "span 1" }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="State"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.state}
                  name="state"
                  error={!!touched.state && !!errors.state}
                  helperText={touched.state && errors.state}
                  sx={{ gridColumn: "span 1" }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Contact No"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.contactNo}
                  name="contactNo"
                  error={!!touched.contactNo && !!errors.contactNo}
                  helperText={touched.contactNo && errors.contactNo}
                  sx={{ gridColumn: "span 1" }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Balance"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.balance}
                  name="balance"
                  error={!!touched.balance && !!errors.balance}
                  helperText={touched.balance && errors.balance}
                  sx={{ gridColumn: "span 1" }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Box>
              <Box
                marginTop="30px"
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 4",
                  },
                  border: "1px solid #ccc",
                  padding: "15px",
                }}
              >
                <FormControl
                  fullWidth
                  variant="filled"
                  sx={{ gridColumn: "span 1" }}
                >
                  <InputLabel htmlFor="subContractorname">
                    Select SubContractor Name
                  </InputLabel>
                  <Select
                    value={values.subContractorname}
                    onChange={handleChange}
                    name="subContractorname"
                    onBlur={handleBlur}
                    error={!!errors.subContractorname}
                  >
                    <MenuItem value="SubContractorId">Karan singh</MenuItem>
                    <MenuItem value="SubContractorId">Karan singh</MenuItem>
                  </Select>
                  {!!errors.subContractorname && (
                    <Box color="red" mt={1} sx={{ fontSize: "0.6rem" }}>
                      {errors.subContractorname}
                    </Box>
                  )}
                </FormControl>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="SubContractor ID"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.SubContractorId}
                  name="SubContractorId"
                  error={!!touched.SubContractorId && !!errors.SubContractorId}
                  helperText={touched.SubContractorId && errors.SubContractorId}
                  sx={{ gridColumn: "span 1" }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <FormControl
                  fullWidth
                  variant="filled"
                  sx={{ gridColumn: "span 1" }}
                >
                  <InputLabel htmlFor="supplierName">
                    Select Project Name
                  </InputLabel>
                  <Select
                    value={values.projectName}
                    onChange={handleChange}
                    name="projectName"
                    onBlur={handleBlur}
                    error={!!errors.projectName}
                  >
                    <MenuItem value="projectId">Karan singh</MenuItem>
                    <MenuItem value="projectId">Karan singh</MenuItem>
                  </Select>
                  {!!errors.projectName && (
                    <Box color="red" mt={1} sx={{ fontSize: "0.6rem" }}>
                      {errors.projectName}
                    </Box>
                  )}
                </FormControl>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="project ID"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.projectId}
                  name="projectId"
                  error={!!touched.projectId && !!errors.projectId}
                  helperText={touched.projectId && errors.projectId}
                  sx={{ gridColumn: "span 1" }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Box>
              <Box
                marginTop="30px"
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 4",
                  },
                  border: "1px solid #ccc",
                  padding: "15px",
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Product Code"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.productCode}
                  name="productCode"
                  error={!!touched.productCode && !!errors.productCode}
                  helperText={touched.productCode && errors.productCode}
                  sx={{ gridColumn: "span 1" }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="HSN Code"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.HSNCode}
                  name="HSNCode"
                  error={!!touched.HSNCode && !!errors.HSNCode}
                  helperText={touched.HSNCode && errors.HSNCode}
                  sx={{ gridColumn: "span 1" }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <FormControl
                  fullWidth
                  variant="filled"
                  sx={{ gridColumn: "span 1" }}
                >
                  <InputLabel htmlFor="productname">
                    Select Product Name
                  </InputLabel>
                  <Select
                    value={values.productname}
                    onChange={handleChange}
                    name="productname"
                    onBlur={handleBlur}
                    error={!!errors.productname}
                  >
                    <MenuItem value="productCode">Karan singh</MenuItem>
                    <MenuItem value="productCode">Karan singh</MenuItem>
                  </Select>
                  {!!errors.productname && (
                    <Box color="red" mt={1} sx={{ fontSize: "0.6rem" }}>
                      {errors.productname}
                    </Box>
                  )}
                </FormControl>

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Quantity(In Unit)"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.quantity}
                  name="quantity"
                  error={!!touched.quantity && !!errors.quantity}
                  helperText={touched.quantity && errors.quantity}
                  sx={{ gridColumn: "span 1" }}
                />
              </Box>
              <Box
                marginTop="30px"
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 4",
                  },
                  border: "1px solid #ccc",
                  padding: "15px",
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Price Per Unit"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.pricePerUnit}
                  name="pricePerUnit"
                  error={!!touched.pricePerUnit && !!errors.pricePerUnit}
                  helperText={touched.pricePerUnit && errors.pricePerUnit}
                  sx={{ gridColumn: "span 1" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Taxable Amount"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.taxableAmt}
                  name="taxableAmt"
                  error={!!touched.taxableAmt && !!errors.taxableAmt}
                  helperText={touched.taxableAmt && errors.taxableAmt}
                  sx={{ gridColumn: "span 1" }}
                />
                <FormControl
                  fullWidth
                  variant="filled"
                  sx={{ gridColumn: "span 1" }}
                >
                  <InputLabel htmlFor="discount">
                    Select Discount
                  </InputLabel>
                  <Select
                    value={values.discount}
                    onChange={handleChange}
                    name="discount"
                    onBlur={handleBlur}
                    error={!!errors.discount}
                  >
                    <MenuItem value="0">%</MenuItem>
                    <MenuItem value="1">Amt</MenuItem>
                  </Select>
                  {!!errors.discount && (
                    <Box color="red" mt={1} sx={{ fontSize: "0.6rem" }}>
                      {errors.discount}
                    </Box>
                  )}
                </FormControl>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="%"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.discPercent}
                  name="discPercent"
                  error={!!touched.discPercent && !!errors.discPercent}
                  helperText={touched.discPercent && errors.discPercent}
                  sx={{ gridColumn: "span 1" }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Amount"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.discAmt}
                  name="discAmt"
                  error={!!touched.discAmt && !!errors.discAmt}
                  helperText={touched.discAmt && errors.discAmt}
                  sx={{ gridColumn: "span 1" }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="CGST"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.cgst}
                  name="cgst"
                  error={!!touched.cgst && !!errors.cgst}
                  helperText={touched.cgst && errors.cgst}
                  sx={{ gridColumn: "span 1" }}
                  />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Amount"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.cgstAmt}
                  name="cgstAmt"
                  error={!!touched.cgstAmt && !!errors.cgstAmt}
                  helperText={touched.cgstAmt && errors.cgstAmt}
                  sx={{ gridColumn: "span 1" }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="SGST"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.sgst}
                  name="sgst"
                  error={!!touched.sgst && !!errors.sgst}
                  helperText={touched.sgst && errors.sgst}
                  sx={{ gridColumn: "span 1" }}
                  />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Amount"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.sgstAmt}
                  name="sgstAmt"
                  error={!!touched.sgstAmt && !!errors.sgstAmt}
                  helperText={touched.sgstAmt && errors.sgstAmt}
                  sx={{ gridColumn: "span 1" }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="IGST"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.igst}
                  name="igst"
                  error={!!touched.igst && !!errors.igst}
                  helperText={touched.igst && errors.igst}
                  sx={{ gridColumn: "span 1" }}
                  />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Amount"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.igstAmt}
                  name="igstAmt"
                  error={!!touched.igstAmt && !!errors.igstAmt}
                  helperText={touched.igstAmt && errors.igstAmt}
                  sx={{ gridColumn: "span 1" }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="CESS"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.cess}
                  name="cess"
                  error={!!touched.cess && !!errors.cess}
                  helperText={touched.cess && errors.cess}
                  sx={{ gridColumn: "span 1" }}
                  />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Amount"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.cessAmt}
                  name="cessAmt"
                  error={!!touched.cessAmt && !!errors.cessAmt}
                  helperText={touched.cessAmt && errors.cessAmt}
                  sx={{ gridColumn: "span 1" }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Total Amount"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.totalAmt}
                  name="totalAmt"
                  error={!!touched.totalAmt && !!errors.totalAmt}
                  helperText={touched.totalAmt && errors.totalAmt}
                  sx={{ gridColumn: "span 1" }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Box>
              <Box display="flex" justifyContent="flex-end" mt="30px">
                <Button
                  type="submit"
                  color="bluecolor"
                  variant="contained"
                  sx={{
                    mr: 4,
                    fontSize: ".9rem",
                    color: "white",
                    backgroundColor: "blue",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                  }}
                  onClick={handleReset}
                >
                  RESET
                </Button>
                <Button
                  type="button"
                  color="redcolor"
                  variant="contained"
                  sx={{
                    fontSize: ".9rem",
                    color: "white",
                    backgroundColor: "green",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                  }}
                  onClick={handleAdd}
                >
                  ADD
                </Button>
              </Box>
              <Box
                marginTop="30px"
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 4",
                  },
                  border: "1px solid #ccc",
                  padding: "15px",
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Total Price"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.totalPrice}
                  name="totalPrice"
                  error={!!touched.totalPrice && !!errors.totalPrice}
                  helperText={touched.totalPrice && errors.totalPrice}
                  sx={{ gridColumn: "span 1" }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Discount"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.discount}
                  name="discount"
                  error={!!touched.discount && !!errors.discount}
                  helperText={touched.discount && errors.discount}
                  sx={{ gridColumn: "span 1" }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Sub Total"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.subTotal}
                  name="subTotal"
                  error={!!touched.subTotal && !!errors.subTotal}
                  helperText={touched.subTotal && errors.subTotal}
                  sx={{ gridColumn: "span 1" }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="CGST"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.cgst}
                  name="cgst"
                  error={!!touched.cgst && !!errors.cgst}
                  helperText={touched.cgst && errors.cgst}
                  sx={{ gridColumn: "span 1" }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="SGST"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.sgst}
                  name="sgst"
                  error={!!touched.sgst && !!errors.sgst}
                  helperText={touched.sgst && errors.sgst}
                  sx={{ gridColumn: "span 1" }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="IGST"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.igst}
                  name="igst"
                  error={!!touched.igst && !!errors.igst}
                  helperText={touched.igst && errors.igst}
                  sx={{ gridColumn: "span 1" }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="CESS"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.cess}
                  name="cess"
                  error={!!touched.cess && !!errors.cess}
                  helperText={touched.cess && errors.cess}
                  sx={{ gridColumn: "span 1" }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="GrandTotal"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.grandTotal}
                  name="grandTotal"
                  error={!!touched.grandTotal && !!errors.grandTotal}
                  helperText={touched.grandTotal && errors.grandTotal}
                  sx={{ gridColumn: "span 1" }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Box>
              <Box display="flex" justifyContent="flex-end" mt="30px">
                <Button
                  type="submit"
                  color="bluecolor"
                  variant="contained"
                  sx={{
                    mr: 4,
                    fontSize: ".9rem",
                    color: "white",
                    backgroundColor: "orange",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                  }}
                  onClick={handleNew}
                >
                  NEW
                </Button>
                <Button
                  type="button"
                  color="redcolor"
                  variant="contained"
                  sx={{
                    fontSize: ".9rem",
                    color: "white",
                    backgroundColor: "blue",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                  }}
                  onClick={handleSave}
                >
                  SAVE
                </Button>
                <Button
                  type="button"
                  color="greencolor"
                  variant="contained"
                  sx={{
                    mr: 4,
                    marginLeft: 4,
                    fontSize: ".9rem",
                    color: "white",
                    backgroundColor: "green",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                  }}
                  onClick={handleDetail}
                >
                  DETAILS
                </Button>
                <Button
                  type="button"
                  color="greencolor"
                  variant="contained"
                  sx={{
                    mr: 4,
                    marginLeft: 4,
                    fontSize: ".9rem",
                    color: "white",
                    backgroundColor: "red",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                  }}
                  onClick={handleExit}
                >
                  EXIT
                </Button>
              </Box>
                </Box>              
            </form>
          )}
        </FormikConsumer>
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  vendorName: yup.string().required("required"),
  businessName: yup.string().required("required"),
});

export default AddPurchaseOrder;
