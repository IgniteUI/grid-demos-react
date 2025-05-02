import { IgrCellTemplateContext, IgrColumn, IgrGrid } from "igniteui-react-grids";
import "./trip-history-grid.scss"
import { dataService } from "../../services/data.service";
import { html, unsafeCSS } from "lit";
import { Driver } from "../../models/driver.model";
import styles from "./trip-history-grid.scss?inline";
interface TripHistoryGridProps {
	vehicleId: string;
	onDriverClick?: (driverDetails: Driver, event: MouseEvent) => void;
}

export default function TripHistoryGrid({ vehicleId, onDriverClick }: TripHistoryGridProps) {

	const rightAlignedCellStyles = {
		'justify-content': 'flex-end',
		'display': 'flex'
	};
	const rightAlignedHeaderStyles = {
		'text-align': 'right'
	};

	const driverCellTemplate = (ctx: IgrCellTemplateContext) => {
		const isVisible = ctx.cell.row.index === 0 && ctx.cell.row.data.end === "N/A";
		return html`
			<style>
				${unsafeCSS(styles)}
			</style>
			<igc-avatar class="driver-avatar" shape="circle" src="${getPathToDriverPhoto(ctx.cell)}"></igc-avatar>
            <a class="status-value" #coordinates href="#" @click="${(e: MouseEvent) => handleDriverClick(e, ctx)}">${ctx.implicit}</a>
            ${isVisible
				? html`<igc-badge class="driver-badge" variant="success">
                    <span class="current-badge-text">Current</span>
                </igc-badge>`
				: ""
			}          
		`;
	}

	const handleDriverClick = (event: MouseEvent, ctx: IgrCellTemplateContext) => {
		event.preventDefault();

		const driverName = ctx.cell.row?.cells?.find((c: any) => c.column.field === 'driverName')?.value;

		if (!driverName) {
			console.error('Driver not found in data');
			return;
		}

		const driverDetails = dataService.findDriverByName(driverName);

		if (!driverDetails) {
			console.error(`No data found for driver: ${driverName}`);
			return;
		}

		onDriverClick?.(driverDetails, event);
	};

	const getPathToDriverPhoto = (cell: any) => {
		return `people/${dataService.getDriverPhoto(cell.row.data.driverName)}.jpg`
	}

	const handleColumnInit = (event: CustomEvent) => {
		const column = event.detail
		const field = column.field;

		switch (field) {
			case "id":
				setIdColumn(column);
				break;
			case "driverName":
				setDriverNameColumn(column);
				break;
			case "start":
				setStartColumn(column);
				break;
			case "end":
				setEndColumn(column);
				break;
			case "startLocation":
				setStartLocationColumn(column);
				break;
			case "endLocation":
				setEndLocationColumn(column);
				break;
			case "startMeter":
				setStartMeterColumn(column);
				break;
			case "endMeter":
				setEndMeterColumn(column);
				break;
			case "distance":
				setDistanceColumn(column);
				break;
			case "totalTime":
				setTotalTimeColumn(column);
				break;
			default:
				console.warn("No setter defined for field:", field);
		}

	}

	const setIdColumn = (column: IgrColumn) => {
		column.header = "ID";
		column.width = "5%";
		column.headerStyles = rightAlignedHeaderStyles;
		column.cellStyles = rightAlignedCellStyles;
	}
	const setDriverNameColumn = (column: IgrColumn) => {
		column.header = "Driver";
		column.width = "18%";
		column.bodyTemplate = driverCellTemplate
	}
	const setStartColumn = (column: IgrColumn) => {
		column.header = "Start";
		column.width = "9%";
	}
	const setEndColumn = (column: IgrColumn) => {
		column.header = "End";
		column.width = "9%";
	}
	const setStartLocationColumn = (column: IgrColumn) => {
		column.header = "Start Location";
		column.width = "10%";
	}
	const setEndLocationColumn = (column: IgrColumn) => {
		column.header = "End Location";
		column.width = "10%";
	}
	const setStartMeterColumn = (column: IgrColumn) => {
		column.header = "Start Meter";
		column.width = "9.5%";
		column.headerStyles = rightAlignedHeaderStyles;
		column.cellStyles = rightAlignedCellStyles;
	}
	const setEndMeterColumn = (column: IgrColumn) => {
		column.header = "End Meter";
		column.width = "9.5%";
		column.headerStyles = rightAlignedHeaderStyles;
		column.cellStyles = rightAlignedCellStyles;
	}
	const setDistanceColumn = (column: IgrColumn) => {
		column.header = "Distance";
		column.width = "9%";
		column.headerStyles = rightAlignedHeaderStyles;
		column.cellStyles = rightAlignedCellStyles;
	}
	const setTotalTimeColumn = (column: IgrColumn) => {
		column.header = "Total Time";
		column.width = "9%";
		column.headerStyles = rightAlignedHeaderStyles;
		column.cellStyles = rightAlignedCellStyles;
	}

	return (
		<>
			<IgrGrid autoGenerate={true} onColumnInit={handleColumnInit} data={dataService.findTripHistoryById(vehicleId)} className="child-data" height="100%" width="100%"></IgrGrid>
		</>
	);
}