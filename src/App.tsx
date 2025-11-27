import Navbar from "./components/Navbar/Navbar";
import TrendingBar from "./components/Trending/TrendingBar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="flex flex-col justify-between md:flex-row ">
      <Navbar />
      <main className="w-full flex flex-col items-center  py-10">
        <Outlet /> {/* ← All pages go here */}
      </main>
      <TrendingBar />
    </div>
  );
}

export default App;
