import MainFeed from "./components/MainFeed";
import Navbar from "./components/Navbar/Navbar";
import { ThemeProvider } from "./features/Dark_LightMode/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex">
        <Navbar />
        <MainFeed />
      </div>
    </ThemeProvider>
  );
}

export default App;
