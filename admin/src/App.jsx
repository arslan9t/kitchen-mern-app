import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./components/Login.jsx";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import { StoreContext } from "./context/StoreContext.jsx";
import Add from "./pages/Add.jsx";
import List from "./pages/List.jsx";
import Order from "./pages/Order.jsx";
import Settings from "./pages/Settings.jsx";

Add;
function App() {
	const { url, token } = useContext(StoreContext);

	return (
		<div>
			{!token ?
				<div>
					<Login />
				</div>
			:	<div>
					<ToastContainer />
					<Navbar />
					<hr />
					<div className="flex w-full">
						<Sidebar />
						<Routes>
							<Route path="/add" element={<Add url={url} />} />
							<Route path="/order" element={<Order url={url} />} />
							<Route path="/list" element={<List url={url} />} />
							<Route path="/settings" element={<Settings />} />
						</Routes>
					</div>
				</div>
			}
		</div>
	);
}

export default App;
