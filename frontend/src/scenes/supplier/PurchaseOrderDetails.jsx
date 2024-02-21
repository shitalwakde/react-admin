import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  useTheme,
  TextField,
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
import PrintIcon from "@mui/icons-material/Print";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignIcon from "@mui/icons-material/Assignment"
import EventIcon from "@mui/icons-material/Event";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";



const newLocal = {
  fromDate: "",
  toDate: "",
};

const PurchaseOrderDetails = () => {
  const [initialValues, setInitialValues] = useState(newLocal);
  const [selectedValues, setSelectedValues] = useState({});
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isFromDatePickerOpen, setFromDatePickerOpen] = useState(false);
  const [isToDatePickerOpen, setToDatePickerOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    console.log("Form canceled =>" + initialValues);
  };

  const handlePrint = () => {};

  const handleExport = () => {};

  const handleDelete = () => {};

  const handleAddNew = () => {
    navigate("/supplier/PurchaseOrderDetails");
  };

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  //=====================Company Info Detail========================
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "Sr.No.", flex: 0.5 },
    {
      field: "invoiceNo",
      headerName: "Invoice No",
      flex: 1,
    },
    {
      field: "purchaseType",
      headerName: "Purchase Type",
      flex: 1,
    },
    {
      field: "invoiceDate",
      headerName: "Invoice Date",
      flex: 1,
    },
    {
      field: "supplierId",
      headerName: "Supplier ID",
      flex: 1,
    },
    {
      field: "supplierName",
      headerName: "Supplier Name",
      flex: 1,
    },
    {
      field: "supplierMobileNo",
      headerName: "Supplier Mobile No",
      flex: 1,
    },

    {
      field: "subTotal",
      headerName: "SubTotal",
      flex: 1,
    },
    {
      field: "cgst",
      headerName: "CGST",
      flex: 1,
    },
    {
      field: "sgst",
      headerName: "SGST",
      flex: 1,
    },
    {
      field: "igst",
      headerName: "IGST",
      flex: 1,
    },
    {
      field: "grandTotal",
      headerName: "Grand Total",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
    {
      headerName: "Actions",
      field: "actions",
      sort: "asc",
      renderCell: (params) => (
        <>        
          <IconButton
            aria-label="print"
            onClick={() => handlePrint(params.row)}
            style={{ color: "green" }}
          >
            <PrintIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => handleDelete(params.row.id)}
            style={{ color: "brown" }}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box m="30px">
      <Header title="Purchase Order Details" />
      <Box display="flex" justifyContent="flex-end" mt="30px">
        <Button
          type="button"
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
          onClick={handleAddNew}
        >
          ADD NEW
        </Button>
      </Box>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        // validationSchema={checkoutSchema}
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
                  sx={{ gridColumn: "span 2" }}
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
                  sx={{ gridColumn: "span 2" }}
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
                    backgroundColor: "red",
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
                  onClick={handlePrint}
                >
                  PRINT
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
                    backgroundColor: "blue",
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

export default PurchaseOrderDetails;
