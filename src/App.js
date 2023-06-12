
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddUsers from "./components/AddUsers";
import GetUsers from "./components/GetUsers";

function App() {
 return(
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<GetUsers/>}/>
        <Route path="/get" element={<GetUsers />}/>
        <Route path="/add" element={<AddUsers />}/>

      </Routes>
    </BrowserRouter>
 )
}
export default App;