/* eslint-disable no-shadow */
import React from "react";
import { Cell, Pie, PieChart } from "recharts";

const RADIAN = Math.PI / 180;
const data = [
  { name: "AAA", value: 2, color: "#43a047" },
  { name: "BBB", value: 4, color: "#ffb300" },
  { name: "C", value: 4, color: "#e53935" },
];
const cx = 80;
const cy = 70;
const iR = 30;
const oR = 60;

const needle = (value, data, cx, cy, iR, oR, color) => {
  let total = data.reduce((sum, v) => sum + v.value, 0);
  const ang = 180.0 * (1 - value / total);
  const length = (iR + 2 * oR) / 3;
  const sin = Math.sin(-RADIAN * ang);
  const cos = Math.cos(-RADIAN * ang);
  const r = 3;
  const x0 = cx;
  const y0 = cy;
  const xba = x0 + r * sin;
  const yba = y0 - r * cos;
  const xbb = x0 - r * sin;
  const ybb = y0 + r * cos;
  const xp = x0 + length * cos;
  const yp = y0 + length * sin;

  return [
    <circle
      key="needle-base"
      cx={x0}
      cy={y0}
      r={r}
      fill={color}
      stroke="none"
    />,
    <path
      key="needle"
      d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} Z`}
      fill={color}
    />,
  ];
};

const PieChartWithNeedle = ({ credit_score }) => {
  return (
    <PieChart width={150} height={80}>
      <Pie
        dataKey="value"
        startAngle={180}
        endAngle={0}
        data={data}
        cx={cx}
        cy={cy}
        innerRadius={iR}
        outerRadius={oR}
        stroke="none"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      {needle(credit_score, data, cx, cy, iR, oR, "#000000")}
    </PieChart>
  );
};

export default PieChartWithNeedle;
