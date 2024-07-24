/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react'
import Chart, { ChartConfiguration, ChartDataset } from 'chart.js/auto'

interface LineChartProps {
  datasets: ChartDataset<'line', number[]>[] // Array of datasets
  labels: string[]
  sideTitle?: string
  bottomTitle?: string
}

const LineChart: React.FC<LineChartProps> = ({
  datasets,
  labels,
  sideTitle,
  bottomTitle
}) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null)
  let lineChart: Chart<'line'> | null = null

  useEffect(() => {
    if (chartRef.current) {
      if (lineChart) {
        lineChart.destroy()
      }

      const chartConfig: ChartConfiguration<'line'> = {
        type: 'line',
        data: {
          labels: labels,
          datasets: datasets
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            },
            tooltip: {
              mode: 'index',
              intersect: false
            }
          },
          indexAxis: 'x',
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

      lineChart = new Chart(chartRef.current, chartConfig)
    }

    return () => {
      if (lineChart) {
        lineChart.destroy()
      }
    }
  }, [datasets, labels])

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  )
}

export default LineChart
