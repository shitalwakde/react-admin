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
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const newLocal = {
  projectCatName: "",
};

const ProjectCategory = () => {
  const [initialValues, setInitialValues] = useState(newLocal);
  const [selectedValues, setSelectedValues] = useState({});
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleEdit = () => {};

  const handleDelete = () => {
    deleteItem();
  };

  const handleSearch = () => {
    console.log("Form canceled =>" + initialValues);
  };

  const handlePrint = () => {};

  const handleExport = () => {};

  const handleCancel = () => {};

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  const deleteItem = () => {};

  //=====================Company Info Detail========================
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "Category ID", flex: 0.5 },
    {
      field: "projectCategoryName",
      headerName: "Project Category Name",
      flex: 1,
      cellClassName: "name-column--cell",
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
    <Box m="30px">
      <Header title="Create Project Category" />
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
                    label="Project Catgory Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.projectCatName}
                    name="projectCatName"
                    error={!!touched.projectCatName && !!errors.projectCatName}
                    helperText={touched.projectCatName && errors.projectCatName}
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
                    SAVE
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
                    CANCEL
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
                      backgroundColor: "skyblue",
                      paddingLeft: "20px",
                      paddingRight: "20px",
                      paddingTop: "5px",
                      paddingBottom: "5px",
                    }}
                    onClick={handleExport}
                  >
                    EXPORT
                  </Button>
                  <Button
                    type="button"
                    color="redcolor"
                    variant="contained"
                    sx={{
                      fontSize: ".9rem",
                      color: "white",
                      backgroundColor: "orange",
                      paddingLeft: "20px",
                      paddingRight: "20px",
                      paddingTop: "5px",
                      paddingBottom: "5px",
                    }}
                    onClick={handlePrint}
                  >
                    PRINT
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
  projectCatName: yup.string().required("required"),
});

export default ProjectCategory;
