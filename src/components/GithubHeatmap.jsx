import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import { Tooltip as ReactTooltip } from "react-tooltip";

import useContributionStore from "../store/useContributionsStore";

import "react-calendar-heatmap/dist/styles.css";

export const HeatMapChart = () => {
  const { contributions: exampleData } = useContributionStore();

  const today = new Date();
  const endDate = new Date(today.getTime() - 365 * 24 * 60 * 60 * 1000); // 365 hari yang lalu

  // Hitung nilai maksimum dan minimum untuk skala
  const maxCount = Math.max(...exampleData.map((item) => item.count));
  const minCount = Math.min(...exampleData.map((item) => item.count));

  return (
    <div>
      <CalendarHeatmap
        gutterSize={2}
        startDate={endDate}
        endDate={today}
        values={exampleData}
        classForValue={(value) => {
          if (!value || value.count === undefined) {
            return "color-empty rounded-md";
          }

          // Tangani kasus maxCount === minCount untuk menghindari NaN
          if (maxCount === minCount) {
            return "color-empty"; // Atau skala default jika semua nilai sama
          }

          // Skala warna dinamis: hitung rentang warna dengan normalisasi nilai
          const intensity =
            value.count > 0
              ? Math.max(1, Math.round(((value.count - minCount) / (maxCount - minCount)) * 4))
              : 0; // Pastikan minimal 1 jika count > 0
          return `color-scale-${intensity}`;
        }}
        tooltipDataAttrs={(value) => {
          if (!value || !value.date) {
            return;
          }
          // Format tanggal menjadi "February 23rd"
          const date = new Date(value.date);
          const day = date.getDate();
          const suffix =
            day % 10 === 1 && day !== 11
              ? "st"
              : day % 10 === 2 && day !== 12
              ? "nd"
              : day % 10 === 3 && day !== 13
              ? "rd"
              : "th";
          const formattedDate = new Intl.DateTimeFormat("en-US", {
            month: "long",
          }).format(date);
          return {
            "data-tooltip-id": "heatmap-tooltip",
            "data-tooltip-content":
              value.count > 0
                ? `${value.count} activities  on ${formattedDate} ${day}${suffix}.`
                : `No activity on ${formattedDate} ${day}${suffix}.`,
          };
        }}
        showWeekdayLabels
      />
      <ReactTooltip
        delayShow={50}
        clickable={false}
        id="heatmap-tooltip"
      />
    </div>
  );
};
