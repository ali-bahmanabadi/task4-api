const CoinWrapper = () => {
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  const [search, setSearch] = React.useState('')
  const [selectedNumber, setSelectedNumber] = React.useState(10)
  const [pageNavigate, setPageNavigate] = React.useState(1)

  const [sortRank, setSortRank] = React.useState(true)
  const [sortCoin, setSortCoin] = React.useState(true)
  const [sortPrice, setSortPrice] = React.useState(true)
  const [sortChange, setSortChange] = React.useState(true)
  const [sortMarketCap, setSortMarketCap] = React.useState(true)

  const [showChart, setShowChart] = React.useState(false)

  React.useEffect(() => {
    setLoading(true)
    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${selectedNumber}&page=${pageNavigate}&sparkline=true`
    )
      .then((response) => response.json())
      .then((json) => {
        setData(json)
        setLoading(false)
      })
  }, [selectedNumber, pageNavigate])

  const searchCoins = data.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase().trim())
  )

  const selectHandler = (e) => {
    setSelectedNumber(+e.target.value)
  }

  const sortRankHandler = () => {
    setSortRank(!sortRank)
    setSortCoin(true)
    setSortPrice(true)
    setSortChange(true)
    const sortRankData = sortRank
      ? data.sort((a, b) => b.market_cap_rank - a.market_cap_rank)
      : data.sort((a, b) => a.market_cap_rank - b.market_cap_rank)
    setData(sortRankData)
  }

  const sortCoinHandler = () => {
    setSortCoin(!sortCoin)
    setSortPrice(true)
    setSortRank(true)
    setSortChange(true)
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
    setSortChange(true)
    const sortPriceData = sortPrice
      ? data.sort((a, b) => b.current_price - a.current_price)
      : data.sort((a, b) => a.current_price - b.current_price)
    setData(sortPriceData)
  }

  const navigateHandler = (e) => {
    setPageNavigate(+e.target.textContent)
  }

  const sortChangeHandler = () => {
    setSortChange(!sortChange)
    setSortPrice(true)
    setSortCoin(true)
    setSortRank(true)
    const sortChangeDetail = sortChange
      ? data.sort(
          (a, b) =>
            b.price_change_percentage_24h - a.price_change_percentage_24h
        )
      : data.sort(
          (a, b) =>
            a.price_change_percentage_24h - b.price_change_percentage_24h
        )
    setData(sortChangeDetail)
  }

  const sortMarketCapHandler = () => {
    setSortMarketCap(!sortMarketCap)
    setSortChange(true)
    setSortPrice(true)
    setSortCoin(true)
    setSortRank(true)
    const marketSort = sortMarketCap
      ? data.sort((a, b) => b.market_cap - a.market_cap)
      : data.sort((a, b) => a.market_cap - b.market_cap)
    setData(marketSort)
  }

  const showChartHandler = (e) => {
    setShowChart(!showChart)
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
            change={sortChangeHandler}
            arrowChange={sortChange}
            marketCap={sortMarketCapHandler}
            arrowMarketCap={sortMarketCap}
          />
          <CoinDetail detail={searchCoins} click={showChartHandler} show={showChart} />
        </table>
      )}
    </div>
  )
}
