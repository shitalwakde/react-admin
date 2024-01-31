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
  projectName: "",
  securityDeposit: "",
  department: "",
  TDRNo: "",
  paymentType: "",
  dateOfDdTdr: "",
  maturityDate: "",
};

const AddSecurityDeposite = () => {
  const [initialValues, setInitialValues] = useState(newLocal);
  const [selectedValues, setSelectedValues] = useState({});
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isDateOfDdTdrOpen, setDateOfDdTdrOpen] = useState(false);
  const [isMaturityDateOpen, setMaturityDateOpen] = useState(false);
  const navigate = useNavigate();

  const handleCancel = () => {
    console.log("Form canceled =>" + initialValues);
  };

  const handleViewDetails = () => {
    navigate("/security_deposite/SecurityDepositeDetails");
  };

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box m="30px">
      <Header title="Security Deposite" />

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
                  label="ProjectName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.projectName}
                  name="projectName"
                  error={!!touched.projectName && !!errors.projectName}
                  helperText={touched.projectName && errors.projectName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="TDR No"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.TDRNo}
                  name="TDRNo"
                  error={!!touched.TDRNo && !!errors.TDRNo}
                  helperText={touched.TDRNo && errors.TDRNo}
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Department"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.department}
                  name="department"
                  error={!!touched.department && !!errors.department}
                  helperText={touched.department && errors.department}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Security Deposit"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.securityDeposit}
                  name="securityDeposit"
                  error={!!touched.securityDeposit && !!errors.securityDeposit}
                  helperText={touched.securityDeposit && errors.securityDeposit}
                  sx={{ gridColumn: "span 2" }}
                />
                <FormControl
                  fullWidth
                  variant="filled"
                  sx={{ gridColumn: "span 2" }}
                >
                  <InputLabel htmlFor="paymentType">Select Status</InputLabel>
                  <Select
                    value={values.paymentType}
                    onChange={handleChange}
                    name="paymentType"
                    onBlur={handleBlur}
                    error={!!errors.paymentType}
                  >
                    <MenuItem value="DD">DD</MenuItem>
                    <MenuItem value="TDR">TDR</MenuItem>
                    <MenuItem value="BG">BG</MenuItem>
                  </Select>
                  {!!errors.paymentType && (
                    <Box color="red" mt={1} sx={{ fontSize: "0.6rem" }}>
                      {errors.paymentType}
                    </Box>
                  )}
                </FormControl>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Date Of DD/TDR (MM-dd-yyyy)"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={
                    values.dateOfDdTdr
                      ? format(values.dateOfDdTdr, "MM-dd-yyyy")
                      : ""
                  }
                  name="dateOfDdTdr"
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        onClick={() => setDateOfDdTdrOpen(true)}
                      >
                        <EventIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ gridColumn: "span 2" }}
                />
                {isDateOfDdTdrOpen && (
                  <DatePicker
                    placeholderText="Select date"
                    selected={values.dateOfDdTdr}
                    onChange={(date) => {
                      setFieldValue("dateOfDdTdr", date); // Use "dob" as the field name
                      setDateOfDdTdrOpen(false);
                    }}
                    onBlur={() => setDateOfDdTdrOpen(false)}
                  />
                )}
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Maturity Date (MM-dd-yyyy)"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={
                    values.maturityDate
                      ? format(values.maturityDate, "MM-dd-yyyy")
                      : ""
                  }
                  name="maturityDate"
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        onClick={() => setMaturityDateOpen(true)}
                      >
                        <EventIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ gridColumn: "span 2" }}
                />
                {isMaturityDateOpen && (
                  <DatePicker
                    placeholderText="Select date"
                    selected={values.maturityDate}
                    onChange={(date) => {
                      setFieldValue("maturityDate", date); // Use "dob" as the field name
                      setMaturityDateOpen(false);
                    }}
                    onBlur={() => setMaturityDateOpen(false)}
                  />
                )}
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
                  Save
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
                  onClick={handleViewDetails}
                >
                  View Details
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
  projectName: yup.string().required("required"),
  department: yup.string().required("required"),
  securityDeposit: yup.string().required("required"),
});

export default AddSecurityDeposite;
