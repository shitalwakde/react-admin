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
import { GetCountries, GetState, GetCity } from "react-country-state-city";
import EventIcon from "@mui/icons-material/Event";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const newLocal = {
  projectCode: "",
  projectName: "",
  projectCategory: "",
  subContractorName: "",
  subContractorId: "",
  description: "",
  tenderAmount: "",
  belowAmount: "",
  department: "",
  budget: "",
  dateOfWorkOrder: "",
  completionDate: "",
  performanceSecurityDeposit: "",
  securityDeposit: "",
  stateid: 0,
  cityid: 0,
  area: "",
  maintanaceDate: "",
  isPartnerVisible: "",
};

const AddNewProject = () => {
  const [initialValues, setInitialValues] = useState(newLocal);
  const [selectedValues, setSelectedValues] = useState({});
  const [companyData, setCompanyData] = useState([]);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isMaintanaceDatePickerOpen, setMaintanaceDatePickerOpen] =
    useState(false);
  const navigate = useNavigate();

  const [countryid, setCountryid] = useState(0);
  const [stateid, setStateid] = useState(0);
  const [cityid, setCityid] = useState(0);

  const [countriesList, setCountriesList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const handleCancel = () => {
    // Handle cancel button logic
    setInitialValues(newLocal);
    setSelectedValues({});
    console.log("Form canceled =>" + newLocal);
  };

  const handleFormSubmit = () => {};

  const handleViewDetails = () => {
    navigate("/my_project/ProjectDetail");
  };

  useEffect(() => {
    GetState(101).then((result) => {
      setStateList(result);
    });
  }, []);

  return (
    <Box m="30px" paddingBottom="20px">
      <Header title="Create Project" />

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
                  label="Project Code"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.projectCode}
                  name="projectCode"
                  error={!!touched.projectCode && !!errors.projectCode}
                  helperText={touched.projectCode && errors.projectCode}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="completionDate"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.completionDate}
                  name="completionDate"
                  error={!!touched.completionDate && !!errors.completionDate}
                  helperText={touched.completionDate && errors.completionDate}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Project Name"
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
                  label="Performance Security Deposit"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.performanceSecurityDeposit}
                  name="performanceSecurityDeposit"
                  error={
                    !!touched.performanceSecurityDeposit &&
                    !!errors.performanceSecurityDeposit
                  }
                  helperText={
                    touched.performanceSecurityDeposit &&
                    errors.performanceSecurityDeposit
                  }
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Project Category"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.projectCategory}
                  name="projectCategory"
                  error={!!touched.projectCategory && !!errors.projectCategory}
                  helperText={touched.projectCategory && errors.projectCategory}
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
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="SubContractor Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.subContractorName}
                  name="subContractorName"
                  error={
                    !!touched.subContractorName && !!errors.subContractorName
                  }
                  helperText={
                    touched.subContractorName && errors.subContractorName
                  }
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
                  label="subContractorId"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.subContractorId}
                  name="subContractorId"
                  error={!!touched.subContractorId && !!errors.subContractorId}
                  helperText={touched.subContractorId && errors.subContractorId}
                  sx={{ gridColumn: "span 2" }}
                  inputProps={{
                    readOnly: true,
                  }}
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
                  label="Description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description}
                  name="description"
                  error={!!touched.description && !!errors.description}
                  helperText={touched.description && errors.description}
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
                  label="Tender Amount"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.tenderAmount}
                  name="tenderAmount"
                  error={!!touched.tenderAmount && !!errors.tenderAmount}
                  helperText={touched.tenderAmount && errors.tenderAmount}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Maintanace Date (MM-dd-yyyy)"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={
                    values.maintanaceDate
                      ? format(values.maintanaceDate, "MM-dd-yyyy")
                      : ""
                  }
                  name="maintanaceDate"
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        onClick={() => setMaintanaceDatePickerOpen(true)}
                      >
                        <EventIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ gridColumn: "span 2" }}
                />
                {isMaintanaceDatePickerOpen && (
                  <DatePicker
                    placeholderText="Select date"
                    selected={values.maintanaceDate}
                    onChange={(date) => {
                      setFieldValue("maintanaceDate", date); // Use "dob" as the field name
                      setMaintanaceDatePickerOpen(false);
                    }}
                    onBlur={() => setMaintanaceDatePickerOpen(false)}
                  />
                )}
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Below Amount"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.belowAmount}
                  name="belowAmount"
                  error={!!touched.belowAmount && !!errors.belowAmount}
                  helperText={touched.belowAmount && errors.belowAmount}
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
                  label="Budget"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.budget}
                  name="budget"
                  error={!!touched.budget && !!errors.budget}
                  helperText={touched.budget && errors.budget}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Date Of Work Order"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.dateOfWorkOrder}
                  name="dateOfWorkOrder"
                  error={!!touched.dateOfWorkOrder && !!errors.dateOfWorkOrder}
                  helperText={touched.dateOfWorkOrder && errors.dateOfWorkOrder}
                  sx={{ gridColumn: "span 2" }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.isPartnerVisible}
                      onChange={(event) => {
                        setFieldValue("isPartnerVisible", event.target.checked);
                      }}
                      name="isPartnerVisible"
                      color="primary"
                    />
                  }
                  label="Partner"
                  sx={{ gridColumn: "span 1" }}
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

export default AddNewProject;
