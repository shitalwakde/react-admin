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
} from "@mui/material";
import { Formik, FormikConsumer } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import toast from "react-hot-toast";
import { GetCountries, GetState, GetCity } from "react-country-state-city";

const newLocal = {
  vendorNumber: "",
  pincode: "",
  vendorName: "",
  stateid: 0,
  businessName: "",
  cityid: 0,
  openingBal: "",
  area: "",
  cinNo: "",
  paymentType: "",
  panNo: "",
  accHolderName: "",
  gstNo: "",
  accNumber: "",
  mobileNo: "",
  branchName: "",
  emailId: "",
  IFSCCode: "",
  address: "",
  bankName: "",
  remark: "",
};

const AddNewVendor = () => {
  const [initialValues, setInitialValues] = useState(newLocal);
  const [selectedValues, setSelectedValues] = useState({});
  const [companyData, setCompanyData] = useState([]);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  const [countryid, setCountryid] = useState(0);
  const [stateid, setStateid] = useState(0);
  const [cityid, setCityid] = useState(0);

  const [countriesList, setCountriesList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  useEffect(() => {
    GetState(101).then((result) => {
      setStateList(result);
    });
  }, []);

  const handleCancel = () => {
    // Handle cancel button logic
    setInitialValues(newLocal);
    setSelectedValues({});
    setStateid(0);
    setCityid(0);
    console.log("Form canceled =>" + newLocal);
  };

  const handleFormSubmit = () => {};

  const handleViewDetails = () => {
    navigate("/supplier/VendorDetailList");
  };

  return (
    <Box m="30px" paddingBottom="20px">
      <Header title="Create Vendor" />

      <Formik
        enableReinitialize={true}
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
                  label="Vendor Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.companyName}
                  name="companyName"
                  error={!!touched.companyName && !!errors.companyName}
                  helperText={touched.companyName && errors.companyName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Pincode"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.pincode}
                  name="pincode"
                  error={!!touched.pincode && !!errors.pincode}
                  helperText={touched.pincode && errors.pincode}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Vendor Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.vendorName}
                  name="vendorName"
                  error={!!touched.vendorName && !!errors.vendorName}
                  helperText={touched.vendorName && errors.vendorName}
                  sx={{ gridColumn: "span 2" }}
                />
                <FormControl
                  fullWidth
                  variant="filled"
                  sx={{ gridColumn: "span 2" }}
                >
                  <InputLabel htmlFor="state">Select State</InputLabel>
                  <Select
                    value={
                      stateid || (stateList.length > 0 ? stateList[0].id : "")
                    }
                    onChange={(e) => {
                      console.log("on state==" + e.target.value);
                      setFieldValue("stateid", e.target.value);

                      const state = stateList.find(
                        (item) => item.id === e.target.value
                      );
                      console.log(state);
                      setStateid(state.id);
                      GetCity(101, state.id).then((result) => {
                        setCityList(result);
                      });
                    }}
                    name="stateid"
                    onBlur={handleBlur}
                    // error={!!errors.stateid}
                  >
                    {stateList.map((item, index) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {/* {!!errors.state && (
                  <Box color="red" mt={1} sx={{ fontSize: "0.6rem" }}>
                    {errors.state}
                  </Box>
                )} */}
                </FormControl>

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Business Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.businessName}
                  name="businessName"
                  error={!!touched.businessName && !!errors.businessName}
                  helperText={touched.businessName && errors.businessName}
                  sx={{ gridColumn: "span 2" }}
                />
                <FormControl
                  fullWidth
                  variant="filled"
                  sx={{ gridColumn: "span 2" }}
                >
                  <InputLabel htmlFor="city">Select City</InputLabel>
                  <Select
                    value={
                      cityid || (cityList.length > 0 ? cityList[0].id : "")
                    }
                    onChange={(e) => {
                      console.log("on city==" + e.target.value);
                      setFieldValue("cityid", e.target.value);
                      const city = cityList.find(
                        (item) => item.id === e.target.value
                      ); //here you will get full city object.
                      setCityid(city.id);
                    }}
                    name="cityid"
                    onBlur={handleBlur}
                    // error={!!errors.cityid}
                  >
                    {cityList.map((item, index) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {/* {!!errors.city && (
                  <Box color="red" mt={1} sx={{ fontSize: "0.6rem" }}>
                    {errors.city}
                  </Box>
                )} */}
                </FormControl>

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Opening Balance"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.openingBal}
                  name="openingBal"
                  error={!!touched.openingBal && !!errors.openingBal}
                  helperText={touched.openingBal && errors.openingBal}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Area"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.area}
                  name="area"
                  error={!!touched.area && !!errors.area}
                  helperText={touched.area && errors.area}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="CIN No."
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.cinNo}
                  name="cinNo"
                  error={!!touched.cinNo && !!errors.cinNo}
                  helperText={touched.cinNo && errors.cinNo}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="GPay/PhonePay/Upi"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.paymentType}
                  name="paymentType"
                  error={!!touched.paymentType && !!errors.paymentType}
                  helperText={touched.paymentType && errors.paymentType}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="PAN No."
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.panNo}
                  name="panNo"
                  error={!!touched.panNo && !!errors.panNo}
                  helperText={touched.panNo && errors.panNo}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Account Holder Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.accHolderName}
                  name="accHolderName"
                  error={!!touched.accHolderName && !!errors.accHolderName}
                  helperText={touched.accHolderName && errors.accHolderName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="GST No."
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.gstNo}
                  name="gstNo"
                  error={!!touched.gstNo && !!errors.gstNo}
                  helperText={touched.gstNo && errors.gstNo}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Account Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.accNumber}
                  name="accNumber"
                  error={!!touched.accNumber && !!errors.accNumber}
                  helperText={touched.accNumber && errors.accNumber}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Mobile Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.mobileNo}
                  name="mobileNo"
                  error={!!touched.mobileNo && !!errors.mobileNo}
                  helperText={touched.mobileNo && errors.mobileNo}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Branch Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.branchName}
                  name="branchName"
                  error={!!touched.branchName && !!errors.branchName}
                  helperText={touched.branchName && errors.branchName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Email ID"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.emailId}
                  name="emailId"
                  error={!!touched.emailId && !!errors.emailId}
                  helperText={touched.emailId && errors.emailId}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="IFSC Code"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.IFSCCode}
                  name="IFSCCode"
                  error={!!touched.IFSCCode && !!errors.IFSCCode}
                  helperText={touched.IFSCCode && errors.IFSCCode}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Address"
                  multiline
                  maxRows={3}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.Address}
                  name="Address"
                  error={!!touched.Address && !!errors.Address}
                  helperText={touched.Address && errors.Address}
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
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Remark"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.remark}
                  name="remark"
                  error={!!touched.remark && !!errors.remark}
                  helperText={touched.remark && errors.remark}
                  sx={{ gridColumn: "span 2" }}
                />
              </Box>
              <Box display="flex" justifyContent="flex-end" mt="10px">
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

export default AddNewVendor;
