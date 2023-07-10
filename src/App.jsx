import "./index.css"
import Login from "./components/Login";
import ToasterProvider from "./providers/ToasterProvicer";

const App = () => {
  return ( 
    <>
      <ToasterProvider />
      <Login />
    </>
   );
}
 
export default App;