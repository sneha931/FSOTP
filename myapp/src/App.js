import {Toaster} from "react-hot-toast";
import Homepage from "./components/Homepage.jsx";
import Register from "./components/Register";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Verification from "./components/Verification";
function App() {
    return(<div>
    <Router>
        <Routes>
            <Route path="/" element={<Register/>}></Route>
            <Route path="/Verification" element={<Verification/>}></Route>
            <Route path="/Homepage" element={<Homepage/>}></Route>
        </Routes>
    </Router>
        <Toaster/>
    </div>);
}
export default App;