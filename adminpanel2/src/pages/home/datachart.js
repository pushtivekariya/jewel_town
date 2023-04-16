import React from "react";
import { useState } from "react";
import { orderdataChart } from "../../api/common_api";
import { useEffect } from "react";
import Chart from "react-apexcharts";
const Datachart = () => {
  const [columnChartState, setColumnChartState] = useState([]);
  const chartDataApiFunction = async () => {
    let response = await orderdataChart();
    setColumnChartState(response.result);
    console.log(columnChartState, "respon");
  };
  // console.log(columnChartState, "columnssss");
  const optionsForColumnChart = {
    options: {
      dataLabels:{
style:{
  fontSize:"15px",
  colors:["black"]
}
      },
      theme: {
        monochrome: {
          enabled: true,
          color: "rgb(195, 149, 135)",
          shadeTo: "dark",
          shadeIntensity: 0.9,
        },
      },
      // fill: {
      //   type: "gradient",
      //   gradient: {
      //     shadeIntensity: 1,
      //     opacityFrom: 0.5,
      //     opacityTo: 0.9,
      //     stops: [0, 30, 100],
      //   },
      // },
      chart: {
        id: "basic-bar",
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150,
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350,
          },
        },
      },

      xaxis: {
        categories: columnChartState?.columnChartData?.categories,
      },
    },

    series: [
      {
        name: "series-1",
        data: columnChartState?.columnChartData?.result,
      },
    ],
  };
  const optionsForPieChart = {
    options: {
      theme: {
        palette: "palette9", // upto palette10
      },
      chart: {
        id: "donut",
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 1200,
          animateGradually: {
            enabled: true,
            delay: 150,
          },
          dynamicAnimation: {
            enabled: false,
            speed: 350,
          },
        },
      },
      plotOptions: {
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 100,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
        fill: {
          type: "gradient",
        },
        pie: {
          expandOnClick: false,
          donut: {
            labels: {
              show: true,
              name: {
                fontSize: "2rem",
                fontFamily: "Montserrat",
                color: ["Pale Taupe"],
                formatter(val) {
                  return `${val}`;
                },
              },
              value: {
                fontSize: "1rem",
                fontFamily: "Montserrat",
                formatter(val) {
                  return `${parseInt(val)}`;
                },
              },
            },
          },
        },
      },

      labels: columnChartState?.pieChartData?.categories,
    },
  };
  const LeadStatusSeries =
    columnChartState?.pieChartData?.result.length > 0
      ? columnChartState?.pieChartData?.result
      : [];

  const optionsForUserChart = {
    options: {
      // fill: {
      //   type: "gradient",
      //   gradient: {
      //     shadeIntensity: 1,
      //     opacityFrom: 0.7,
      //     opacityTo: 0.9,
      //     stops: [0, 30, 100],
      //   },
      // },
      dataLabels:{
        style:{
          fontSize:"15px",
          colors:["black"]
        }},
      theme: {
        monochrome: {
          enabled: true,
          color: "rgb(195, 149, 135)",
          shadeTo: "light",
          shadeIntensity: 0.65,
        },
      },
      chart: {
        id: "basic-bar",
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 900,
          animateGradually: {
            enabled: true,
            delay: 150,
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350,
          },
        },
      },

      xaxis: {
        categories: columnChartState?.UserChartData?.categories,
      },
    },

    series: [
      {
        name: "series-1",
        data: columnChartState?.UserChartData?.result,
      },
    ],
  };


  const optionsTotalOfferAmount = {
    options: {
      theme: {
        palette: "palette9", // upto palette10
      },
      chart: {
        id: "donut",
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 1200,
          animateGradually: {
            enabled: true,
            delay: 150,
          },
          dynamicAnimation: {
            enabled: false,
            speed: 350,
          },
        },
      },
      plotOptions: {
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 100,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
        fill: {
          type: "gradient",
        },
        pie: {
          expandOnClick: false,
          donut: {
            labels: {
              show: true,
              name: {
                fontSize: "2rem",
                fontFamily: "Montserrat",
                color: ["Pale Taupe"],
                formatter(val) {
                  return `${val}`;
                },
              },
              value: {
                fontSize: "1rem",
                fontFamily: "Montserrat",
                formatter(val) {
                  return `${parseInt(val)}`;
                },
              },
            },
          },
        },
      },

      labels: columnChartState?.totalofferData?.categories,
    },
  };
  const totalSeries =
    columnChartState?.totalofferData?.result.length > 0
      ? columnChartState?.totalofferData?.result
      : [];

  useEffect(() => {
    chartDataApiFunction();
  }, []);
  return (
    <>
      <div className="row" style={{ paddingBottom: "50px" }}>
        <div className="col-md-12" style={{ display: "flex" }}>
          <div className="col-md-6">
            <h4 className="text-center font-weight-bold">
              TOTAL ORDER HISTORY PER MONTH
            </h4>

            <Chart
              options={optionsForColumnChart.options}
              series={optionsForColumnChart.series}
              type="bar"
              width="450"
            />
          </div>
          <div className="col-md-6">
            <h4 className="text-center font-weight-bold">
              TOTAL INCOME HISTORY PER MONTH
            </h4>

            <Chart
              options={optionsForPieChart.options}
              series={LeadStatusSeries}
              type="donut"
              width="450"
            />
          </div>
        </div>
        <hr/>
    
      </div>
      <div className="row" style={{borderTop:"2px solid black"}}>

       <div className="col-md-12" style={{display:"flex"}}>
<div className="col-md-6" style={{marginTop:"60px" }}>
  <h4 className="text-center font-weight-bold">
    TOTAL REGISTERED USER PER MONTH
  </h4>

  <Chart
    options={optionsForUserChart.options}
    series={optionsForUserChart.series}
    type="bar"
    width="450"
  />
</div>
<div className="col-md-6" style={{marginTop:"60px"}}>
    <h4 className="text-center font-weight-bold">
      TOTAL OFFER AMOUNT PER MONTH
    </h4>

    <Chart
      options={optionsTotalOfferAmount.options}
      series={totalSeries}
      type="donut"
      width="450"
    />
  </div>
  </div>
  </div>

    </>
  );
};

export default Datachart;
