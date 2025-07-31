import {
  IgrItemLegend,
  IgrPieChart,
  IgrPieChartBase,
  IgrSliceClickEventArgs,
  IIgrPieChartBaseProps,
} from "igniteui-react-charts";
import "./PieChartSample.scss";
import { useEffect, useRef, useState } from "react";

function PieChartSample() {
  const [legend, setLegend] = useState<IgrItemLegend | null>(null);
  const chart2Ref = useRef<IgrPieChart | null>(null);

  const energyGlobalDemand = [
    { value: 37, category: "Cooling", summary: "Cooling 37%" },
    { value: 25, category: "Residential", summary: "Residential 25%" },
    { value: 12, category: "Heating", summary: "Heating 12%" },
    { value: 11, category: "Lighting", summary: "Lighting 11%" },
    { value: 15, category: "Other", summary: "Other 15%" },
  ];

  const secondChartData = [
    { MarketShare: 37, Company: "Cooling", Summary: "Cooling 37%" },
    { MarketShare: 25, Company: "Residential", Summary: "Residential 25%" },
    { MarketShare: 12, Company: "Heating", Summary: "Heating 12%" },
    { MarketShare: 8, Company: "Lighting", Summary: "Lighting 8%" },
    { MarketShare: 18, Company: "Other", Summary: "Other 18%" },
  ];

  const pieSliceClickEvent = (
    _: IgrPieChartBase<IIgrPieChartBaseProps>,
    e: IgrSliceClickEventArgs
  ) => {
    e.isExploded = !e.isExploded;
  };

  useEffect(() => {
    if (chart2Ref.current && chart2Ref.current.explodedSlices) {
      chart2Ref.current.explodedSlices.add(3);
    }
  }, []);

  return (
    <div className="charts-container">
      {/* First Pie Chart */}
      <div className="chart-wrapper">
        <div className="pie-chart-variant">PIE CHART</div>
        <div className="legend-title">
          Global Electricity Demand by Energy Use
        </div>
        <div className="legend">
          <IgrItemLegend orientation="Horizontal" ref={setLegend} />
        </div>
        <div className="chart1">
          <IgrPieChart
            height="100%"
            dataSource={energyGlobalDemand}
            legendLabelMemberPath="category"
            labelMemberPath="summary"
            labelsPosition="BestFit"
            valueMemberPath="value"
            radiusFactor={0.7}
            legend={legend}
            brushes={["#C5E0FF", "#FFB5C2", "#FFD8A8", "#B2E5B2", "#D6CCFF"]}
            outlines={["#C5E0FF", "#FFB5C2", "#FFD8A8", "#B2E5B2", "#D6CCFF"]}
          />
        </div>
      </div>

      {/* Second Pie Chart */}
      <div className="chart-wrapper">
        <div className="pie-chart-variant">PIE CHART EXPLOSION</div>
        <div className="chart2">
          <IgrPieChart
            height="80%"
            width="80%"
            ref={chart2Ref}
            dataSource={secondChartData}
            labelMemberPath="Summary"
            legendLabelMemberPath="Company"
            valueMemberPath="MarketShare"
            labelsPosition="OutsideEnd"
            labelExtent={30}
            sliceClick={pieSliceClickEvent}
            brushes={["#C5E0FF", "#FFB5C2", "#FFD8A8", "#B2E5B2", "#D6CCFF"]}
            outlines={["#C5E0FF", "#FFB5C2", "#FFD8A8", "#B2E5B2", "#D6CCFF"]}
          />
        </div>
      </div>
    </div>
  );
}

export default PieChartSample;
