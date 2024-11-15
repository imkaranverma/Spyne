import { Box, Card, Tab, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { twMerge } from "tailwind-merge";
import DescriptionIcon from "@mui/icons-material/Description";
import { IconButton } from "../components/IconButton";
import { ChartData, ChartOptions } from "chart.js";
import { fAbbrev } from "../utils/utilities";
import LineGraphData from "../components/charts/LineGraphData";
import GridViewIcon from "@mui/icons-material/GridView";
import DoneIcon from "@mui/icons-material/Done";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import CloseIcon from "@mui/icons-material/Close";
import { MainLayout } from "../layouts/MainLayout";
import { useNavigate } from "react-router-dom";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { DoughnutChart } from "../components/charts/DoughnutChart";
import { useGetDashboardData, useMeAPI } from "../api/apiQuery";
import { useLoggedInUserData } from "../hooks/customHooks";
import LinearProgress from "@mui/material/LinearProgress";
import { DashboardInterface, ServiceRequest, SummaryChartGroupInterface, SummaryChartInterface } from "../interface/DashboardInterface";
export const DashboardPage = () => {
  const dashboardQuery = useGetDashboardData({ enabled: true });

  const data: DashboardInterface | undefined = dashboardQuery.data?.data;

  if (dashboardQuery.isLoading) {
    return <LinearProgress />;
  }

  return (
    <MainLayout>
      <Grid2 container gridColumn={11} gap={4}>
        <Grid2 sm={3}>
          <ClaimSummaryComponent />
        </Grid2>
        <Grid2 sm={4}>
          <ClaimSummaryChart summary_chart_data={data?.summary_chart_data} />
        </Grid2>
        <Grid2 sm={4}>
          <ServiceRequestStatus service_request_status={data?.service_request_status} />
        </Grid2>
        <Grid2 sm={12}>
          <PerformanceOverviewComponent />
        </Grid2>
      </Grid2>
    </MainLayout>
  );
};

export const ClaimSummaryComponent = () => {
  const navigate = useNavigate();
  const { userData } = useLoggedInUserData();
  return (
    <div className="bg-white p-4 py-[6rem] rounded-lg text-center flex flex-col items-center justify-center">
      <Typography className="pb-4">Hi {userData.name}</Typography>
      <div className="  bg-white p-8 rounded-lg relative border-[1px] border-solid ">
        <DescriptionIcon sx={{ fontSize: "4rem", color: "#228B22" }} />
        <Typography variant="body1">Claim Summary</Typography>
        <IconButton
          onClick={() => {
            navigate("/claim-summary");
          }}
          className=" absolute z-[9999] bottom-[0] left-[50%] translate-x-[-50%] translate-y-[50%] cursor-pointer"
        >
          <ArrowForwardIcon sx={{ color: "#fff" }} />
        </IconButton>
      </div>
    </div>
  );
};

export const ClaimSummaryChart = ({ summary_chart_data }: { summary_chart_data?: SummaryChartGroupInterface }) => {
  const data: ChartData<"line"> = {
    labels: summary_chart_data?.daily_status.data.map((el) => el.label),
    datasets: [
      {
        tension: 0.4,
        borderColor: summary_chart_data?.daily_status.payment_not_completed.color,
        borderWidth: 2.5,
        label: summary_chart_data?.daily_status.payment_not_completed.label,
        fill: {
          target: "origin",
          above: "#3F984060" // Area will be red above the origin
        },
        pointRadius: 0,
        data: (summary_chart_data?.daily_status.data ?? []).map((el) => el.payment_not_completed)
      },
      {
        fill: {
          target: "origin",
          above: "#C1C1C140" // Area will be red above the origin
        },
        tension: 0.4,
        borderColor: summary_chart_data?.daily_status.pdf_not_recieved.color,
        borderWidth: 2.5,
        label: summary_chart_data?.daily_status.pdf_not_recieved.label,

        pointRadius: 0,
        data: (summary_chart_data?.daily_status.data ?? []).map((el) => el.pdf_not_recieved)
      }
    ]
  };

  const options: ChartOptions<"line"> = {
    scales: {
      x: {
        // display: false,
        grid: {
          display: false
        }
      },
      y: {
        // display: false,

        ticks: {
          callback(tickValue) {
            return fAbbrev(parseInt(tickValue.toString()));
          },
          display: true
        },
        grid: {
          display: false
        }
      }
    },
    responsive: true,

    plugins: {
      tooltip: {
        displayColors: false,
        borderWidth: 1,
        borderColor: "#000",

        padding: {
          top: 10,
          bottom: 10,
          left: 30,
          right: 30
        },
        backgroundColor: "#fff",
        enabled: true,
        callbacks: {
          // labelPointStyle(tooltipItem) {
          //   return {
          //     pointStyle: "rectRounded",
          //     rotation:1
          //   }
          // },

          labelTextColor: function (tooltipItem) {
            console.log(tooltipItem);

            return tooltipItem.datasetIndex == 0 ? "#D6B27E" : "#393B59";
          },
          label(tooltipItem) {
            console.log(tooltipItem);
            return `${tooltipItem.dataset.label}: $${tooltipItem.formattedValue} `;
          }
        },
        titleColor: "#000",
        titleFont() {
          return { family: "Axiforma", size: 16, weight: 400 };
        }
      },

      legend: {
        display: true,
        position: "bottom",
        labels: {
          boxWidth: 15
        }
      }
    }
  };
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <div className="bg-white p-4 rounded-lg text-center justify-center w-full">
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Daily Status" value="1" sx={{ textTransform: "none" }} />
            <Tab label="Insurance Pending Status" value="2" sx={{ textTransform: "none" }} />
          </TabList>
        </Box>
        <TabPanel value="1">
          <div className="w-[100%]">
            <LineGraphData options={options} data={data} chartId="19222" />
          </div>
        </TabPanel>
        <TabPanel value="2">
          <div className="w-full">
            <LineGraphData options={options} data={data} chartId="19222" />
          </div>
        </TabPanel>
      </TabContext>
    </div>
  );
};

export const ServiceRequestStatus = ({ service_request_status }: { service_request_status?: ServiceRequest[] }) => {
  const data: ChartData<"doughnut"> = {
    labels: (service_request_status ?? []).map((el) => el.label),
    datasets: [
      {
        // label: "My First Dataset",
        data: (service_request_status ?? []).map((el) => el.data),
        backgroundColor: (service_request_status ?? []).map((el) => el.color),
        hoverOffset: 4
      }
    ]
  };
  const options: ChartOptions<"doughnut"> = {
    plugins: {
      legend: {
        display: true,
        position: "bottom"
      }
    }
  };
  return (
    <div className="bg-white p-4 rounded-lg ">
      <Typography variant="h6" sx={{ margin: "1rem 0" }}>
        Service Request Status
      </Typography>
      <div className="  flex flex-col items-center justify-center">
        <div className="w-[300px]">
          <DoughnutChart options={options} data={data} />
        </div>
      </div>
    </div>
  );
};

export const PerformanceOverviewComponent = () => {
  const overviewData = [
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
  ];

  const data: ChartData<"line"> = {
    labels: [2021, 2022, 2023, 2024, 2025],
    datasets: [
      {
        tension: 0.4,
        borderColor: "#D6B27E",
        borderWidth: 2.5,
        label: "Total Premium",

        pointRadius: 0,
        data: [13, 2323, 3, 334, 5]
      }
    ]
  };
  console.log(data);
  const options: ChartOptions<"line"> = {
    scales: {
      x: {
        display: false,
        grid: {
          display: false
        }
      },
      y: {
        display: false,

        ticks: {
          callback(tickValue) {
            return fAbbrev(parseInt(tickValue.toString()));
          },
          display: false
        },
        grid: {
          display: false
        }
      }
    },
    responsive: true,

    plugins: {
      tooltip: {
        displayColors: false,
        borderWidth: 1,
        borderColor: "#000",

        padding: {
          top: 10,
          bottom: 10,
          left: 30,
          right: 30
        },
        backgroundColor: "#fff",
        enabled: true,
        callbacks: {
          labelPointStyle(tooltipItem) {
            {
              pointStyle: "dot";
            }
          },

          labelTextColor: function (tooltipItem) {
            console.log(tooltipItem);

            return tooltipItem.datasetIndex == 0 ? "#D6B27E" : "#393B59";
          },
          label(tooltipItem) {
            console.log(tooltipItem);
            return `${tooltipItem.dataset.label}: $${tooltipItem.formattedValue} `;
          }
        },
        titleColor: "#000",
        titleFont() {
          return { family: "Axiforma", size: 16, weight: 400 };
        }
      },

      legend: {
        display: false
      }
    }
  };
  const overviewComponentdata = [
    {
      icon: <GridViewIcon sx={{ fontSize: "2rem", color: "#478CCF" }} />,
      label: "",
      value: 0,
      chartData: { color: "#478CCF", data: [13, 2323, 3, 334, 5] }
    },
    {
      icon: <HistoryToggleOffIcon sx={{ fontSize: "2rem", color: "#FFD35A" }} />,
      label: "",
      value: 0,
      chartData: { color: "#FFD35A", data: [13, 2323, 3, 334, 5] }
    },
    {
      icon: <DoneIcon sx={{ fontSize: "2rem", color: "#508D4E" }} />,
      label: "",
      value: 0,
      chartData: { color: "#508D4E", data: [13, 2323, 3, 334, 5] }
    },
    {
      icon: <CloseIcon sx={{ fontSize: "2rem", color: "#FF4C4C" }} />,
      label: "",
      value: 0,
      chartData: { color: "#FF4C4C", data: [13, 2323, 3, 334, 5] }
    }
  ];

  overviewComponentdata.forEach((el, index) => {
    el.label = overviewData[index].label;
    el.value = overviewData[index].value;
    el.chartData = { color: overviewData[index].color, data: overviewData[index].chart.data };
  });

  return (
    <div className="bg-white px-4 py-8 rounded-lg">
      <Typography variant="h6" sx={{ margin: "1rem 0" }}>
        Performance Overview
      </Typography>
      <div className="flex gap-4 justify-between w-full ">
        {overviewComponentdata.map((type) => (
          <div className="flex flex-[1] gap-4 p-4 pb-8 border-[1px] border-solid rounded-lg items-start">
            <div className="p-2 border-[1px] border-solid rounded-lg">{type.icon}</div>
            <div>
              <Typography variant="caption">{type.label}</Typography>
              <Typography variant="h6">{type.value}</Typography>
            </div>
            <div className="max-w-[100px]">
              <LineGraphData
                options={options}
                data={{
                  ...data,
                  datasets: [
                    {
                      ...data.datasets[0],
                      data: type.chartData.data,
                      borderColor: type.chartData.color,
                      fill: {
                        target: "origin",
                        above: `${type.chartData.color}20` // Area will be red above the origin
                      }
                    }
                  ]
                }}
                chartId="19222"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
