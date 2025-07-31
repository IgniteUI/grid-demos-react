import { useState } from "react";
import {
  IgrLegend,
  IgrDataChart,
  IgrNumericAngleAxis,
  IgrNumericRadiusAxis,
  IgrPolarAreaSeries,
  IgrLegendModule
} from "igniteui-react-charts";
import "./PolarChartSample.scss";

IgrLegendModule.register();

function PolarChartSample() {
  const [legend, setLegend] = useState<IgrLegend | null>(null);

  const boatSailingData = [
    { direction: 0, boatSpeed: 70, windSpeed: 90 },
    { direction: 45, boatSpeed: 35, windSpeed: 65 },
    { direction: 90, boatSpeed: 25, windSpeed: 45 },
    { direction: 135, boatSpeed: 15, windSpeed: 25 },
    { direction: 180, boatSpeed: 0, windSpeed: 0 },
    { direction: 225, boatSpeed: 15, windSpeed: 25 },
    { direction: 270, boatSpeed: 25, windSpeed: 45 },
    { direction: 315, boatSpeed: 35, windSpeed: 65 },
    { direction: 360, boatSpeed: 70, windSpeed: 90 },
  ];

  return (
    <div className="polar-chart-container">
      <div className="legend">Wind Speed vs Boat Speed</div>

      <div>
        <IgrLegend ref={setLegend} orientation="Horizontal" />
      </div>

      <div className="chart-wrapper">
        <IgrDataChart
          width="100%"
          height="100%"
          dataSource={boatSailingData}
          legend={legend}
          isHorizontalZoomEnabled={false}
          isVerticalZoomEnabled={false}
        >
          <IgrNumericAngleAxis
            name="angleAxis"
            startAngleOffset={-90}
            interval={30}
            minimumValue={0}
            maximumValue={360}
            labelTextStyle="normal bold 14px Verdana"
          />

          <IgrNumericRadiusAxis
            name="radiusAxis"
            radiusExtentScale={0.9}
            innerRadiusExtentScale={0.1}
            interval={25}
            minimumValue={0}
            maximumValue={100}
          />

          <IgrPolarAreaSeries
            name="series1"
            title="Wind Speed"
            dataSource={boatSailingData}
            angleAxisName="angleAxis"
            radiusAxisName="radiusAxis"
            angleMemberPath="direction"
            radiusMemberPath="windSpeed"
            showDefaultTooltip={true}
            areaFillOpacity={0.3}
            thickness={1}
            markerType="Circle"
          />

          <IgrPolarAreaSeries
            name="series2"
            title="Boat Speed"
            dataSource={boatSailingData}
            angleAxisName="angleAxis"
            radiusAxisName="radiusAxis"
            angleMemberPath="direction"
            radiusMemberPath="boatSpeed"
            showDefaultTooltip={true}
            areaFillOpacity={0.3}
            thickness={1}
            markerType="Circle"
          />
        </IgrDataChart>
      </div>
    </div>
  );
}

export default PolarChartSample;
