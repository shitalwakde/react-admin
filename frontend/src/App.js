import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import CompanyMaster from "./scenes/master/CompanyMaster";
import AddSubContractor from "./scenes/master/AddSubContractor";
import AddPartner from "./scenes/master/AddPartner";
import AreaMaster from "./scenes/master/AreaMaster";
import TaxMaster from "./scenes/master/TaxMaster";
import CategoryMaster from "./scenes/master/CategoryMaster";
import SubCategoryMaster from "./scenes/master/SubCategoryMaster";
import AddExpenseType from "./scenes/master/AddExpenseType";
import UnitMaster from "./scenes/master/UnitMaster";
import AddSecurityDeposite from "./scenes/security_deposite/AddSecurityDeposite";
import SecurityDepositeDetails from "./scenes/security_deposite/SecurityDepositeDetails";
import SecurityDepositeReminder from "./scenes/security_deposite/SecurityDepositeReminder";
import AddNewVendor from "./scenes/supplier/AddNewVendor";
import VendorDetailList from "./scenes/supplier/VendorDetailList";
import VendorLedgerDetails from "./scenes/supplier/VendorLedgerDetails";
import AddPurchaseOrder from "./scenes/supplier/AddPurchaseOrder";
import PurchaseOrderDetails from "./scenes/supplier/PurchaseOrderDetails";



function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    // <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/master/CompanyMaster" element={<CompanyMaster/>}/>
              <Route path="/master/AddSubContractor" element={<AddSubContractor/>}/>
              <Route path="/master/AddPartner" element={<AddPartner/>}/>
              <Route path="/master/AreaMaster" element={<AreaMaster/>}/>
              <Route path="/master/TaxMaster" element={<TaxMaster/>}/>
              <Route path="/master/CategoryMaster" element={<CategoryMaster/>}/>
              <Route path="/master/SubCategoryMaster" element={<SubCategoryMaster/>}/>
              <Route path="/master/AddExpenseType" element={<AddExpenseType/>}/>
              <Route path="/master/UnitMaster" element={<UnitMaster/>}/>
              <Route path="/security_deposite/AddSecurityDeposite" element={<AddSecurityDeposite/>}/>
              <Route path="/security_deposite/SecurityDepositeDetails" element={<SecurityDepositeDetails/>}/>
              <Route path="/security_deposite/SecurityDepositeReminder" element={<SecurityDepositeReminder/>}/>
              <Route path="/supplier/AddNewVendor" element={<AddNewVendor/>}/>
              <Route path="/supplier/VendorDetailList" element={<VendorDetailList/>}/>
              <Route path="/supplier/VendorLedgerDetails" element={<VendorLedgerDetails/>}/>
              <Route path="/supplier/AddPurchaseOrder" element={<AddPurchaseOrder/>}/>
              <Route path="/supplier/PurchaseOrderDetails" element={<PurchaseOrderDetails/>}/>
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    // </ColorModeContext.Provider>
  );
}

export default App;