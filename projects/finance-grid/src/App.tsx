import { useState, useEffect, useRef } from "react";

import "./App.scss";
import {
  FilteringLogic,
  IgrCellTemplateContext,
  IgrColumn,
  IgrFilteringExpressionsTree,
  IgrGrid,
  IgrGridToolbar,
  IgrGridToolbarActions,
  IgrGridToolbarExporter,
  IgrGridToolbarHiding,
  IgrGridToolbarPinning,
  IgrGridToolbarTitle,
  IgrStringFilteringOperand,
} from "igniteui-react-grids";
import {
  IgrAvatar,
  IgrIcon,
  IgrInput,
  IgrLinearProgress,
  registerIconFromText,
} from "igniteui-react";
import { dataService } from "./services/data.service";
import { TRENDING_DOWN, TRENDING_UP } from "./assets/icons/icons";
import 'igniteui-react-grids/grids/themes/light/bootstrap.css'

function FinanceGrid() {
  const updateTimerInMs = 3000;
  const [financeData, setFinanceData] = useState([]);
  const gridRef = useRef<IgrGrid>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    registerIconFromText("trending_up", TRENDING_UP, "material");
    registerIconFromText("trending_down", TRENDING_DOWN, "material");
    dataService.getFinanceData().then((data: any) => {
      setFinanceData(data);
    });
    intervalRef.current = setInterval(() => {
      dataService.updateAllPrices(gridRef.current!.data);
      gridRef.current!.markForCheck();
    }, updateTimerInMs);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const getPathToImage = (val: string): string => {
    return `${import.meta.env.BASE_URL}companies/${val.split(" ")[0]}.png`;
  };

  const assetTemplate = (ctx: IgrCellTemplateContext) => {
    return (
      <div className="assets-container">
        <IgrAvatar
          src={getPathToImage(ctx.cell.value)}
          shape="rounded"
        ></IgrAvatar>
        <span>{ctx.cell.value}</span>
      </div>
    );
  };

  const holdingPeriodTemplate = (ctx: IgrCellTemplateContext) => {
    return <span>{ctx.cell.value} days</span>;
  };

  const renderIcon = (val: number) => {
    return val >= 0 ? (
      <IgrIcon name="trending_up" collection="material"></IgrIcon>
    ) : (
      <IgrIcon name="trending_down" collection="material"></IgrIcon>
    );
  };

  const dailyChangePercentageTemplate = (ctx: IgrCellTemplateContext) => {
    const percentageValue = (ctx.cell.value * 100).toFixed(2);
    return (
      <div className="assets-container">
        <div>{percentageValue}%</div>
        {renderIcon(ctx.cell.value)}
      </div>
    );
  };

  const profitLossValueTemplate = (ctx: IgrCellTemplateContext) => {
    const formattedValue = `${ctx.cell.value < 0 ? "-" : ""}$${Math.abs(
      ctx.cell.value
    ).toFixed(2)}`;
    return (
      <div className="assets-container">
        <div>{formattedValue}</div>
        {renderIcon(ctx.cell.value)}
      </div>
    );
  };

  const allocationTemplate = (ctx: IgrCellTemplateContext) => {
    const percentageValue = (ctx.cell.value * 100).toFixed(2);
    return (
      <div className="progress-container">
        <div>{percentageValue}%</div>
        <IgrLinearProgress
          value={ctx.cell.value * 100}
          animationDuration={0}
          hideLabel={true}
        ></IgrLinearProgress>
      </div>
    );
  };

  const profitConditionHandler = (rowData: any, columnKey: string) => {
    return rowData[columnKey] >= 0;
  };

  const lossConditionHandler = (rowData: any, columnKey: string) => {
    return rowData[columnKey] < 0;
  };

  const profitLossValueClasses = {
    profitCondition: profitConditionHandler,
    lossCondition: lossConditionHandler,
  };

  const filter = (e: any) => {
    const value = e.target.value;
    const expressionTree: IgrFilteringExpressionsTree = {
      operator: FilteringLogic.Or,
      filteringOperands: [
        {
          condition: IgrStringFilteringOperand.instance().condition("contains"),
          fieldName: "id",
          searchVal: value,
          ignoreCase: true,
        },
        {
          condition: IgrStringFilteringOperand.instance().condition("contains"),
          fieldName: "holdingName",
          searchVal: value,
          ignoreCase: true,
        },
      ],
    };

    if (value) {
      gridRef.current!.filteringExpressionsTree = expressionTree;
    } else {
      gridRef.current!.clearFilter();
    }
  };

  return (
    <>
      <IgrGrid
        primaryKey="id"
        rowSelection="multiple"
        data={financeData}
        ref={gridRef}
        className="grid-sizing"
      >
        <IgrGridToolbar>
          <IgrGridToolbarActions>
            <IgrGridToolbarHiding></IgrGridToolbarHiding>
            <IgrGridToolbarPinning></IgrGridToolbarPinning>
            <IgrGridToolbarExporter></IgrGridToolbarExporter>
          </IgrGridToolbarActions>
          <IgrGridToolbarTitle>
            <span>Financial Portfolio</span>
          </IgrGridToolbarTitle>
          <IgrInput
            type="search"
            placeholder="Filter by Asset"
            onInput={filter}
          ></IgrInput>
        </IgrGridToolbar>
        <IgrColumn
          field="id"
          dataType="string"
          header="Symbol"
          sortable={true}
          width="7%"
        ></IgrColumn>
        <IgrColumn
          field="holdingName"
          dataType="string"
          header="Asset"
          sortable={true}
          bodyTemplate={assetTemplate}
          width="15%"
        ></IgrColumn>
        <IgrColumn
          field="positions"
          dataType="number"
          header="Position"
          sortable={true}
          width="6%"
        ></IgrColumn>
        <IgrColumn
          field="value.boughtPrice"
          dataType="currency"
          header="Average Cost/Share"
          sortable={true}
          width="10%"
        ></IgrColumn>
        <IgrColumn
          field="value.currentPrice"
          dataType="currency"
          header="Last Price"
          sortable={true}
          width="7%"
        ></IgrColumn>
        <IgrColumn
          header="Daily Change %"
          field="dailyPercentageChange"
          sortable={true}
          width="10%"
          cellClasses={profitLossValueClasses}
          dataType="percent"
          bodyTemplate={dailyChangePercentageTemplate}
        ></IgrColumn>
        <IgrColumn
          header="Market Value"
          field="marketValue"
          sortable={true}
          dataType="currency"
          width="5%"
        ></IgrColumn>
        <IgrColumn
          header="NET Profit/Loss"
          field="profitLossValue"
          sortable={true}
          dataType="currency"
          bodyTemplate={profitLossValueTemplate}
          cellClasses={profitLossValueClasses}
          width="10%"
        ></IgrColumn>
        <IgrColumn
          field="profitLossPercentage"
          header="NET Profit/Loss %"
          sortable={true}
          dataType="percent"
          cellClasses={profitLossValueClasses}
          bodyTemplate={dailyChangePercentageTemplate}
          width="10%"
        ></IgrColumn>
        <IgrColumn
          header="Allocation"
          sortable={true}
          field="allocation"
          datatype="percent"
          width="10%"
          bodyTemplate={allocationTemplate}
        ></IgrColumn>
        <IgrColumn
          field="holdingPeriod"
          header="Holding Period"
          sortable={true}
          bodyTemplate={holdingPeriodTemplate}
          width="8%"
        ></IgrColumn>
      </IgrGrid>
    </>
  );
}

export default FinanceGrid;
