// App.jsx
// import elements from components folder
import Navbar from "./components/navbar";
import Sidebar from "./components/Sidebar";
import OrderCard from "./components/OrderCard";
import OrderForm from "./components/OrderForm";
// Import the global CSS file to apply styles
import "./App.css";
// Create the main App component
function App() {
  return (
     // The main container for the whole app
    <div className="App">
      {/* Navbar is fixed at the top it contains the title */}
      <Navbar />
        {/* Sidebar component is usually placed on the left side for navigation */}
      <Sidebar />
      <div className="content">
         {/* OrderCard component displays the list of products as cards */}
        <OrderCard />
        <OrderForm />
      </div>
    </div>
  );
}

export default App;


