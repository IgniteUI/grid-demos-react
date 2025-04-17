import { IgrColumn, IgrGrid } from "igniteui-react-grids";
import { dataService } from "../services/data.service";

export default function MaintenanceGrid(vehicleId: any) {

    const rightAlignedCellStyles = {
		'justify-content': 'flex-end',
		'display': 'flex'
	};
	const rightAlignedHeaderStyles = {
		'text-align': 'right'
	};

    const handleColumnInit = (event: CustomEvent) => {
        const column = event.detail
		const field = column.field;

        switch (field) {
            case "id":
				setIdColumn(column);
				break;
			case "event":
				setEventColumn(column);
				break;
			case "date":
				setDateColumn(column);
				break;
			case "location":
				setLocationColumn(column);
				break;
			case "type":
				setTypeColumn(column);
				break;
			case "remarks":
				setRemarksColumn(column);
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

    const setEventColumn = (column: IgrColumn) => {
        column.header = "Event";
        column.width = "23%";
    }

    const setDateColumn = (column: IgrColumn) => {
        column.header = "Date";
        column.width = "10%";
    }

    const setLocationColumn = (column: IgrColumn) => {
        column.header = "Location";
        column.width = "10%";
    }

    const setTypeColumn = (column: IgrColumn) => {
        column.header = "Type";
        column.width = "12%";
    }

    const setRemarksColumn = (column: IgrColumn) => {
        column.header = "Remarks";
        column.width = "40%";
    }

    return(
        <>
        <IgrGrid autoGenerate={true} onColumnInit={handleColumnInit} data={dataService.getMaintenanceData(vehicleId.vehicleId)} className="child-grid" height="100%" width="100%"></IgrGrid>
        </>
    )
}