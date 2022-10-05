import { useEffect, useState } from "react";
import Calculator from "./components/Calculator";
import Header from "./components/Header";

function App() {
  const [theme, setTheme] = useState(1);
  useEffect(() => {
    switch (theme) {
      case 1:
        document.body.setAttribute("class", "");
        document.body.classList.add("theme-1");
        break;
      case 2:
        document.body.setAttribute("class", "");
        document.body.classList.add("theme-2");
        break;
      case 3:
        document.body.setAttribute("class", "");
        document.body.classList.add("theme-3");
        break;
      default:
        document.body.classList.add("theme-1");
        break;
    }
  }, [theme]);

  return (
    <main

    >
      <Header theme={theme} setTheme={setTheme} />
      <Calculator />
    </main>
  );
}

export default App;
