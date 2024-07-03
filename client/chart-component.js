import ChartJS from 'chart.js/auto';

class Chart extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.data = []
  }

  async connectedCallback () {
    await this.loadData()
    await this.render()
    this.loadChart()
  }

  async loadData () {
    const response = await fetch('/src/owners.json')

    if (response.ok) {
      this.data = await response.json()
    } else {
      console.log(response)
    }
  }

  render () {
    this.shadow.innerHTML =
    /* html */`
      <canvas class="chart"></canvas>
    `
  }

  loadChart () { 
    const ctx = this.shadow.querySelector('.chart').getContext('2d');
    const labels = Object.keys(this.data)
    const data = Object.values(this.data).map(group => group.owners)
    console.log(data)

    const datasets = Object.keys(this.data).map(group => ({
      label: group,
      data: data,
      fill: false,
      borderColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
      tension: 0.1
    }));

    const myChart = new ChartJS(ctx, {
      type: this.getAttribute('type') || 'line',
      data: {
        labels: labels,
        datasets: datasets
      },
      options: {
        scales: {
          y: {
            beginAtZero: false
          }
        }
      }
    })
  }
}

customElements.define('chart-component', Chart)
