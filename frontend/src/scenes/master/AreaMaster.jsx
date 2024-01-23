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
import { GetCountries, GetState, GetCity } from "react-country-state-city";
import AlertDialog from "../../components/common/AlertDialog";



const newLocal = {
    stateid: 0,
    cityid: 0,
    area: "",
  };


const AreaMaster = () => {
    const [initialValues, setInitialValues] = useState(newLocal);
  const [selectedValues, setSelectedValues] = useState({});
  const [companyData, setCompanyData] = useState([]);
  const isNonMobile = useMediaQuery("(min-width:600px)");
    const [countryid, setCountryid] = useState(0);
    const [stateid, setStateid] = useState(0);
    const [cityid, setCityid] = useState(0);
  
    const [countriesList, setCountriesList] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);
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
    { field: "id", headerName: "Area Id", flex: 0.5 },
    { 
      field: "state",
      headerName: "State",
      flex: 1 
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



    return(
        <Box m="20px">
      <Header title="Create Area" />

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
                <FormControl
                  fullWidth
                  variant="filled"
                  sx={{ gridColumn: "span 2" }}
                >
                  <InputLabel htmlFor="stateid">Select State</InputLabel>
                  <Select
                    value={values.stateid}
                    onChange={handleChange}
                    name="stateid"
                    onBlur={handleBlur}
                    error={!!errors.stateid}
                  >
                    <MenuItem value="1">state1</MenuItem>
                    <MenuItem value="0">state2</MenuItem>
                  </Select>
                  {!!errors.status && (
                    <Box color="red" mt={1} sx={{ fontSize: "0.6rem" }}>
                      {errors.stateid}
                    </Box>
                  )}
                </FormControl>
                <FormControl
                  fullWidth
                  variant="filled"
                  sx={{ gridColumn: "span 2" }}
                >
                  <InputLabel htmlFor="cityid">Select City</InputLabel>
                  <Select
                    value={values.cityid}
                    onChange={handleChange}
                    name="cityid"
                    onBlur={handleBlur}
                    error={!!errors.cityid}
                  >
                    <MenuItem value="1">city1</MenuItem>
                    <MenuItem value="0">city2</MenuItem>
                  </Select>
                  {!!errors.status && (
                    <Box color="red" mt={1} sx={{ fontSize: "0.6rem" }}>
                      {errors.cityid}
                    </Box>
                  )}
                </FormControl>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Area Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.area}
                  name="area"
                  InputProps={{ readOnly: true }} // Set readOnly to true
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
        <Header title="Area Details" />
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
    area: yup.string().required("required"),  
});



export default AreaMaster;