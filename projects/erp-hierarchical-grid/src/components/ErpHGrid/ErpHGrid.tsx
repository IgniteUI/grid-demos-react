import { useState, useEffect } from "react";
import { IgrBadge, IgrIcon, IgrRating, registerIcon } from "igniteui-react";
import {
  IgrHierarchicalGrid,
  IgrColumn,
  IgrRowIsland,
  IgrGridToolbar,
  IgrGridToolbarTitle,
  IgrGridToolbarActions,
  IgrGridToolbarHiding,
  IgrGridToolbarPinning,
  IgrGridToolbarExporter,
  IgrGridToolbarAdvancedFiltering,
  GridSelectionMode,
  IgrCellTemplateContext,
  IgrColumnGroup,
  IgrSortingExpression,
  SortingDirection,
  IgrFilteringOperand,
} from "igniteui-react-grids";
import { MyChart } from "../SalesTrendChart/SalesTrendChart";
import { erpDataService } from "../../services/ErpDataService";
import { BadgeVariant } from "../../models/BadgeVariant";
import { OrderStatus } from "../../models/OrderStatus";
import { DataPoint } from "../../models/DataPoint";
import { FullAddressFilteringOperand } from "../../services/custom-operations/CustomFilteringOperand";
import BILL_PAID from "../../assets/icons/bill_paid.svg";
import CHECK from "../../assets/icons/check.svg";
import DELIVERY from "../../assets/icons/delivery.svg";
import DROPBOX from "../../assets/icons/dropbox.svg";
import "./ErpHGrid.scss";
import { TemplateDataItemExtended } from "../../models/TemplateDataItem";
import {
  flip,
  offset,
  shift,
  useFloating,
  useTransitionStyles,
} from "@floating-ui/react";

const ErpHGrid = () => {
  const selectionMode: GridSelectionMode = "multiple";
  const [gridData, setGridData] = useState<TemplateDataItemExtended[]>([]);

  // Custom filtering for templated Address column
  const fullAddressFilteringOperand: IgrFilteringOperand =
    FullAddressFilteringOperand.instance();
  const shortAddressFilteringOperand: FullAddressFilteringOperand =
    new FullAddressFilteringOperand(true);

  // Tooltip stuff
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isTooltipOpen,
    onOpenChange: setIsTooltipOpen,
    middleware: [offset(8), flip(), shift()],
    placement: "right-start",
  });

  const { styles: transitionStyles } = useTransitionStyles(context, {
    duration: {
      open: 800,
    },
  });

  // Image tooltip for each product fields
  const [hoveredImageUrl, setHoveredImageUrl] = useState<string>("");
  const [hoveredImageProductName, setHoveredImageProductName] =
    useState<string>("");

  useEffect(() => {
    erpDataService.getErpData().then((data: TemplateDataItemExtended[]) => {
      setGridData(data);
    });

    // Icons
    registerIcon("dropbox", DROPBOX, "material");
    registerIcon("delivery", DELIVERY, "material");
    registerIcon("bill-paid", BILL_PAID, "material");
    registerIcon("check", CHECK, "material");
  }, []);

  const exportStarted = (args: any) => {
    args.detail.exporter.columnExporting.subscribe((columnArgs: any) => {
      // Don't export Performance column
      columnArgs.cancel = columnArgs.field === "salesTrendData";
    });
  };

  // TEMPLATES
  const showTooltip = (
    event: React.MouseEvent<HTMLDivElement>,
    imageUrl: string,
    productName: string
  ) => {
    setIsTooltipOpen(true);
    setHoveredImageUrl(imageUrl);
    setHoveredImageProductName(productName);

    const currentTarget = event.currentTarget;
    refs.setReference(currentTarget);
  };

  const imageTemplate = (props: IgrCellTemplateContext) => {
    const imageUrl = props.cell.value;
    const imageUrlFull: string = `${import.meta.env.BASE_URL}${imageUrl}`;

    const productName: string = props.cell.row?.cells?.find(
      (c: any) => c.column.field === "productName"
    )?.value;

    return (
      <img
        src={imageUrlFull}
        alt={productName}
        ref={refs.setReference}
        style={{
          height: "22px",
          width: "fit-content",
          borderRadius: "4px",
        }}
        onMouseEnter={(event) => showTooltip(event, imageUrl, productName)}
        onMouseLeave={() => setIsTooltipOpen(false)}
      />
    );
  };

  const ratingTemplate = (ctx: IgrCellTemplateContext) => {
    const rating: number = ctx.cell.value;
    return (
      <>
        <IgrRating value={rating} readOnly={true} max={5}></IgrRating>
      </>
    );
  };

  const salesTrendsChartTemplate = (ctx: IgrCellTemplateContext) => {
    const trendData: DataPoint[] = ctx.cell.value;

    if (!trendData || trendData.length === 0) {
      return <span>No data</span>;
    }

    return <MyChart trendData={trendData}></MyChart>;
  };

  /* RowIsland */
  const rowIslandToolbarTemplate = () => {
    return (
      <IgrGridToolbar>
        <IgrGridToolbarTitle>Sales data for the last month</IgrGridToolbarTitle>
      </IgrGridToolbar>
    );
  };

  const getOrderStatusBadgeVariant = (status: string): BadgeVariant => {
    switch (status) {
      case OrderStatus.PACKED:
        return "primary";
      case OrderStatus.IN_TRANSIT:
        return "warning";
      case OrderStatus.CUSTOMS:
        return "danger";
      case OrderStatus.DELIVERED:
        return "success";
      default:
        return "primary";
    }
  };

  const getOrderStatusIconName = (status: string): string => {
    switch (status) {
      case OrderStatus.PACKED:
        return "dropbox";
      case OrderStatus.IN_TRANSIT:
        return "delivery";
      case OrderStatus.CUSTOMS:
        return "bill-paid";
      case OrderStatus.DELIVERED:
        return "check";
      default:
        return "dropbox";
    }
  };

  const statusTemplate = (ctx: IgrCellTemplateContext) => {
    const cellValue: string = ctx.cell.value;
    const badgeVariant: BadgeVariant = getOrderStatusBadgeVariant(cellValue);
    const iconName: string = getOrderStatusIconName(cellValue);

    return (
      <div className="status-cell">
        <span>
          <IgrBadge variant={badgeVariant} shape="rounded">
            <IgrIcon
              name={iconName}
              collection="material"
              className="custom-icon"
            ></IgrIcon>
          </IgrBadge>
        </span>
        <span>{cellValue}</span>
      </div>
    );
  };

  const countryTemplate = (ctx: IgrCellTemplateContext) => {
    const cellValue: string = ctx.cell.value;
    const flagPath: string = `${
      import.meta.env.BASE_URL
    }country-flags/${cellValue}.svg`;

    return (
      <div className="country-cell">
        <img src={flagPath} />
        <span className="country-name">{cellValue}</span>
      </div>
    );
  };

  // FORMATTERS
  const formatNumberAsIs = (value: number): number => {
    // Bypassing the default formatting of larger numbers
    // Example for 4-digit numbers: 1,234 => 1234
    return value;
  };

  const formatDate = (value: string): string => {
    return value || "N/A";
  };

  const formatAddress = (value: any): string => {
    return `${value.streetNumber} ${value.streetName}`;
  };

  const formatFullAddress = (value: any): string => {
    return `${value.streetNumber} ${value.streetName}, ${value.zipCode} ${value.city}, ${value.country}`;
  };

  // SORTINGS
  const childGridSortingExpression: IgrSortingExpression[] = [
    {
      dir: SortingDirection.Desc,
      fieldName: "delivery.dateOrdered",
      ignoreCase: true,
    },
  ];

  return (
    <div className="wrapper">
      <IgrHierarchicalGrid
        id="hierarchicalGrid"
        data={gridData}
        autoGenerate={false}
        allowFiltering={true}
        allowAdvancedFiltering={true}
        primaryKey="sku"
        moving={true}
        rowSelection={selectionMode}
        width="100%"
        height="100%"
      >
        {/* Grid Toolbar */}
        <IgrGridToolbar>
          <IgrGridToolbarTitle>Inventory</IgrGridToolbarTitle>
          <IgrGridToolbarActions>
            <IgrGridToolbarHiding />
            <IgrGridToolbarPinning />
            <IgrGridToolbarExporter
              exportExcel={true}
              exportCSV={true}
              onExportStarted={exportStarted}
            />
            <IgrGridToolbarAdvancedFiltering />
          </IgrGridToolbarActions>
        </IgrGridToolbar>

        {/* Columns */}
        <IgrColumn field="sku" header="SKU" sortable={true} dataType="string" />
        <IgrColumn
          field="imageUrl"
          header="Image"
          bodyTemplate={imageTemplate}
          filterable={false}
          dataType="image"
          width="7%"
          cellClasses={{ "centered-image-cell": true }}
        />
        <IgrColumn
          field="productName"
          header="Product Name"
          dataType="string"
          sortable={true}
          width="12%"
        />
        <IgrColumn
          field="category"
          header="Category"
          dataType="string"
          sortable={true}
        />
        <IgrColumn
          field="rating"
          dataType="number"
          header="Rating"
          sortable={true}
          bodyTemplate={ratingTemplate}
          selectable={false}
        />
        <IgrColumn
          field="unitsSold"
          header="Sold Units Last Month"
          dataType="number"
          sortable={true}
          width="10%"
        />

        <IgrColumn
          field="salesTrendData"
          header="Monthly Sales Trends"
          width="15%"
          filterable={false}
          bodyTemplate={salesTrendsChartTemplate}
        />

        <IgrColumn
          field="grossPrice"
          header="Net Price"
          dataType="currency"
          sortable={true}
          width="7%"
        />
        <IgrColumn
          field="netPrice"
          header="Gross Price"
          dataType="currency"
          sortable={true}
          width="7%"
        />
        <IgrColumn
          field="totalNetProfit"
          header="Net Profit"
          dataType="currency"
          sortable={true}
          width="7%"
        />

        {/* Row Island (Orders) */}
        <IgrRowIsland
          childDataKey="orders"
          autoGenerate={false}
          allowFiltering={true}
          toolbarTemplate={rowIslandToolbarTemplate}
          rowSelection={selectionMode}
          sortingExpressions={childGridSortingExpression}
        >
          <IgrGridToolbar>
            <IgrGridToolbarTitle>
              Sales data for the last month
            </IgrGridToolbarTitle>
          </IgrGridToolbar>

          <IgrColumn
            field="orderId"
            header="Order ID"
            dataType="number"
            width="7%"
            formatter={formatNumberAsIs}
          />
          <IgrColumn
            field="status"
            header="Status"
            width="11%"
            bodyTemplate={statusTemplate}
          />

          <IgrColumnGroup header="Delivery Info" collapsible={true}>
            {/* Show this column when collapsed */}
            <IgrColumn
              field="delivery.dateOrdered"
              header="Date Ordered"
              dataType="date"
              width="12%"
              sortable={true}
              resizable={true}
              visibleWhenCollapsed={true}
              formatter={formatDate}
            />

            {/* Show next 3 columns when expanded */}
            <IgrColumn
              field="delivery.dateOrdered"
              header="Date Ordered"
              dataType="date"
              width="12%"
              sortable={true}
              resizable={true}
              visibleWhenCollapsed={false}
              formatter={formatDate}
            />

            <IgrColumn
              field="delivery.dateShipped"
              header="Date Shipped"
              dataType="date"
              width="12%"
              sortable={true}
              resizable={true}
              visibleWhenCollapsed={false}
              formatter={formatDate}
            />

            <IgrColumn
              field="delivery.dateDelivered"
              header="Date Delivered"
              dataType="date"
              width="12%"
              sortable={true}
              resizable={true}
              visibleWhenCollapsed={false}
              formatter={formatDate}
            />
          </IgrColumnGroup>

          <IgrColumnGroup header="Order Information" collapsible={true}>
            {/* Show next 4 columns when expanded */}
            <IgrColumn
              field="orderInformation.country"
              header="Country"
              width="12%"
              sortable={true}
              visibleWhenCollapsed={false}
              bodyTemplate={countryTemplate}
            />

            <IgrColumn
              field="orderInformation.city"
              header="City"
              dataType="string"
              width="13%"
              sortable={true}
              resizable={true}
              visibleWhenCollapsed={false}
            />

            <IgrColumn
              field="orderInformation.zipCode"
              header="Zip Code"
              dataType="number"
              width="9%"
              sortable={true}
              resizable={true}
              formatter={formatNumberAsIs}
              visibleWhenCollapsed={false}
            />

            <IgrColumn
              field="orderInformation"
              header="Address"
              dataType="string"
              sortable={false}
              resizable={true}
              visibleWhenCollapsed={false}
              formatter={formatAddress}
              filters={shortAddressFilteringOperand}
            />

            {/* Collapsed view column */}
            <IgrColumn
              field="orderInformation"
              header="Address"
              dataType="string"
              sortable={false}
              resizable={true}
              visibleWhenCollapsed={true}
              formatter={formatFullAddress}
              filters={fullAddressFilteringOperand}
            />
          </IgrColumnGroup>
        </IgrRowIsland>
      </IgrHierarchicalGrid>

      {isTooltipOpen && (
        <div
          className="imageTooltip"
          ref={refs.setFloating}
          style={{ ...floatingStyles, ...transitionStyles }}
        >
          <div className="tooltip-header"> {hoveredImageProductName} </div>
          <div className="tooltip-body">
            <img src={hoveredImageUrl} alt={hoveredImageProductName} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ErpHGrid;
