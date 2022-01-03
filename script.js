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
        <h1>Crypto Currency Price</h1>
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

const Footer = () => {
  return <footer>Footer</footer>
}

const CoinsTitle = ({arrowRank, rank, coin, arrowCoin, price, arrowPrice}) => {
  return (
    <thead>
      <tr>
        <th style={{ cursor: 'pointer' }} onClick={rank}>
          <span>rank</span>
          <span className="m-l">
            <i
              className={`fas ${arrowRank ? 'fa-sort-down' : 'fa-sort-up'} `}
            ></i>
          </span>
        </th>
        <th style={{ cursor: 'pointer' }} onClick={coin} colSpan="2">
          <span>coin</span>
          <span className="m-l">
            <i
              className={`fas ${arrowCoin ? 'fa-sort-down' : 'fa-sort-up'} `}
            ></i>
          </span>
        </th>
        <th style={{ cursor: 'pointer' }} onClick={price}>
          <span>price</span>
          <span className="m-l">
            <i
              className={`fas ${arrowPrice ? 'fa-sort-down' : 'fa-sort-up'} `}
            ></i>
          </span>
        </th>
        <th>change</th>
        <th>market cap</th>
      </tr>
    </thead>
  )
}

CoinsTitle.propTypes = {
  rank: PropTypes.func,
  arrowRank: PropTypes.bool,
  coin: PropTypes.func,
  arrowCoin: PropTypes.bool,
  price: PropTypes.func,
  arrowPrice: PropTypes.bool,
}

const CoinDetail = ({ detail }) => {
  return (
    <tbody>
      {detail.map((crypto) => (
        <tr key={crypto.id}>
          <td className="rank">{crypto.market_cap_rank}</td>
          <td className="img-name">
            <span>
              <img src={crypto.image} alt={crypto.name} />
            </span>
            <span className="name">{crypto.name}</span>
          </td>
          <td className="symbol">
            <span>{`( ${crypto.symbol} )`}</span>
          </td>
          <td className="price">{crypto.current_price.toLocaleString()}</td>
          <td
            className={`percentage ${
              crypto.price_change_percentage_24h > 0
                ? 'percentage-top'
                : 'percentage-button'
            }`}
          >
            <span>{crypto.price_change_percentage_24h?.toFixed(1)} %</span>
            <span>
              <i
                className={`fas m-l ${
                  crypto.price_change_percentage_24h > 0
                    ? 'fa-long-arrow-alt-up'
                    : 'fa-long-arrow-alt-down'
                }`}
              ></i>
            </span>
          </td>
          <td className="market-cap">{crypto.market_cap.toLocaleString()}</td>
        </tr>
      ))}
    </tbody>
  )
}

CoinDetail.propTypes = {
  detail: PropTypes.array.isRequired
}

const Loading = () => {
  return (
    <div className="loading">
      <img src="./assets/loading.gif" />
    </div>
  )
}

const NumberOfView = ({ value, change }) => {
  return (
    <>
      <label className="number-view m-l">Number Of View: </label>
      <select defaultValue={value} onChange={change}>
        <option value={10}>10</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
        <option value={250}>250</option>
      </select>
    </>
  )
}

NumberOfView.propTypes = {
  value: PropTypes.number,
  change: PropTypes.func
}

const PageNavigate = ({click, page}) => {
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
  page: PropTypes.number
}

const CoinWrapper = () => {
  const [data, setData] = React.useState([])
  const [search, setSearch] = React.useState('')
  const [selectedNumber, setSelectedNumber] = React.useState(100)
  const [sortRank, setSortRank] = React.useState(true)
  const [sortCoin, setSortCoin] = React.useState(true)
  const [sortPrice, setSortPrice] = React.useState(true)
  
  const [pageNavigate, setPageNavigate] = React.useState(1)

  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    setLoading(true)
    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${selectedNumber}&page=${pageNavigate}&sparkline=false`
    )
      .then((response) => response.json())
      .then((json) => {
        setData(json)
        setLoading(false)
      })
  }, [selectedNumber,pageNavigate])

  const searchCoins = data.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  )

  const selectHandler = (e) => {
    setSelectedNumber(+e.target.value)
  }

  const sortRankHandler = () => {
    setSortRank(!sortRank)
    setSortCoin(true)
    setSortPrice(true)
    const sortRankData = sortRank
      ? data.sort((a, b) => b.market_cap_rank - a.market_cap_rank)
      : data.sort((a, b) => a.market_cap_rank - b.market_cap_rank)
    setData(sortRankData)
  }

  const sortCoinHandler = () => {
    setSortCoin(!sortCoin)
    setSortPrice(true)
    setSortRank(true)
    const sortCoinData = sortCoin
      ? data.sort((a, b) => {
          if (a.name.toLowerCase() > b.name.toLowerCase()) return -1
          if (a.name.toLowerCase() < b.name.toLowerCase()) return 1
          return 0
        })
      : data.sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) return -1
          if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
          return 0
        })
    setData(sortCoinData)
  }

  const sortPriceHandler = () => {
    setSortPrice(!sortPrice)
    setSortCoin(true)
    setSortRank(true)
    const sortPriceData = sortPrice
      ? data.sort((a, b) => b.current_price - a.current_price)
      : data.sort((a, b) => a.current_price - b.current_price)
    setData(sortPriceData)
  }

  const navigateHandler = (e) => {
    setPageNavigate(+e.target.textContent);
  }

  return (
    <div className="coin-wrapper">
      <div className="costume-search-area">
        <input
          className="search-crypto"
          value={search}
          placeholder="Search crypto currency"
          onChange={(e) => setSearch(e.target.value)}
        />

        <NumberOfView value={selectedNumber} change={selectHandler} />
        <PageNavigate click={navigateHandler} page={pageNavigate} />
      </div>
      {loading ? (
        <Loading />
      ) : (
      <table>
          <CoinsTitle
            rank={sortRankHandler}
            arrowRank={sortRank}
            coin={sortCoinHandler}
            arrowCoin={sortCoin}
            price={sortPriceHandler}
            arrowPrice={sortPrice}
          />
          <CoinDetail detail={searchCoins} />
        </table>
      )}
    </div>
  )
}

const Main = () => {
  return (
    <main>
      <CoinWrapper />
    </main>
  )
}

const App = () => {
  return (
    <div className="app">
      <Header />
      <Main />
      <Footer />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
