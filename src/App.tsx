import MainFeed from "./components/MainFeed"
import Navbar from "./components/Navbar/Navbar"
// import SideBar from "./components/SideBar"

function App() {

  return (
    <div className="flex">
      {/* <SideBar /> */}
      <Navbar />
      <MainFeed />
    </div>
  )
}

export default App
