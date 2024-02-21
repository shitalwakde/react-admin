import React, { useEffect, useState } from "react";
import { Box, Button, TextField, IconButton, useTheme } from "@mui/material";
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
  projectName: "",
};

const ProjectCompletedHistory = () => {
  const [initialValues, setInitialValues] = useState(newLocal);
  const [selectedValues, setSelectedValues] = useState({});
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  

  const handleSearch = () => {
    console.log("Form canceled =>" + initialValues);
  };

  const handlePrint = () => {};

  const handleExport = () => {};

  const handleAddNew = () => {
    navigate("/my_project/AddNewProject");
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
      field: "projectCode",
      headerName: "Project Code",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "projectName",
      headerName: "Project Name",
      flex: 1,
    },
    {
      field: "projectCategoryName",
      headerName: "Project Category Name",
      flex: 1,
    },
    {
      field: "subContracter",
      headerName: "Sub Contracter",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "raBillDate",
      headerName: "RABill Date",
      flex: 1,
    },

    {
      field: "tenderAmount",
      headerName: "Tender Amount",
      flex: 1,
    },
    {
      field: "belowAmount",
      headerName: "Below Amount",
      flex: 1,
    },
    {
      field: "budget",
      headerName: "Budget",
      flex: 1,
    },
    {
      field: "submissionDate",
      headerName: "SubmissionDate",
      flex: 1,
    },
    {
      field: "DD/FDAmount",
      headerName: "DD/FD Amount",
      flex: 1,
    },
    {
      field: "securityDeposite",
      headerName: "Security Deposite",
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
      field: "date",
      headerName: "Date",
      flex: 1,
    },
  ];


  return (
    <Box m="30px">
      <Header title="Completed Project History" />
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
                    label="Project Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.projectName}
                    name="projectName"
                    error={!!touched.projectName && !!errors.projectName}
                    helperText={touched.projectName && errors.projectName}
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

export default ProjectCompletedHistory;
