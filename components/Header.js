const Header = () => {
  const initialState =
    localStorage.getItem('darkTheme') === null
      ? false
      : JSON.parse(localStorage.getItem('darkTheme'))

  const [dark, setDark] = React.useState(initialState)

  React.useEffect(() => {
    if (dark) {
      document.body.setAttribute('class', 'dark')
    } else {
      document.body.setAttribute('class', 'light')
    }
  }, [dark])

  const darkButtonHandler = (e) => {
    localStorage.setItem('darkTheme', e.target.checked)
    setDark(e.target.checked)
  }

  return (
    <header>
      <div className="container">
        <h1>Cryptocurrency Price by Market Cap</h1>
        <div className="color-theme">
          <input
            type="checkbox"
            className="light-dark"
            id="dark"
            value={dark}
            onChange={darkButtonHandler}
            checked={dark}
          />
          <label htmlFor="dark">
            {dark ? (
              <i className="fas fa-sun"></i>
            ) : (
              <i className="fas fa-moon"></i>
            )}
          </label>
        </div>
      </div>
    </header>
  )
}

