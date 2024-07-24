/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react'
import Chart, { ChartConfiguration, ChartDataset } from 'chart.js/auto'

interface BarChartProps {
  datasets: ChartDataset<'bar', number[]>[] // Array of datasets
  labels: string[]
  sideTitle?: string
  bottomTitle?: string
}

const BarChart: React.FC<BarChartProps> = ({
  datasets,
  labels,
  sideTitle,
  bottomTitle
}) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null)
  let barChart: Chart<'bar'> | null = null

  useEffect(() => {
    if (chartRef.current) {
      if (barChart) {
        barChart.destroy()
      }

      const chartConfig: ChartConfiguration<'bar'> = {
        type: 'bar',
        data: {
          labels: labels,
          datasets: datasets
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
              display: false
            },
            tooltip: {
              mode: 'index',
              intersect: false
            }
          },
          indexAxis: 'x', // This makes the bar chart horizontal
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: bottomTitle ?? 'Data'
              }
            },
            y: {
              display: true,
              title: {
                display: true,
                text: sideTitle ?? 'Value'
              }
            }
          }
        }
      }

      barChart = new Chart(chartRef.current, chartConfig)
    }

    return () => {
      if (barChart) {
        barChart.destroy()
      }
    }
  }, [datasets, labels])

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  )
}

export default BarChart
