const CoinDetail = ({ detail, click, show }) => {
  return (
    <tbody>
      {detail.map((crypto) => (
        <React.Fragment key={crypto.id}>
          <tr className="ali">
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
            <td className="show-chart">
              <button onClick={click} className={crypto.id}>
                show
              </button>
            </td>
          </tr>
          {show && <CoinChart data={crypto} />}
        </React.Fragment>
      ))}
    </tbody>
  )
}

CoinDetail.propTypes = {
  detail: PropTypes.array.isRequired,
}
