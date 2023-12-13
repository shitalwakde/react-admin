import React, { useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import ScatterPlotSharpIcon from '@mui/icons-material/ScatterPlotSharp';

const SubMenuItem = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Item = ({ title, to, icon, selected, setSelected, subItems }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      {subItems ? (
        <SubMenu title={title}>
          {subItems.map((subItem) => (
            <SubMenuItem
              key={subItem.title}
              title={subItem.title}
              to={subItem.to}
              icon={icon}
              selected={selected}
              setSelected={setSelected}
            />
          ))}
        </SubMenu>
      ) : (
        <MenuItem
          active={selected === title}
          style={{
            color: colors.grey[100],
          }}
          onClick={() => setSelected(title)}
          icon={icon}
        >
          <Typography>{title}</Typography>
          <Link to={to} />
        </MenuItem>
      )}
    </>
  );
};



const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  const masterSubItems = [
    { title: "Company Master", to: "/master/CompanyMaster" },
    { title: "Add Sub Contractor", to: "/master/AddSubContractor" },
    { title: "Add Partner", to: "/master/AddPartner" },
    { title: "Area Master", to: "/master/AreaMaster" },
    { title: "Tax Master", to: "/master/TaxMaster" },
    { title: "Category Master", to: "/master/CategoryMaster" },
    { title: "Sub Category Master", to: "/master/SubCategoryMaster" },
    { title: "Add Expense Type", to: "/master/AddExpenseType" },
    { title: "Unit Master", to: "/master/UnitMaster" },
  ];

  const securityDepositeSubItems = [
    { title: "Order Copy", to: "/security_deposite/OrderCopy" },
    {
      title: "Order Copy Details",
      to: "/security_deposite/OrderCopyDetails",
    },
    {
      title: "Order Copy Reminder",
      to: "/security_deposite/OrderCopyReminder",
    },
  ];


  const supplierSubItems = [
    { title: "Add New Vendor", to: "/supplier/AddNewVendor" },
    { title: "Vendor Detail List", to: "/supplier/VendorDetailList" },
    { title: "Add Purchase Order", to: "/supplier/AddPurchaseOrder" },
    { title: "Purchase Order Details", to: "/supplier/PurchaseOrderDetails" },
    { title: "Add Purchase Payment", to: "/supplier/AddPurchasePayment" },
    { title: "Purchase Payment Detail", to: "/supplier/PurchasePaymentDetail" },
    { title: "Vendor Ledger Details", to: "/supplier/VendorLedgerDetails" },    
  ];


  const paymentSubItems = [
    { title: "Personal Payment Detail", to: "/payment/PersonalPaymentDetail" },
    { title: "TDS Payment Detail", to: "/payment/TDSPaymentDetail" },
  ];


  const myProjectSubItems = [
    { title: "Project Category", to: "/my_project/ProjectCategory" },
    { title: "Add New Project", to: "/my_project/AddNewProject" },
    { title: "Project Detail", to: "/my_project/ProjectDetail" },
    { title: "Project Completion", to: "/my_project/ProjectCompletion" },
    { title: "Project Completed Detail", to: "/my_project/ProjectCompletedDetail" },
    { title: "Project Report", to: "/my_project/ProjectReport" },  
  ];

  const raBillSubItems = [
    { title: "Add RA Bill", to: "/ra_bill/AddRABill" },
    { title: "RA Bill Ledger", to: "/ra_bill/RABillLedger" },
  ];


  const clientsSubItems = [
    { title: "Add New Client", to: "/clients/AddNewClient" },
    { title: "Client Detail", to: "/clients/ClientDetail" },
  ];


  const saleSubItems = [
    { title: "Create Sale", to: "/sale/CreateSale" },
    { title: "Sale Detail", to: "/sale/SaleDetail" },
  ];


  const officeExpensesSubItems = [
    { title: "Office Expenses", to: "/office_expenses/OfficeExpenses" },
  ];


  const taxInvoiceSubItems = [
    { title: "Create Invoice", to: "/tax_invoice/CreateInvoice" },
    { title: "Invoice Detail", to: "/tax_invoice/InvoiceDetail" },
    { title: "Tax Invoice Detail", to: "/tax_invoice/TaxInvoiceDetail" },    
  ];


  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  ADMINIS
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/user.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Ed Roh
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  VP Fancy Admin
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography> */}
            <Item
              title="Master"
              icon={<ScatterPlotSharpIcon />}
              selected={selected}
              setSelected={setSelected}
              subItems={masterSubItems}
            />
            <Item
              title="Security Deposite"
              icon={<ScatterPlotSharpIcon />}
              selected={selected}
              setSelected={setSelected}
              subItems={securityDepositeSubItems}
              />
            <Item
              title="Supplier"
              icon={<ScatterPlotSharpIcon />}
              selected={selected}
              setSelected={setSelected}
              subItems={supplierSubItems}
              />
              <Item
              title="Payment"
              icon={<ScatterPlotSharpIcon />}
              selected={selected}
              setSelected={setSelected}
              subItems={paymentSubItems}
              />
              <Item
              title="My Project"
              icon={<ScatterPlotSharpIcon />}
              selected={selected}
              setSelected={setSelected}
              subItems={myProjectSubItems}
              />
              <Item
              title="RA Bill"
              icon={<ScatterPlotSharpIcon />}
              selected={selected}
              setSelected={setSelected}
              subItems={raBillSubItems}
              />
              <Item
              title="Clients"
              icon={<ScatterPlotSharpIcon />}
              selected={selected}
              setSelected={setSelected}
              subItems={clientsSubItems}
              />
              <Item
              title="Sale"
              icon={<ScatterPlotSharpIcon />}
              selected={selected}
              setSelected={setSelected}
              subItems={saleSubItems}
              />
              <Item
              title="Office Expenses"
              icon={<ScatterPlotSharpIcon />}
              selected={selected}
              setSelected={setSelected}
              subItems={officeExpensesSubItems}
              />
              <Item
              title="Tax Invoice"
              icon={<ScatterPlotSharpIcon />}
              selected={selected}
              setSelected={setSelected}
              subItems={taxInvoiceSubItems}
              />
            <Item
              title="Manage Team"
              to="/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Contacts Information"
              to="/contacts"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Invoices Balances"
              to="/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography> */}
            <Item
              title="Profile Form"
              to="/form"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ Page"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography> */}
            <Item
              title="Bar Chart"
              to="/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Pie Chart"
              to="/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Line Chart"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Geography Chart"
              to="/geography"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
