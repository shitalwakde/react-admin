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
  IconButton,
  useTheme,
} from "@mui/material";
import { Formik, FormikConsumer } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { mockDataCompany } from "../../data/mockData";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import toast from "react-hot-toast";
import { Audio } from "react-loader-spinner";
import AlertDialog from "../../components/common/AlertDialog";


const AddPartner = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [loading, setLoading] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleCancel = () => {
    console.log("Form canceled =>" + initialValues);
  };

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  const deleteItem = () => {};

  const handleEdit = () => {};

  const handleDelete = () => {};

  //=====================Company Info Detail========================
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "Id", flex: 0.5 },
    { 
      field: "partnerId",
      headerName: "Partner Code",
      flex: 1 
    },
    {
      field: "name",
      headerName: "Parner Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    {
        field: "creationDate",
        headerName: "Creation Date",
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
    <Box m="20px">
      <Header title="Add Partner" />

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
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Partner Code"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.partnerCode}
                  name="partnerCode"
                  error={!!touched.partnerCode && !!errors.partnerCode}
                  helperText={touched.partnerCode && errors.partnerCode}
                  sx={{ gridColumn: "span 2" }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Full Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.fullName}
                  name="fullName"
                  error={!!touched.fullName && !!errors.fullName}
                  helperText={touched.fullName && errors.fullName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Mobile Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.mobile}
                  name="mobile"
                  error={!!touched.mobile && !!errors.mobile}
                  helperText={touched.mobile && errors.mobile}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="City"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.city}
                  name="city"
                  error={!!touched.city && !!errors.city}
                  helperText={touched.city && errors.city}
                  sx={{ gridColumn: "span 2" }}
                />

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
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Branch"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.branch}
                  name="branch"
                  error={!!touched.branch && !!errors.branch}
                  helperText={touched.branch && errors.branch}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="IFSC Code"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.ifscCode}
                  name="ifscCode"
                  error={!!touched.ifscCode && !!errors.ifscCode}
                  helperText={touched.ifscCode && errors.ifscCode}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Account Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.accountNumber}
                  name="accountNumber"
                  error={!!touched.accountNumber && !!errors.accountNumber}
                  helperText={touched.accountNumber && errors.accountNumber}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="GST No"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.gstNo}
                  name="gstNo"
                  error={!!touched.gstNo && !!errors.gstNo}
                  helperText={touched.gstNo && errors.gstNo}
                  sx={{ gridColumn: "span 2" }}
                />
                <FormControl
                  fullWidth
                  variant="filled"
                  sx={{ gridColumn: "span 2" }}
                >
                  <InputLabel htmlFor="status">Select Status</InputLabel>
                  <Select
                    value={values.status}
                    onChange={handleChange}
                    name="status"
                    onBlur={handleBlur}
                    error={!!errors.status}
                  >
                    <MenuItem value="1">Active</MenuItem>
                    <MenuItem value="0">Deactive</MenuItem>
                  </Select>
                  {!!errors.status && (
                    <Box color="red" mt={1} sx={{ fontSize: "0.6rem" }}>
                      {errors.status}
                    </Box>
                  )}
                </FormControl>
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
              </Box>
              {showConfirmation && (
                <AlertDialog
                  open={showConfirmation}
                  onAgree={deleteItem}
                  onDisagree={() => setShowConfirmation(false)}
                  onClose={() => setShowConfirmation(false)}
                  message="Are you sure you want to delete?"
                />
              )}
            </form>
          )}
        </FormikConsumer>
      </Formik>
      <Box m="20px">
        <Header title="Partner Details" />
        <Box
          m="40px 0 0 0"
          // height="75vh"
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
            // "& .MuiCheckbox-root": {
            //   color: `${colors.greenAccent[200]} !important`,
            // },
          }}
        >
          {
            <DataGrid rows={mockDataCompany} columns={columns} />

            /* {loading ? (
            <figure className="avatar item-rtl">
              <Audio
                height="40"
                width="30"
                radius="9"
                color="orange"
                ariaLabel="loading"
                wrapperStyle
                wrapperClass
              />
            </figure>
          ) : (
            // <DataGrid checkboxSelection rows={companyData} columns={columns} />
            <DataGrid rows={mockDataCompany} columns={columns} />
          )} */
          }
        </Box>
      </Box>
    </Box>
  );
};


const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  fullName: yup.string().required("required"),
  mobile: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address: yup.string().required("required"),
  city: yup.string().required("required"),
  branch: yup.string().required("required"),
  ifscCode: yup.string().required("required"),
  accountNumber: yup.string().required("required"),
  gstNo: yup.string().required("required"),
  status: yup.string().required("required"),
});
const initialValues = {
  partnerCode: "",
  fullName: "",
  mobile: "",
  city: "",
  address: "",
  branch: "",
  ifscCode: "",
  accountNumber: "",
  gstNo: "",
  status: "",
};

export default AddPartner;
