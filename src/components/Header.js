import "../styles/components/header.scss";

function Header({ theme, setTheme }) {
  return (
    <header>
      <h1>calc</h1>
      <div className="theme-switcher-wrapper">
        <h6>THEME</h6>
        <div className="theme-switcher">
          <div className="labels">
            <label htmlFor="theme-1" className="label-1">
              1
            </label>
            <label htmlFor="theme-2" className="label-2">
              2
            </label>
            <label htmlFor="theme-3" className="label-3">
              3
            </label>
          </div>
          <div className="options">
            <input
              id="theme-1"
              type="radio"
              name="theme"
              value="0"
              onClick={() => setTheme(1)}
              defaultChecked={theme === 1}
            />

            <input
              id="theme-2"
              type="radio"
              value="1"
              name="theme"
              onClick={() => setTheme(2)}
              defaultChecked={theme === 2}
            />

            <input
              id="theme-3"
              type="radio"
              value="2"
              name="theme"
              onClick={() => setTheme(3)}
              defaultChecked={theme === 3}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
