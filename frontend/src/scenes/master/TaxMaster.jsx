import React, { useEffect, useState } from "react";
import axios from "axios";
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
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { mockDataCompany } from "../../data/mockData";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import toast from "react-hot-toast";
import { Audio } from "react-loader-spinner";
import AlertDialog from "../../components/common/AlertDialog";

const newLocal = {
  cgst: "",
  igst: "",
  sgst: "",
  cess: "",
  other: "",
};

const TaxMaster = () => {
  const [initialValues, setInitialValues] = useState(newLocal);
  const [selectedValues, setSelectedValues] = useState({});
  const [companyData, setCompanyData] = useState([]);
  const isNonMobile = useMediaQuery("(min-width:600px)");
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
    { field: "id", headerName: "Tax Id", flex: 0.5 },
    {
      field: "cgst",
      headerName: "CGST",
      flex: 1,
    },
    {
      field: "igst",
      headerName: "IGST",
      flex: 1,
    },
    {
      field: "sgst",
      headerName: "SGST",
      flex: 1,
    },
    {
      field: "cess",
      headerName: "CESS",
      flex: 1,
    },
    {
      field: "other",
      headerName: "Other",
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
      <Header title="Create Tax" />

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
                  label="CGST"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.cgst}
                  name="cgst"
                  error={!!touched.cgst && !!errors.cgst}
                  helperText={touched.cgst && errors.cgst}
                  sx={{ gridColumn: "span 2" }}
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
                  sx={{ gridColumn: "span 2" }}
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
                  sx={{ gridColumn: "span 2" }}
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
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Other Tax"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.otherTax}
                  name="otherTax"
                  error={!!touched.otherTax && !!errors.otherTax}
                  helperText={touched.otherTax && errors.otherTax}
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
        <Header title="Created Tax Configuration" />
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



const checkoutSchema = yup.object().shape({
  cgst: yup.string().required("required"),
  igst: yup.string().required("required"),
  sgst: yup.string().required("required"),
  cess: yup.string().required("required"),
  otherTax: yup.string().required("required"),
});

export default TaxMaster;
