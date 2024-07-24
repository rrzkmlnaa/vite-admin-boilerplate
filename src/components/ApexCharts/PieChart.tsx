/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react'
import Chart, { ChartConfiguration, ChartDataset } from 'chart.js/auto'

interface PieChartProps {
  datasets: ChartDataset<'pie', number[]>[] // Array of datasets for Pie chart
  labels: string[]
}

const PieChart: React.FC<PieChartProps> = ({ datasets, labels }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null)
  let pieChart: Chart<'pie'> | null = null

  useEffect(() => {
    if (chartRef.current) {
      if (pieChart) {
        pieChart.destroy()
      }

      const chartConfig: ChartConfiguration<'pie'> = {
        type: 'pie',
        data: {
          labels: labels,
          datasets: datasets
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
              display: true
            },
            tooltip: {
              mode: 'index',
              intersect: false
            }
          }
        }
      }

      pieChart = new Chart(chartRef.current, chartConfig)
    }

    return () => {
      if (pieChart) {
        pieChart.destroy()
      }
    }
  }, [datasets, labels])

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  )
}

export default PieChart
