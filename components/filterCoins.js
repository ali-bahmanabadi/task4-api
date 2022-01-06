const NumberOfView = ({ value, change }) => {
  return (
    <>
      <label className="number-view m-l">Number Of View: </label>
      <select defaultValue={value} onChange={change}>
        <option>10</option>
        <option>50</option>
        <option>100</option>
        <option>250</option>
      </select>
    </>
  )
}

NumberOfView.propTypes = {
  value: PropTypes.number,
  change: PropTypes.func,
}

const PageNavigate = ({ click, page }) => {
  return (
    <>
      <label className="number-view m-l">Page Number: </label>
      <div className="page-number-area">
        <span onClick={click} className={page === 1 ? 'active' : null}>
          1
        </span>
        <span onClick={click} className={page === 2 ? 'active' : null}>
          2
        </span>
        <span onClick={click} className={page === 3 ? 'active' : null}>
          3
        </span>
        <span onClick={click} className={page === 4 ? 'active' : null}>
          4
        </span>
        <span onClick={click} className={page === 5 ? 'active' : null}>
          5
        </span>
      </div>
    </>
  )
}

PageNavigate.propTypes = {
  click: PropTypes.func,
  page: PropTypes.number,
}
