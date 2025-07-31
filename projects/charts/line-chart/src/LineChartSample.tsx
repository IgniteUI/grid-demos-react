import { IgrLegend, IgrCategoryChart, IgrCategoryChartModule, IgrLegendModule } from "igniteui-react-charts";
import "./LineChartSample.scss";
import { useState } from "react";

const mods: any[] = [
  IgrLegendModule,
  IgrCategoryChartModule
];
mods.forEach((m) => m.register());

function LineChartSample() {
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
          width="100%"
          height="100%"
          chartType="Line"
          dataSource={countryRenewableElectricity}
          includedProperties={["year", "europe", "china", "america"]}
          isHorizontalZoomEnabled={false}
          isVerticalZoomEnabled={false}
          legend={legend}
          yAxisTitle="TWh"
          yAxisTitleLeftMargin={10}
          yAxisTitleRightMargin={5}
          yAxisLabelLeftMargin={0}
          computedPlotAreaMarginMode="Series"
        />
      </div>
    </div>
  );
}

export default LineChartSample;
