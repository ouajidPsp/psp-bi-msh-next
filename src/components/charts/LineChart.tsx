import React from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  LineSeries,
  DateTime,
  Legend,
  Tooltip,
} from "@syncfusion/ej2-react-charts";

import { useStateContext } from "@/Contexts/ThemeContext";

const LineChart = () => {
  const LinePrimaryXAxis = {
    valueType: "DateTime",
    labelFormat: "MMM",
    intervalType: "Months",
    edgeLabelPlacement: "Shift",
    majorGridLines: { width: 0 },
    background: "white",
  };

  const LinePrimaryYAxis = {
    labelFormat: "{value}%",
    rangePadding: "None",
    minimum: 0,
    maximum: 100,
    interval: 20,
    lineStyle: { width: 0 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
  };

  const lineChartData = [
    [
      { x: new Date(2024, 0, 1), y: 21 },
      { x: new Date(2024, 1, 1), y: 24 },
      { x: new Date(2024, 2, 1), y: 36 },
      { x: new Date(2024, 3, 1), y: 38 },
      { x: new Date(2024, 4, 1), y: 54 },
      { x: new Date(2024, 5, 1), y: 57 },
      { x: new Date(2024, 6, 1), y: 74 },
      { x: new Date(2024, 7, 1), y: 25 },
      { x: new Date(2024, 8, 1), y: 50 },
      { x: new Date(2024, 9, 1), y: 40 },
      { x: new Date(2024, 10, 1), y: 30 },
      { x: new Date(2024, 11, 1), y: 80 },
    ],
    [
      { x: new Date(2024, 0, 1), y: 28 },
      { x: new Date(2024, 1, 1), y: 44 },
      { x: new Date(2024, 2, 1), y: 48 },
      { x: new Date(2024, 3, 1), y: 50 },
      { x: new Date(2024, 4, 1), y: 66 },
      { x: new Date(2024, 5, 1), y: 78 },
      { x: new Date(2024, 6, 1), y: 84 },
      { x: new Date(2024, 7, 1), y: 45 },
      { x: new Date(2024, 8, 1), y: 65 },
      { x: new Date(2024, 9, 1), y: 90 },
      { x: new Date(2024, 10, 1), y: 50 },
      { x: new Date(2024, 11, 1), y: 30 },
    ],
  ];

  const lineCustomSeries = [
    {
      dataSource: lineChartData[0],
      xName: "x",
      yName: "y",
      name: "Completion",
      width: "1",
      marker: { visible: true, width: 10, height: 10 },
      type: "Line",
    },

    {
      dataSource: lineChartData[1],
      xName: "x",
      yName: "y",
      name: "Réponse",
      width: "2",
      marker: { visible: true, width: 10, height: 10 },
      type: "Line",
    },
  ];
  const { currentMode } = useStateContext();

  return (
    <ChartComponent
      id="line-chart"
      height="420px"
      primaryXAxis={LinePrimaryXAxis as any}
      primaryYAxis={LinePrimaryYAxis as any}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true }}
      background={currentMode === "Dark" ? "#33373E" : "#fff"}
      legendSettings={{ background: "white" }}
    >
      <Inject services={[LineSeries, DateTime, Legend, Tooltip]} />
      <SeriesCollectionDirective>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {lineCustomSeries.map((item, index) => (
          <SeriesDirective key={index} {...item} />
        ))}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default LineChart;
