import {
  IgrDataChart,
  IgrCategoryYAxis,
  IgrNumericXAxis,
  IgrBarSeries,
  IgrCategoryHighlightLayer,
  IgrDataToolTipLayer,
  IgrLegend,
  IgrLegendModule,
  IgrBarSeriesModule,
  IgrCategoryHighlightLayerModule,
  IgrCategoryYAxisModule,
  IgrDataChartCategoryModule,
  IgrDataChartCoreModule,
  IgrDataToolTipLayerModule,
  IgrNumericXAxisModule,
  IgrDataChartInteractivityModule,
} from "igniteui-react-charts";
import "./BarChartSample.scss";
import { useState } from "react";

const modules = [
  IgrDataChartCoreModule,
  IgrDataChartCategoryModule,
  IgrCategoryYAxisModule,
  IgrNumericXAxisModule,
  IgrBarSeriesModule,
  IgrCategoryHighlightLayerModule,
  IgrDataToolTipLayerModule,
  IgrLegendModule,
  IgrDataChartInteractivityModule
];

modules.forEach((m) => m.register());

function BarChartSample() {
  const [legend, setLegend] = useState<IgrLegend | null>(null);

  const highestGrossingMovies = [
    { franchise: "Marvel Universe", totalRevenue: 22.55, highestGrossing: 2.8 },
    { franchise: "Star Wars", totalRevenue: 10.32, highestGrossing: 2.07 },
    { franchise: "Harry Potter", totalRevenue: 9.19, highestGrossing: 1.34 },
    { franchise: "Avengers", totalRevenue: 7.76, highestGrossing: 2.8 },
    { franchise: "Spider Man", totalRevenue: 7.22, highestGrossing: 1.28 },
    { franchise: "James Bond", totalRevenue: 7.12, highestGrossing: 1.11 },
  ];

  return (
    <div className="container">
      <div className="legend-title">Highest Grossing Movie Franchises</div>

      <div className="legend">
        <IgrLegend orientation="Horizontal" ref={setLegend} />
      </div>

      <div className="chart-wrapper">
        <IgrDataChart width="100%" height="100%" legend={legend}>
          <IgrCategoryYAxis
            name="yAxis"
            dataSource={highestGrossingMovies}
            isInverted={true}
            label="franchise"
            useEnhancedIntervalManagement={true}
            enhancedIntervalPreferMoreCategoryLabels={true}
            gap={0.5}
            overlap={-0.1}
          />

          <IgrNumericXAxis name="xAxis" title="Billions of U.S. Dollars" />

          <IgrCategoryHighlightLayer name="CategoryHighlightLayer" />

          <IgrBarSeries
            name="BarSeries1"
            xAxisName="xAxis"
            yAxisName="yAxis"
            dataSource={highestGrossingMovies}
            title="Total Revenue of Franchise"
            valueMemberPath="totalRevenue"
            showDefaultTooltip={true}
            isTransitionInEnabled={true}
            isHighlightingEnabled={true}
            brush="#C5E0FF"
            outline="#8AB9F1"
          />

          <IgrBarSeries
            name="BarSeries2"
            xAxisName="xAxis"
            yAxisName="yAxis"
            dataSource={highestGrossingMovies}
            title="Highest Grossing Movie in Series"
            valueMemberPath="highestGrossing"
            showDefaultTooltip={true}
            isTransitionInEnabled={true}
            isHighlightingEnabled={true}
            brush="#FFB5C2"
            outline="#FF6F91"
          />

          <IgrDataToolTipLayer name="Tooltips" />
        </IgrDataChart>
      </div>
    </div>
  );
}

export default BarChartSample;
