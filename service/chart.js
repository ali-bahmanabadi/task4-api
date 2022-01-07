const chart = (dataCoin, label, canvasId) => {
  const ctx = document.getElementById(canvasId)

  // animate 
  const totalDuration = 2000
  const delayBetweenPoints = totalDuration / dataCoin.length
  const previousY = (ctx) =>
    ctx.index === 0
      ? ctx.chart.scales.y.getPixelForValue(100)
      : ctx.chart
          .getDatasetMeta(ctx.datasetIndex)
        .data[ctx.index - 1].getProps(['y'], true).y
  
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: Array.from({ length: dataCoin.length }, (v, i) => i),
      datasets: [
        {
          label: label,
          data: dataCoin,
          borderColor: 'crimson',
          borderWidth: 1,
        },
      ],
    },
    options: {
      fill: false,
      interaction: {
        intersect: false,
      },
      radius: 0,
      animation: {
        x: {
          type: 'number',
          easing: 'linear',
          duration: delayBetweenPoints,
          from: NaN, // the point is initially skipped
          delay(ctx) {
            if (ctx.type !== 'data' || ctx.xStarted) {
              return 0
            }
            ctx.xStarted = true
            return ctx.index * delayBetweenPoints
          },
        },
        y: {
          type: 'number',
          easing: 'linear',
          duration: delayBetweenPoints,
          from: previousY,
          delay(ctx) {
            if (ctx.type !== 'data' || ctx.yStarted) {
              return 0
            }
            ctx.yStarted = true
            return ctx.index * delayBetweenPoints
          },
        },
      },
    },
  })
}
