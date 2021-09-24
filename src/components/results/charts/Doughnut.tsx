import { Box, HStack, VStack } from "@chakra-ui/layout";
import { Text, Wrap, WrapItem } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { themeColors } from "styles/colors";
import { IOptionStats } from "types/shared";

const stats = [
  {
    id: 0,
    questionId: 3,
    body: "Race",
    responses: 1,
  },
  {
    id: 1,
    questionId: 3,
    body: "Religion",
    responses: 3,
  },
  {
    id: 2,
    questionId: 3,
    body: "Gender",
    responses: 1,
  },
  {
    id: 3,
    questionId: 3,
    body: "Sexuality",
    responses: 2,
  },
  {
    id: 4,
    questionId: 3,
    body: "Disability",
    responses: 7,
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

const DoughnutChart = ({
  statistics = stats,
}: {
  statistics: IOptionStats[];
}) => {
  const transformedStatistics = transformStatistics(statistics);
  const [chartGenerated, setChartGenerated] = useState(false);

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

  useEffect(() => setChartGenerated(true), [statistics]);

  return (
    <VStack
      width="275px"
      height="350px"
      sx={{
        "& canvas": {
          height: "250px !important",
          width: "275px !important",
        },
      }}
      margin="0 auto"
      mt="12px !important"
      spacing={6}
    >
      <Wrap spacing={4} justify="center" maxW="300px">
        {/* this is the legend */}
        {transformedStatistics.labels.map((label, index) => (
          <WrapItem key={index}>
            <HStack mt="4px !important">
              <Box
                bg={colors[index]}
                height="20px"
                w="25px"
                key={index}
                border="1px solid white"
              ></Box>
              <Text variant="overline" color="grayscale.gray.100">
                {label}
              </Text>
            </HStack>
          </WrapItem>
        ))}
      </Wrap>
      <Doughnut
        data={chartConfig.data}
        options={{
          transitions: {
            active: { animation: { duration: chartGenerated ? 0 : 300 } },
          },
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
              display: false,
            },
            y: {
              display: false,
            },
          },
        }}
      />
    </VStack>
  );
};

export default DoughnutChart;
