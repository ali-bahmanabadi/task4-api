const chart = (dataCoin, label, canvasId) => {
  const ctx = document.getElementById(canvasId)
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: Array.from({ length: 168 }, (v, i) => i),
      datasets: [
        {
          label: label,
          data: dataCoin,
          borderColor: 'crimson',
          borderWidth: 1,
        },
      ],
    },
  })
}
