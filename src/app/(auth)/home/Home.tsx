"use client";
import React from "react";
import { GoDotFill } from "react-icons/go";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Legend,
  Category,
  StackingColumnSeries,
  Tooltip,
} from "@syncfusion/ej2-react-charts";

import { Pie, SparkLine } from "@/components/charts";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { recentTransactions, dropdownData } from "@/data/dummy";
import { useStateContext } from "@/Contexts/ThemeContext";
import { FaFilePdf, FaUserInjured } from "react-icons/fa";
import getPatientCount from "../../../../server/patient/getPatientCount";
import getRequestCount from "../../../../server/patient/requests/getRequestCount";
import { FiFileText } from "react-icons/fi";
import { BsClipboard2Pulse } from "react-icons/bs";
import { LuFolderArchive, LuFolderCheck, LuFolderClock } from "react-icons/lu";
import { downloadElementAsImage } from "@/app/api/htmlcanvas/htmlcanvas";
const DropDown = ({ currentMode }: any) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent
      id="time"
      fields={{ text: "Time", value: "Id" }}
      style={{ border: "none", color: currentMode === "Dark" ? "white" : "" }}
      value="1"
      dataSource={dropdownData}
      popupHeight="220px"
      popupWidth="120px"
    />
  </div>
);

const Home = ({
  data,
  data2,
  constitue,
  complete,
  attente,
}: {
  data: Awaited<ReturnType<typeof getPatientCount>>;
  data2: Awaited<ReturnType<typeof getRequestCount>>;
  constitue: number;
  complete: number;
  attente: number;
}) => {
  const { currentColor, currentMode } = useStateContext();
  const router = useRouter();
  const stackedChartData = [
    [
      { x: "Jan", y: data },
      { x: "Feb", y: 0 },
      { x: "Mar", y: 0 },
      { x: "Apr", y: 0 },
      { x: "May", y: 0 },
      { x: "Jun", y: 0 },
      { x: "Jul", y: 0 },
      { x: "Aug", y: 0 },
      { x: "Sep", y: 0 },
      { x: "Oct", y: 0 },
      { x: "Nov", y: 0 },
      { x: "Déc", y: 0 },
    ],
  ];

  const stackedCustomSeries = [
    {
      dataSource: stackedChartData[0],
      xName: "x",
      yName: "y",
      name: "Patients",
      type: "StackingColumn",
      background: "blue",
    },
  ];

  const stackedPrimaryXAxis = {
    majorGridLines: { width: 0 },
    minorGridLines: { width: 0 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
    interval: 1,
    lineStyle: { width: 0 },
    labelIntersectAction: "Rotate45",
    valueType: "Category",
  };

  const stackedPrimaryYAxis = {
    lineStyle: { width: 0 },
    minimum: 0,
    maximum: 20,
    interval: 100,
    majorTickLines: { width: 0 },
    majorGridLines: { width: 1 },
    minorGridLines: { width: 1 },
    minorTickLines: { width: 0 },
    labelFormat: "{value}",
  };

  const demandes = [
    {
      icon: <BsClipboard2Pulse />,
      amount: data2,
      percentage: "0%",
      title: "Demandes Totales traitées",
      iconColor: "#03C9D7",
      iconBg: "#E5FAFB",
      pcColor: "red-600",
    },
    {
      icon: <LuFolderCheck />,
      amount: constitue,
      percentage: "0%",
      title: "Dossiers Constitués",
      iconColor: "rgb(255, 244, 229)",
      iconBg: "rgb(254, 201, 15)",
      pcColor: "green-600",
    },
    {
      icon: <LuFolderArchive />,
      amount: complete,
      percentage: "0%",
      title: "Dossiers Complets",
      iconColor: "rgb(228, 106, 118)",
      iconBg: "rgb(255, 244, 229)",
      pcColor: "green-600",
    },
    {
      icon: <LuFolderClock />,
      amount: attente,
      percentage: "0%",
      title: "Dossiers en Attente",
      iconColor: "rgb(0, 194, 146)",
      iconBg: "rgb(235, 250, 242)",
      pcColor: "red-600",
    },
  ];
  const SparklineAreaData = [
    { x: 2023, yval: 10 },
    { x: 2024, yval: data },
    { x: 2025, yval: 0 },
    { x: 2026, yval: 0 },
    { x: 2027, yval: 0 },
  ];
  const ecomPieChartData = [
    { x: "Complets", y: complete, text: "33%" },
    { x: "Constitués", y: constitue, text: "33%" },
    { x: "Q2", y: attente, text: "33%" },
    { x: "En Attente", y: constitue, text: "25%" },
  ];
  const Stacked = ({ width, height }: any) => {
    const { currentMode } = useStateContext();

    return (
      <ChartComponent
        id="charts"
        primaryXAxis={stackedPrimaryXAxis as any}
        primaryYAxis={stackedPrimaryYAxis}
        width="675"
        height={height}
        chartArea={{ border: { width: 0 } }}
        tooltip={{ enable: true }}
        background={currentMode === "Dark" ? "#33373E" : "#fff"}
      >
        <Inject services={[StackingColumnSeries, Category, Legend, Tooltip]} />
        <SeriesCollectionDirective>
          {stackedCustomSeries.map((item, index) => (
            <SeriesDirective key={index} {...item} />
          ))}
        </SeriesCollectionDirective>
      </ChartComponent>
    );
  };
  return (
    <div className="" id="capture">
      <div className="flex flex-wrap lg:flex-nowrap justify-center ">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3  bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-400">Total des patients</p>
              <p className="text-2xl">{data}</p>
            </div>
            <button
              onClick={() => {
                router.push("/patients");
              }}
              type="button"
              style={{ backgroundColor: currentColor }}
              className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
            >
              <FaUserInjured />
            </button>
          </div>
          <div className="mt-6">
            <Button
              onClick={() => {
                router.push("/patients");
              }}
              color="white"
              bgColor={currentColor}
              text="Visualiser"
              borderRadius="10px"
            />
          </div>
        </div>
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {demandes.map((item) => (
            <div
              key={item.title}
              className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl "
            >
              <button
                type="button"
                style={{ color: currentColor, borderColor: currentColor }}
                className="text-2xl opacity-0.9 rounded-full border  p-4 hover:drop-shadow-xl dark:bg-white"
              >
                {item.icon}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">{item.amount}</span>
                <span className={`text-sm text-${item.pcColor} ml-2`}>
                  {item.percentage}
                </span>
              </p>
              <p className="text-sm text-gray-400 dark:text-white font-semibold mt-1">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-10 flex-wrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg  m-3 p-4 rounded-2xl md:w-780  ">
          <div className="flex justify-between">
            <p className="font-semibold text-xl">Nouveaux patients par mois</p>
            <div className="flex items-center gap-4">
              <p className="flex items-center gap-2 text-[#396EA5] hover:drop-shadow-xl">
                <span>
                  <GoDotFill />
                </span>
                <span>Patients</span>
              </p>
            </div>
          </div>
          <div className="mt-10 flex gap-10 flex-wrap justify-center">
            <div className="">
              <Stacked currentMode={currentMode} width="320px" height="360px" />
            </div>
          </div>
        </div>
        <div>
          <div
            className=" rounded-2xl md:w-400 p-4 m-3"
            style={{ backgroundColor: currentColor }}
          >
            <div className="flex justify-between items-center ">
              <p className="font-semibold text-white text-2xl">
                Patients annuels
              </p>

              <div>
                <p className="text-2xl text-white font-semibold mt-8">{data}</p>
                <p className="text-gray-200">cette année</p>
              </div>
            </div>

            <div className="mt-4">
              <SparkLine
                currentColor={currentColor}
                id="column-sparkLine"
                height="100px"
                type="Column"
                data={SparklineAreaData}
                width="320"
                color="rgb(242, 252, 253)"
              />
            </div>
          </div>

          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl md:w-400 p-8 m-3 flex justify-center items-center gap-10">
            <div>
              <p className="text-2xl font-semibold ">{data2}</p>
              <p className="text-gray-400">Demandes ces 3 derniers mois</p>
            </div>

            <div className="w-40">
              <Pie
                id="pie-chart"
                data={ecomPieChartData}
                legendVisiblity={true}
                height="160px"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex mt-4 mb-4 gap-4 flex-wrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl">
          <div className="flex justify-between items-center gap-2">
            <p className="text-xl font-semibold">Dossiers</p>
            <DropDown currentMode={currentMode} />
          </div>
          <div className="mt-10 w-72 md:w-400">
            {recentTransactions.map((item) => (
              <div key={item.title} className="flex justify-between mt-4">
                <div className="flex gap-4">
                  <button
                    type="button"
                    style={{
                      color: currentColor,
                      backgroundColor: item.iconBg,
                    }}
                    className="text-2xl rounded-lg p-4 hover:drop-shadow-xl"
                  >
                    {item.icon}
                  </button>
                  <div>
                    <p className="text-md font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                </div>
                <p className={`text-${item.pcColor}`}>{item.amount}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-5 border-t-1 border-color">
            <div className="mt-3">
              <Button
                onClick={() => {
                  router.push("/patients");
                }}
                icon={<FiFileText />}
                color="white"
                bgColor={currentColor}
                text="+ Demande"
                borderRadius="10px"
              />
            </div>
          </div>
        </div>

        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl">
          <div className=" m-4 pr-10">
            <div>
              <p>
                <span className="text-3xl font-semibold">{data}</span>
                <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-3 text-xs">
                  0%
                </span>
              </p>
              <p className="text-gray-500 mt-1">Patients ce mois</p>
            </div>
            <div className="mt-8">
              <p className="text-3xl font-semibold">{data2}</p>

              <p className="text-gray-500 mt-1">Demandes ce mois</p>
            </div>

            <div className="mt-10">
              <Button
                onClick={() => {
                  downloadElementAsImage(
                    document.getElementById("capture")! as HTMLElement
                  );
                }}
                color="white"
                icon={<FaFilePdf />}
                bgColor={currentColor}
                text="Télécharger Rapport"
                borderRadius="10px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
