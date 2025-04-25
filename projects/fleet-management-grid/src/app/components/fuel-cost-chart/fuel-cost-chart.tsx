import { IgrSelect, IgrSelectHeader, IgrSelectItem } from "igniteui-react";
import { IgrCategoryChart } from "igniteui-react-charts";
import { useState, useEffect } from "react";
import { Period } from "../../models/enums";
import { dataService } from "../../services/data.service";

export default function FuelCostChartComponent({ vehicleId }: { vehicleId: string }) {
    const [chartData, setChartData] = useState<{ value: number; category: string; summary: string; }[]>([]);
    const [selectValue, setSelectValue] = useState(Period.YTD);

    useEffect(() => {
        const data = dataService.getFuelCostsData(vehicleId, selectValue);
        setChartData(data);
    }, [selectValue])

    const onPeriodChange = (event: any) => {
        setSelectValue(event.target.value)
    }

    return (
        <div className="chart-container column-chart-container">
            <div className="chart-header">
                <span className="chart-title">Fuel Costs per Month</span>
                <IgrSelect className="chart-select" value={selectValue}
                    onChange={(event: any) => onPeriodChange(event)}>
                    <IgrSelectHeader>Period</IgrSelectHeader>
                    <IgrSelectItem value={Period.YTD}>YTD</IgrSelectItem>
                    <IgrSelectItem value={Period.ThreeMonths}>Last 3 Months</IgrSelectItem>
                    <IgrSelectItem value={Period.SixMonths}>Last 6 Months</IgrSelectItem>
                    <IgrSelectItem value={Period.TwelveMonths}>Last 12 Months</IgrSelectItem>
                </IgrSelect>
            </div>
            <div className="chart-content">
                <div className="column-chart">
                    <IgrCategoryChart
                        chartType="Column"
                        dataSource={chartData}
                        yAxisTitle="Costs in USD"
                        isHorizontalZoomEnabled="false"
                        isVerticalZoomEnabled="false"
                        xAxisLabelTextColor="#ededed"
                        yAxisLabelTextColor="#ededed"
                        yAxisTitleTextColor="#ededed"
                        yAxisMinimumValue="0"
                        xAxisMinimumGapSize="30"
                        yAxisLabelRightMargin="7.5"
                        width='95%'
                        height='420px'>
                    </IgrCategoryChart>
                </div>
            </div>
        </div>
    )
}