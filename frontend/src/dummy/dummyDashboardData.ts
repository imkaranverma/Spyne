export const dummyDashboardData = {
  summary_chart_data: {
    daily_status: {
      payment_not_completed: {
        color: "#3F9860",
        label: "Payment not completed"
      },
      pdf_not_recieved: {
        color: "#C1C1C1",
        label: "PPDF not recieved"
      },

      data: [
        {
          label: 2021,
          payment_not_completed: 100,
          pdf_not_recieved: 100
        },
        {
          label: 2022,
          payment_not_completed: 300,
          pdf_not_recieved: 300
        },
        {
          label: 2023,
          payment_not_completed: 150,
          pdf_not_recieved: 150
        },
        {
          label: 2024,
          payment_not_completed: 400,
          pdf_not_recieved: 400
        },
        {
          label: 2024,
          payment_not_completed: 600,
          pdf_not_recieved: 600
        }
      ]
    },
    insurance_pending_status: {
      payment_not_completed: {
        color: "#3F9860",
        label: "Payment not completed"
      },
      pdf_not_recieved: {
        color: "#C1C1C1",
        label: "PPDF not recieved"
      },
      data: [
        {
          label: 2021,
          payment_not_completed: 100,
          pdf_not_recieved: 100
        },
        {
          label: 2022,
          payment_not_completed: 300,
          pdf_not_recieved: 300
        },
        {
          label: 2023,
          payment_not_completed: 150,
          pdf_not_recieved: 150
        },
        {
          label: 2024,
          payment_not_completed: 400,
          pdf_not_recieved: 400
        },
        {
          label: 2024,
          payment_not_completed: 600,
          pdf_not_recieved: 600
        }
      ]
    }
  },
  service_request_status: [
    {
      label: "Resolved Request",
      data: 300,
      color: "rgb(54, 162, 235)",
      legend: {
        display: true,
        position: "bottom"
      }
    },
    {
      label: "Pending Request",
      data: 100,
      color: "rgb(255, 205, 86)",
      legend: {
        display: true,
        position: "bottom"
      }
    }
  ],
  performance_overview: [
    {
      label: "Unresolved",
      value: 252,
      color: "#478CCF",
      chart: {
        label: [2021, 2022, 2023, 2024, 2025],
        data: [13, 2323, 3, 334, 5]
      }
    },
    {
      label: "On Hold",
      value: 252,
      color: "#FFD35A",
      chart: {
        label: [2021, 2022, 2023, 2024, 2025],
        data: [13, 2323, 3, 334, 5]
      }
    },
    {
      label: "Open",
      value: 252,
      color: "#508D4E",
      chart: {
        label: [2021, 2022, 2023, 2024, 2025],
        data: [13, 2323, 3, 334, 5]
      }
    },
    {
      label: "Closed",
      value: 252,
      color: "#FF4C4C",
      chart: {
        label: [2021, 2022, 2023, 2024, 2025],
        data: [13, 2323, 3, 334, 5]
      }
    }
  ]
};
