"use client"

import { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { AppContext } from "/src/context/appContext";
import { Chart, registerables } from 'chart.js'
import { Line } from "react-chartjs-2";

Chart.register(...registerables)

export default function Dashboard ({ data }) {

    const canvas = useRef();
    const { account, token } = useContext(AppContext);

    const lineData1 = {
      labels: ["Enero", "Febrero", "Marzo", "Abril"],
      datasets: [
        {
          data: [1, 1.5, 3, 2],
          borderColor: '#9BD0F5',
          backgroundColor: '#9BD0F5',
          borderWidth: 2
        },
        {
          data: [2, 3.5, 1, 5],
          borderColor: '#FF795B',
          backgroundColor: '#FF795B',
          borderWidth: 2
        }
      ]
    }
    const lineData2 = {
      labels: ["Enero", "Febrero", "Marzo", "Abril"],
      datasets: [
        {
          data: [1, 1.5, 3, 2],
          borderColor: '#FFB1C1',
          backgroundColor: '#FFB1C1',
          borderWidth: 2
        }
      ]
    }
    const options = {
      plugins: {
        legend: {
          display: false,
        }
      },
      scales: {
        yAxis: {
          display: false,
          scaleLabel: {
            display: false,
          },
          gridLines: {
            display: false
          }
        },
        xAxis: {
          display: false,
          gridLines: {
            display: false
          }
        }
      }
    }
    const chart = [{
      data: [86, 114, 106, 106, 107, 111, 133],
      label: "Applied",
      borderColor: "#3e95cd",
      backgroundColor: "#7bb6dd",
      fill: false,
    }, {
      data: [70, 90, 44, 60, 83, 90, 100],
      label: "Accepted",
      borderColor: "#3cba9f",
      backgroundColor: "#71d1bd",
      fill: false,
    }, {
      data: [10, 21, 60, 44, 17, 21, 17],
      label: "Pending",
      borderColor: "#ffa500",
      backgroundColor: "#ffc04d",
      fill: false,
    }, {
      data: [6, 3, 2, 2, 7, 0, 16],
      label: "Rejected",
      borderColor: "#c45850",
      backgroundColor: "#d78f89",
      fill: false,
    }]
    useEffect(() => {
      const ctx = canvas.current;

      let chartStatus = Chart.getChart('myChart');
        if (chartStatus != undefined) {
          chartStatus.destroy();
      }
  
      const chart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Lions', 'Monkeys', 'Zebras', 'Eagles', 'Horses'],
          datasets: [
            {
              label: 'Dataset 1',
              data: [12, 19, 3, 2, 3],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Number of animals in the zoo',
            },
          },
        },
      });
    }, [])
    return(
      <div className="p-4">
      </div>
    )
}