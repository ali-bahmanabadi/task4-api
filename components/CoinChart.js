const CoinChart = ({ data }) => {
  React.useEffect(() => {
    chart(data.sparkline_in_7d.price, data.name, data.id)
  }, [])
  return (
    <tr className="chart-wrapper">
      <td colSpan="7">
        <div className="chart-title">Changes of the last 7 days</div>
        <div className="graph-area">
          <div>
            <canvas id={data.id} width="1100px" height="400"></canvas>
          </div>
        </div>
      </td>
    </tr>
  )
}
