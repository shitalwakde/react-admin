import React, { useEffect, useState } from "react";
import {
  Select,
  MenuItem,
  Box,
  Button,
  TextField,
  InputLabel,
  FormControl,
  useTheme,
  InputAdornment,
} from "@mui/material";
import { Formik, FormikConsumer } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import Header from "../../components/Header";
import toast from "react-hot-toast";
import { Audio } from "react-loader-spinner";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EventIcon from "@mui/icons-material/Event";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";


const newLocal = {
  projectName: "",
  fromDate: "",
  toDate: "",
};

const RABillLedger = () => {
  const [initialValues, setInitialValues] = useState(newLocal);
  const [selectedValues, setSelectedValues] = useState({});
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isFromDatePickerOpen, setFromDatePickerOpen] = useState(false);
  const [isToDatePickerOpen, setToDatePickerOpen] = useState(false);
  const navigate = useNavigate();


  const handleSearch = () => {
    console.log("Form canceled =>" + initialValues);
  };

  const handleAddNew = () => {
    navigate("/ra_bill/AddRABill");
  };

  const handleExport = () => {};

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  //=====================Company Info Detail========================
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "Sr.No.", flex: 0.5 },
    {
      field: "raNo",
      headerName: "RA No",
      flex: 1,
    },
    {
      field: "projectName",
      headerName: "Project Name",
      flex: 1,
    },
    {
      field: "cr",
      headerName: "CR",
      flex: 1,
    },
    {
      field: "dr",
      headerName: "DR",
      flex: 1,
    },
    {
      field: "paymentForm",
      headerName: "Payment Form",
      flex: 1,
    },

    {
      field: "paymentMode",
      headerName: "Payment Mode",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
  ];

  return (
    <Box m="30px">
      <Header title="RA Bill Ledger" />
      <Box display="flex" justifyContent="flex-end" mt="30px">
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
                  onClick={handleAddNew}
                >
                  ADD NEW
                </Button>
      </Box>
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
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 4",
                  },
                }}
              >
                <FormControl
                  fullWidth
                  variant="filled"
                  sx={{ gridColumn: "span 1" }}
                >
                  <InputLabel htmlFor="projectName">
                    Select Project Name
                  </InputLabel>
                  <Select
                    value={values.projectName}
                    onChange={handleChange}
                    name="projectName"
                    onBlur={handleBlur}
                    error={!!errors.projectName}
                  >
                    <MenuItem value="0">Sai Construction</MenuItem>
                    <MenuItem value="1">Sai Construction</MenuItem>
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
                  label="From Date (MM-dd-yyyy)"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={
                    values.fromDate ? format(values.fromDate, "MM-dd-yyyy") : ""
                  }
                  name="fromDate"
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
                    selected={values.fromDate}
                    onChange={(date) => {
                      setFieldValue("fromDate", date); // Use "dob" as the field name
                      setFromDatePickerOpen(false);
                    }}
                    onBlur={() => setFromDatePickerOpen(false)}
                  />
                )}
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="To Date (MM-dd-yyyy)"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={
                    values.toDate ? format(values.toDate, "MM-dd-yyyy") : ""
                  }
                  name="toDate"
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        onClick={() => setToDatePickerOpen(true)}
                      >
                        <EventIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ gridColumn: "span 1" }}
                />
                {isToDatePickerOpen && (
                  <DatePicker
                    placeholderText="Select date"
                    selected={values.fromDate}
                    onChange={(date) => {
                      setFieldValue("toDate", date); // Use "dob" as the field name
                      setToDatePickerOpen(false);
                    }}
                    onBlur={() => setToDatePickerOpen(false)}
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
                  onClick={handleSearch}
                >
                  SEARCH
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
                  onClick={handleExport}
                >
                  EXPORT
                </Button>
              </Box>
            </form>
          )}
        </FormikConsumer>
      </Formik>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid rows={mockDataTeam} columns={columns} />
      </Box>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  vendorName: yup.string().required("required"),
  businessName: yup.string().required("required"),
});

export default RABillLedger;
