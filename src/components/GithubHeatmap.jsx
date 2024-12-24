import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import useContributionStore from "../store/useContributionsStore";

export const HeatMapChart = () => {
  const { contributions: exampleData } = useContributionStore();

  const today = new Date();

  // Hitung nilai maksimum dan minimum untuk skala
  const maxCount = Math.max(...exampleData.map((item) => item.count));
  const minCount = Math.min(...exampleData.map((item) => item.count));

  return (
    <div>
      <CalendarHeatmap
        startDate={new Date(today.getTime() - 360 * 24 * 60 * 60 * 1000)}
        endDate={today}
        values={exampleData}
        classForValue={(value) => {
          if (!value || value.count === undefined) {
            return "color-empty";
          }

          // Tangani kasus maxCount === minCount untuk menghindari NaN
          if (maxCount === minCount) {
            return "color-empty"; // Atau skala default jika semua nilai sama
          }

          // Skala warna dinamis: hitung rentang warna dengan normalisasi nilai
          const intensity = Math.round(((value.count - minCount) / (maxCount - minCount)) * 4); // Normalisasi ke skala 0-4
          return `color-scale-${intensity}`;
        }}
        tooltipDataAttrs={(value) => {
          if (!value || !value.date) {
            return {
              "data-tooltip-id": "heatmap-tooltip",
              "data-tooltip-content": `0 x menyelesaikan tugas`,
            };
          }
          return {
            "data-tooltip-id": "heatmap-tooltip",
            "data-tooltip-content": `${value.date}: ${value.count} x menyelesaikan tugas`,
          };
        }}
        showWeekdayLabels
      />
      <ReactTooltip id="heatmap-tooltip" />
    </div>
  );
};
