import {
  IgrLegend,
  IgrCategoryChart,
  IgrCategoryChartModule,
  IgrDataChartInteractivityModule,
  IgrLegendModule,
} from "igniteui-react-charts";
import "./StepChartSample.scss";
import { useState } from "react";

const mods: any[] = [
  IgrLegendModule,
  IgrCategoryChartModule,
  IgrDataChartInteractivityModule,
];
mods.forEach((m) => m.register());

function StepChartSample() {
  const [legend, setLegend] = useState<IgrLegend | null>(null);

  const countryRenewableElectricity = [
    { year: "2009", europe: 34, china: 21, america: 19 },
    { year: "2010", europe: 43, china: 26, america: 24 },
    { year: "2011", europe: 66, china: 29, america: 28 },
    { year: "2012", europe: 69, china: 32, america: 26 },
    { year: "2013", europe: 58, china: 47, america: 38 },
    { year: "2014", europe: 40, china: 46, america: 31 },
    { year: "2015", europe: 78, china: 50, america: 19 },
    { year: "2016", europe: 13, china: 90, america: 52 },
    { year: "2017", europe: 78, china: 132, america: 50 },
    { year: "2018", europe: 40, china: 134, america: 34 },
    { year: "2018", europe: 40, china: 134, america: 34 },
    { year: "2019", europe: 80, china: 96, america: 38 },
  ];

  return (
    <div className="container">
      <div className="legend-title">Renewable Electricity Generated</div>

      <div className="legend">
        <IgrLegend orientation="Horizontal" ref={setLegend} />
      </div>

      <div className="chart-wrapper">
        <IgrCategoryChart
          height="100%"
          width="100%"
          chartType="StepArea"
          dataSource={countryRenewableElectricity}
          includedProperties={["year", "europe", "china", "america"]}
          titleAlignment="Left"
          titleLeftMargin={25}
          titleTopMargin={10}
          titleBottomMargin={10}
          isCategoryHighlightingEnabled={true}
          isSeriesHighlightingEnabled={true}
          isTransitionInEnabled={true}
          isHorizontalZoomEnabled={false}
          isVerticalZoomEnabled={false}
          crosshairsSnapToData={true}
          legend={legend}
          yAxisTitle="TWh"
          yAxisLabelTextColor="black"
          brushes={["#C5E0FF", "#FFB5C2", "#B2E5B2"]}
          outlines={["#C5E0FF", "#FFB5C2", "#B2E5B2"]}
          markerBrushes={["#C5E0FF", "#FFB5C2", "#B2E5B2"]}
          markerOutlines={["#C5E0FF", "#FFB5C2", "#B2E5B2"]}
        />
      </div>
    </div>
  );
}

export default StepChartSample;
