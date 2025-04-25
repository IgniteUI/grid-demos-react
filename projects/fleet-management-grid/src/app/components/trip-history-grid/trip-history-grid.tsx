import { IgrCellTemplateContext, IgrColumn, IgrGrid } from "igniteui-react-grids";
import "./trip-history-grid.scss"
import { IgrAvatar, IgrBadge } from "igniteui-react";
import { dataService } from "../../services/data.service";

export default function TripHistoryGrid(vehicleId: any) {

	const rightAlignedCellStyles = {
		'justify-content': 'flex-end',
		'display': 'flex'
	};
	const rightAlignedHeaderStyles = {
		'text-align': 'right'
	};

	const driverCellTemplate = (ctx: IgrCellTemplateContext) => {
			const isVisible = ctx.cell.row.index === 0 && ctx.cell.row.data.end === "N/A";
			return (
				<>
					<IgrAvatar className="driver-avatar" shape="circle" src={getPathToDriverPhoto(ctx.cell)}></IgrAvatar>
					<a className="status-value" href="#" onClick={(e: any) => handleDriverClick(e, ctx)}>{ctx.implicit}</a>
					{isVisible ? (
					<IgrBadge className="driver-badge" variant="success">
						<span className="driver-badge">Current</span>
					</IgrBadge>
					)
					: ""}
				</>
			);
	}

	function handleDriverClick(event: any, ctx: IgrCellTemplateContext) {
		event.preventDefault();

		const driverName = ctx.cell.row?.cells?.find((c: any) => c.column.field === 'driverName')?.value;

		if (!driverName) {
				console.error('Driver not found in data');
				return;
		}

		const driverDetails = dataService.getDriverData(driverName);

		if (!driverDetails) {
				console.error(`No data found for driver: ${driverName}`);
				return;
		}

		const detail = {
			driverDetails: driverDetails,
			ctx: ctx,
			originalEvent: event
		};

		dispatchEvent(new CustomEvent("driverCellClick", {
			detail,
			bubbles: true,
			composed: true
		}));
	}

	function getPathToDriverPhoto(cell: any) {
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
		//column.bodyTemplate = driverCellTemplate
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
		<IgrGrid autoGenerate={true} onColumnInit={handleColumnInit} data={dataService.getTripHistoryData(vehicleId.vehicleId)} className="child-data" height="null" width="100%">
			{/* 			
			
			<IgrColumn field="startMeter" header="Start Meter" width="9.5%"></IgrColumn>
			<IgrColumn field="endMeter" header="End Meter" width="9.5%"></IgrColumn>
			<IgrColumn field="distance" header="Distance" width="9%"></IgrColumn>
			<IgrColumn field="totalTime" header="Total Time" width="9%"></IgrColumn> */}
		</IgrGrid>
		</>
	);
}