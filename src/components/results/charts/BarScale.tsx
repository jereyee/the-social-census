import { Box, VStack } from "@chakra-ui/layout";
import ScaleEnds from "components/questions/questionTypes/scale/ScaleEnds";
import React from "react";
import { Bar } from "react-chartjs-2";
import { themeColors } from "styles/colors";
import { IOptionStats } from "./poll/PollOption";

const stats = [
  {
    id: 0,
    questionId: 3,
    body: "1",
    responses: 1,
  },
  {
    id: 1,
    questionId: 3,
    body: "2",
    responses: 3,
  },
  {
    id: 2,
    questionId: 3,
    body: "3",
    responses: 1,
  },
  {
    id: 3,
    questionId: 3,
    body: "4",
    responses: 2,
  },
  {
    id: 4,
    questionId: 3,
    body: "5",
    responses: 3,
  },
];

const colors = Object.values(themeColors.brand);

const transformStatistics = (statistics: IOptionStats[]) => {
  const data = statistics.map((option) => option.responses);
  const labels = statistics.map((option) => option.body);
  return {
    data: data,
    labels: labels,
    colors: colors,
  };
};

const BarScale = ({ statistics }: { statistics: IOptionStats[] }) => {
  const transformedStatistics = transformStatistics(statistics);

  const chartConfig = {
    data: {
      labels: transformedStatistics.labels,
      datasets: [
        {
          data: transformedStatistics.data,
          backgroundColor: colors,
        },
      ],
    },
  };

  return (
    <VStack
      width="80%"
      height="250px"
      sx={{
        "& canvas": {
          height: "200px !important",
          width: "120% !important",
        },
      }}
      margin="0 auto"
      mt="12px !important"
      spacing={12}
    >
      <Box />
      <VStack>
        <Bar
          data={chartConfig.data}
          options={{
            indexAxis: "x",
            plugins: {
              title: {
                display: false,
                text: "",
              },
              legend: {
                display: false,
              },
            },
            responsive: true,
            scales: {
              x: {
                grid: {
                  display: false,
                },
                display: true,
              },
              y: {
                display: false,
              },
            },
          }}
        />

        <ScaleEnds />
      </VStack>
    </VStack>
  );
};

export default BarScale;
