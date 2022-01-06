const CoinsTitle = (props) => {
  return (
    <thead>
      <tr>
        <th style={{ cursor: 'pointer' }} onClick={props.rank}>
          <span>rank</span>
          <span className="m-l">
            <i
              className={`fas ${
                props.arrowRank ? 'fa-sort-down' : 'fa-sort-up'
              } `}
            ></i>
          </span>
        </th>
        <th style={{ cursor: 'pointer' }} onClick={props.coin} colSpan="2">
          <span>coin</span>
          <span className="m-l">
            <i
              className={`fas ${
                props.arrowCoin ? 'fa-sort-down' : 'fa-sort-up'
              } `}
            ></i>
          </span>
        </th>
        <th style={{ cursor: 'pointer' }} onClick={props.price}>
          <span>price</span>
          <span className="m-l">
            <i
              className={`fas ${
                props.arrowPrice ? 'fa-sort-down' : 'fa-sort-up'
              } `}
            ></i>
          </span>
        </th>
        <th style={{ cursor: 'pointer' }} onClick={props.change}>
          <span>change (24h)</span>
          <span className="m-l">
            <i
              className={`fas ${
                props.arrowChange ? 'fa-sort-down' : 'fa-sort-up'
              } `}
            ></i>
          </span>
        </th>
        <th style={{ cursor: 'pointer' }} onClick={props.marketCap}>
          <span>market cap</span>
          <span className="m-l">
            <i
              className={`fas ${
                props.arrowMarketCap ? 'fa-sort-down' : 'fa-sort-up'
              } `}
            ></i>
          </span>
        </th>
        <th>chart</th>
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
