import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Select,
  MenuItem,
  Box,
  Button,
  TextField,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Formik, FormikConsumer } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import toast from "react-hot-toast";
import FormControlLabel from "@mui/material/FormControlLabel";


const newLocal = {
  paymentForm: "",
  billAmount: "",
  raNumber: "",
  bankName: "",
  project: "",
  paymentNode: "",
  transactionNo: "",
};


const AddRABill = () => {
  const [initialValues, setInitialValues] = useState(newLocal);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [loading, setLoading] = useState(true);

  const handleCancel = () => {
    console.log("Form canceled =>" + initialValues);
  };

  const handleFormSubmit = (values) => {
    console.log(values);
  };



    return (
      <Box m="30px">
      <Header title="Add RABill" />

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
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                m="20px"
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Payment Form"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.paymentForm}
                  name="paymentForm"
                  error={!!touched.paymentForm && !!errors.paymentForm}
                  helperText={touched.paymentForm && errors.paymentForm}
                  sx={{ gridColumn: "span 2" }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Bank Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.bankName}
                  name="bankName"
                  error={!!touched.bankName && !!errors.bankName}
                  helperText={touched.bankName && errors.bankName}
                  sx={{ gridColumn: "span 2" }}
                />
                <FormControl
                  fullWidth
                  variant="filled"
                  sx={{ gridColumn: "span 2" }}
                >
                  <InputLabel htmlFor="project">Select Project</InputLabel>
                  <Select
                    value={values.project}
                    onChange={handleChange}
                    name="project"
                    onBlur={handleBlur}
                    error={!!errors.project}
                  >
                    <MenuItem value="1">Sai Construction</MenuItem>
                    <MenuItem value="0">Sai Construction</MenuItem>
                  </Select>
                  {!!errors.project && (
                    <Box color="red" mt={1} sx={{ fontSize: "0.6rem" }}>
                      {errors.project}
                    </Box>
                  )}
                </FormControl>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Bill Amount"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.billAmount}
                  name="billAmount"
                  error={!!touched.billAmount && !!errors.billAmount}
                  helperText={touched.billAmount && errors.billAmount}
                  sx={{ gridColumn: "span 2" }}
                />
                <FormControl
                  fullWidth
                  variant="filled"
                  sx={{ gridColumn: "span 2" }}
                >
                  <InputLabel htmlFor="paymentNode">Select Payment Mode</InputLabel>
                  <Select
                    value={values.paymentNode}
                    onChange={handleChange}
                    name="paymentNode"
                    onBlur={handleBlur}
                    error={!!errors.paymentNode}
                  >
                    <MenuItem value="0">Cash</MenuItem>
                    <MenuItem value="1">Cheque</MenuItem>
                    <MenuItem value="2">DD</MenuItem>
                    <MenuItem value="3">Online</MenuItem>
                  </Select>
                  {!!errors.paymentNode && (
                    <Box color="red" mt={1} sx={{ fontSize: "0.6rem" }}>
                      {errors.paymentNode}
                    </Box>
                  )}
                </FormControl>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="RA Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.raNumber}
                  name="raNumber"
                  error={!!touched.raNumber && !!errors.raNumber}
                  helperText={touched.raNumber && errors.raNumber}
                  sx={{ gridColumn: "span 2" }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Transaction No"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.transactionNo}
                  name="transactionNo"
                  error={!!touched.transactionNo && !!errors.transactionNo}
                  helperText={touched.transactionNo && errors.transactionNo}
                  sx={{ gridColumn: "span 2" }}
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
                >
                  PROCESS
                </Button>
                <Button
                  type="button"
                  color="redcolor"
                  variant="contained"
                  sx={{
                    fontSize: ".9rem",
                    color: "white",
                    backgroundColor: "red",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                  }}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Box>
            </form>
          )}
        </FormikConsumer>
      </Formik>
    </Box>
    );
};


const checkoutSchema = yup.object().shape({
  paymentForm: yup.string().required("required"),
  billAmount: yup.string().required("required"),
  raNumber: yup.string().required("required"),
});

export default AddRABill;