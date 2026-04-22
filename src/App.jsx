import "./App.css";
import CompanyDashboard from "./components/CompanyDashboard";
import { CompanyProvider } from "./context/CompanyContext";

function App() {
  return (
    <>
      <CompanyProvider>
        <CompanyDashboard />
      </CompanyProvider>
    </>
  );
}

export default App;
