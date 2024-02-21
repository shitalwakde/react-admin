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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignIcon from "@mui/icons-material/Assignment";
import { useNavigate } from "react-router-dom";

const newLocal = {
  projectName: "",
};

const ProjectDetail = () => {
  const [initialValues, setInitialValues] = useState(newLocal);
  const [selectedValues, setSelectedValues] = useState({});
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  const handleSearch = () => {
    console.log("Form canceled =>" + initialValues);
  };

  const handlePrint = () => {};

  const handleExport = () => {};

  const handleDelete = () => {};

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
      field: "subcontractorName",
      headerName: "Subcontractor Name",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "rabill",
      headerName: "Rabill",
      flex: 1,
    },
    {
      field: "amountDue",
      headerName: "Amount Due",
      flex: 1,
    },
    {
      field: "rabillDate",
      headerName: "Rabill Date",
      flex: 1,
    },
    {
      field: "tenderAmount",
      headerName: "Tender Amount",
      flex: 1,
    },
    {
      field: "belowAmount",
      headerName: "BelowAmount",
      flex: 1,
    },
    {
      field: "budget",
      headerName: "Budget",
      flex: 1,
    },
    {
      field: "submissionDate",
      headerName: "Submission Date",
      flex: 1,
    },
    {
        field: "dd/fdAmount",
        headerName: "DD/FD Amount",
        flex: 1,
      },
      {
        field: "securityDeposit",
        headerName: "Security Deposit",
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
        field: "Date",
        headerName: "Submission Date",
        flex: 1,
      },
    {
      headerName: "Actions",
      field: "actions",
      sort: "asc",
      flex: 2,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="assign"
            onClick={() => handlePrint(params.row)}
            style={{ color: "green" }}
          >
            <AssignIcon />
          </IconButton>
          <IconButton
            aria-label="edit"
            onClick={() => handlePrint(params.row)}
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
      <Header title="Project Details" />
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
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 4",
                  },
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="projectName"
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


const checkoutSchema = yup.object().shape({
    projectName: yup.string().required("required"),
  });

export default ProjectDetail;
