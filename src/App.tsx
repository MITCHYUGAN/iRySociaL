import MainFeed from "./components/MainFeed";
import Navbar from "./components/Navbar/Navbar";
import { ThemeProvider } from "./features/Dark_LightMode/theme-provider";
// import SideBar from "./components/SideBar"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex">
        {/* <SideBar /> */}
        <Navbar />
        <MainFeed />
      </div>
    </ThemeProvider>
  );
}

export default App;
