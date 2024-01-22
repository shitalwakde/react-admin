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
import { GetCountries, GetState, GetCity } from "react-country-state-city";
import toast from "react-hot-toast";
import { Audio } from "react-loader-spinner";
import AlertDialog from "../../components/common/AlertDialog";


const newLocal = {
  companyName: "",
  stateid: 0,
  cityid: 0,
  email: "",
  phone: "",
  address: "",
  cinNo: "",
  gstNo: "",
  image: "",
};

const CompanyMaster = () => {
  const [initialValues, setInitialValues] = useState(newLocal);
  const [selectedValues, setSelectedValues] = useState({});
  const [companyData, setCompanyData] = useState([]);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [image, setImage] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/assets/default_avatar.jpg"
  );

  const [countryid, setCountryid] = useState(0);
  const [stateid, setStateid] = useState(0);
  const [cityid, setCityid] = useState(0);

  const [countriesList, setCountriesList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState(0);

  useEffect(() => {
    GetState(101).then((result) => {
      setStateList(result);
      fetchData();
    });

    
  }, []);

  const handleSetAvatarPreview = (e) => {
    //=======setAvatarPreview=========

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    //===============================
  };

  const handleCancel = () => {
    // Handle cancel button logic
    setInitialValues(newLocal);
    setSelectedValues({});
    setAvatarPreview("/assets/default_avatar.jpg");
    setStateid(0);
    setCityid(0);
    console.log("Form canceled =>" + newLocal);
  };

  const handleFormSubmit = async (values, { setSubmitting }) => {
    // Your form submission logic here, including the imageUrl state
    console.log("Form values:", values);
    // Image Upload

    const formData = new FormData();
    formData.append("image", values.image);
    console.log("Image URL:", values.image);

    try {
      if (values.image && selectedValues.image !== values.image) {
        const response = await fetch("http://localhost:4000/companies/upload", {
          method: "POST",
          body: formData,
        });
        console.log("image response from API: " + response.status);

        if (response.ok) {
          const responseData = await response.json(); // Assuming the response is in JSON format
          setImage(responseData.imageUrl);
          values.image = responseData.imageUrl;
          console.log("Image set from response data:", image);
        } else {
          console.error("Failed to upload image");
        }
      }
    } catch (error) {
      console.error("Error during image upload:", error);
      // Handle other errors
    } finally {
      setSubmitting(false);
    }

    try {
      // Check if companyId is present (for update) or not (for create)
      const isUpdate = !!values.companyId;

      console.log("company data :=> " + values);

      // Create or Update Company
      const apiUrl = isUpdate
        ? `http://localhost:4000/companies/updateCompany/${values.companyId}`
        : "http://localhost:4000/companies/createCompany";

      const company = await fetch(apiUrl, {
        method: isUpdate ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (company.ok) {
        const companyResponseData = await company.json();
        console.log("Company saved successfully:", companyResponseData);
        toast.success("Data saved successfully");
        fetchData();
      } else {
        console.error("Failed to save company");
        toast.error("Failed to save data");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios
        .get("http://localhost:4000/companies/getAllCompanies")
        .then(async (response) => {
          const updateInfo = await modifyContent(response.data);
          console.log("updateInfo::" + JSON.stringify(response.data));
          setCompanyData(response.data); // Assuming the API returns an array of company data
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Set loading to false after receiving the response (whether success or error)
    }
  };

  async function modifyContent(data) {
    return Promise.all(
      data.map(async (item) => {
        try {
          item.statename = await GetStateName(item.stateid);
          item.cityname = await GetCityName(item.stateid, item.cityid);
        } catch (error) {
          console.log(error);
        }
      })
    );
  }

  const GetStateName = async (stateid) => {
    try {
      console.log("statename is :" + stateid);
      const state = await GetState(101);
      const stateInfo = state.find((e) => e.id === stateid);
      return stateInfo ? stateInfo.name : "";
    } catch (error) {
      console.log(error);
      return "";
    }
  };

  const GetCityName = async (stateid, cityid) => {
    try {
      const city = await GetCity(101, stateid);
      const cityInfo = city.find((e) => e.id === cityid);
      return cityInfo ? cityInfo.name : "";
    } catch (error) {
      console.log(error);
      return "";
    }
  };

  //=====================Company Info Detail========================
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "companyName",
      headerName: "Company Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "statename",
      headerName: "State",
      flex: 1,
    },
    {
      field: "cityname",
      headerName: "City",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone No",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },

    {
      field: "cinNo",
      headerName: "CIN No",
      flex: 1,
    },
    {
      field: "gstNo",
      headerName: "GST No",
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

  const handleEdit = (row) => {
    //initialValues = row;

    setStateid(row.stateid);
    GetCity(101, row.stateid).then((result) => {
      setCityList(result);
      setCityid(row.cityid);
    });
    //setCityid(row.cityid);
    setInitialValues(row);
    setSelectedValues(row);
    setAvatarPreview(row.image);
    console.log(`Edit button clicked for row : ${row}`);

    // Assuming your API response includes a 'companyId' field
    const companyId = row.id;
    // Add the companyId to form values
    setInitialValues((prevValues) => ({
      ...prevValues,
      companyId,
    }));
  };

  const handleDelete = (id) => {
    setShowConfirmation(true);
    setDeleteId(id);
    console.log(`Delete button clicked for row with ID: ${id}`);
  };


  const deleteItem = async () => {
    try {
      if (deleteId !== 0) {
        const company = await fetch(
          `http://localhost:4000/companies/deleteCompany/${deleteId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (company.ok) {
          const companyResponseData = await company.json();
          console.log("Company deleted successfully:", companyResponseData);
          toast.success("Data deleted successfully");

          fetchData();
        } else {
          // Log the error status and response text
          console.error(
            "Failed to delete company:",
            company.status,
            company.statusText
          );
          toast.error("Failed to delete data");
        }
      }
    } catch (error) {
      console.error("Error during delete company:", error);
      // Handle other errors
      toast.error("Error during delete operation");
    }
  };

  return (
    <Box m="20px">
      <Header title="Add Company" />

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
                  label="Company Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.companyName}
                  name="companyName"
                  error={!!touched.companyName && !!errors.companyName}
                  helperText={touched.companyName && errors.companyName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="CIN No."
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.cinNo}
                  name="cinNo"
                  error={!!touched.cinNo && !!errors.cinNo}
                  helperText={touched.cinNo && errors.cinNo}
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
                  label="GST No."
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
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Phone Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phone}
                  name="phone"
                  error={!!touched.phone && !!errors.phone}
                  helperText={touched.phone && errors.phone}
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

                <div className="mb-3">
                  <div className="d-flex align-items-center">
                    <div className="input-foam">
                      <label className="form-label" htmlFor="customFile">
                        Company Logo
                      </label>
                      <div className="me-3">
                        <figure className="avatar item-rtl">
                          <img
                            className="rounded-circle"
                            src={avatarPreview}
                            alt="image"
                          />
                        </figure>
                      </div>

                      <Box display="flex" mt="10px">
                        <input
                          type="file"
                          name="image"
                          className="form-control"
                          id="customFile"
                          accept="images/*"
                          onChange={(e) => {
                            setFieldValue("image", e.target.files[0], false);
                            handleSetAvatarPreview(e);
                          }}
                        />
                      </Box>
                    </div>
                  </div>
                </div>
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
        <Header title="Company Details" />
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
          {loading ? (
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
            <DataGrid rows={companyData} columns={columns} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  companyName: yup.string().required("Please enter company name"),
  // stateid: yup.string().required("Please select state"),
  // cityid: yup.string().required("Please select city"),
  cinNo: yup.string().required("Please enter CIN No."),
  gstNo: yup.string().required("Please enter GST No."),
  email: yup.string().email("invalid email").required("Please enter email"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .length(10)
    .required("Please enter mobile number"),
  address: yup.string().required("Please enter address"),
  // avatar: yup.string().required("Please select company logo"),
});


export default CompanyMaster;
