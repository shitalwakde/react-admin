import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  IconButton,
  useTheme,
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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const newLocal = {
  vendorName: "",
  businessName: "",
};

const VendorDetailList = () => {
  const [initialValues, setInitialValues] = useState(newLocal);
  const [selectedValues, setSelectedValues] = useState({});
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  const handleEdit = () => {};

  const handleDelete = () => {
    deleteItem();
  };

  const handleSearch = () => {
    console.log("Form canceled =>" + initialValues);
  };

  const handlePrint = () => {};

  const handleExport = () => {};

  const handleAddNew = () => {
    navigate("/supplier/AddNewVendor");
  };

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  const deleteItem = () => {};


  //=====================Company Info Detail========================
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  const columns = [
    { field: "id", headerName: "Sr.No.", flex: 0.5 },
    {
      field: "vendorNo",
      headerName: "Vendor No",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "vendorName",
      headerName: "Vendor Name",
      flex: 1,
    },
    {
      field: "businessName",
      headerName: "Business Name",
      flex: 1,
    },
    {
      field: "o/pBalance",
      headerName: "O/P Balance",
      flex: 1,
    },
    {
      field: "cinNo",
      headerName: "CIN No",
      flex: 1,
    },
    {
      field: "panNo",
      headerName: "PAN No",
      flex: 1,
    },

    {
      field: "gstNo",
      headerName: "GST No",
      flex: 1,
    },
    {
      field: "paymentType",
      headerName: "PhonePay/Gpay/Upi",
      flex: 1,
    },
    {
      field: "mobileNo",
      headerName: "Mobile No",
      flex: 1,
    },
    {
      field: "emailId",
      headerName: "EmailID",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "pincode",
      headerName: "Pincode",
      flex: 1,
    },
    {
      field: "state",
      headerName: "State",
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
    },
    {
      field: "area",
      headerName: "Area",
      flex: 1,
    },
    {
      field: "accHolderName",
      headerName: "Account Holder Name",
      flex: 1,
    },
    {
      field: "accountNo",
      headerName: "Account Number",
      flex: 1,
    },
    {
      field: "branchName",
      headerName: "Branch Name",
      flex: 1,
    },
    {
      field: "ifscCode",
      headerName: "IFSC Code",
      flex: 1,
    },
    {
      field: "bankName",
      headerName: "Bank Name",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "remark",
      headerName: "Remark",
      flex: 1,
    },
    {
      headerName: "Actions",
      field: "actions",
      sort: "asc",
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="edit"
            onClick={() => handleEdit(params.row)}
            style={{ color: "orange" }}
          >
            <EditIcon />
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
      <Header title="Vendor Details" />
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
          onClick={handleAddNew}
        >
          ADD NEW
        </Button>
      </Box>
      <Box m="20px">
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
                    label="Vendor Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.vendorName}
                    name="vendorName"
                    error={!!touched.vendorName && !!errors.vendorName}
                    helperText={touched.vendorName && errors.vendorName}
                    sx={{ gridColumn: "span 2" }}
                  />
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
      </Box>
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

export default VendorDetailList;
