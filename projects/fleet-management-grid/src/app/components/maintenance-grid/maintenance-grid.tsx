import { IgrCellTemplateContext, IgrColumn, IgrGrid } from "igniteui-react-grids";
import { dataService } from "../../services/data.service";
import { registerIconFromText } from "igniteui-react";
import { useEffect, useRef } from "react";
import { check, gitIssue } from "@igniteui/material-icons-extended";
import { html, unsafeCSS } from "lit";
import styles from "./maintenance-grid.scss?inline";

export default function MaintenanceGrid(vehicleId: any) {

    const gridRef = useRef<IgrGrid>(null);

    useEffect(() => {
        registerIconFromText(check.name, check.value, "imx-icons");
        registerIconFromText(gitIssue.name, gitIssue.value, 'imx-icons');
    }, []);

    const rightAlignedCellStyles = {
        'justify-content': 'flex-end',
        'display': 'flex'
    };
    const rightAlignedHeaderStyles = {
        'text-align': 'right'
    };

    const typeCellTemplate = (ctx: IgrCellTemplateContext) => {
        const value = ctx.implicit;
        const variant = value === "Regular" ? "success" : "warning";
        const iconName = value === "Regular" ? "check" : "git-issue";
        return html`
            <style>
                ${unsafeCSS(styles)}
            </style>
            <div>
                <igc-badge variant=${variant}>
                    <igc-icon class="icon-style" collection="imx-icons" name=${iconName}></igc-icon>
                </igc-badge>
                <span class="status-value">${value}</span>
            </div>
        `;
    }

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
        column.bodyTemplate = typeCellTemplate;
        //gridRef.current?.markForCheck();
    }

    const setRemarksColumn = (column: IgrColumn) => {
        column.header = "Remarks";
        column.width = "40%";
    }

    return (
        <>
            <IgrGrid ref={gridRef} autoGenerate={true} onColumnInit={handleColumnInit} data={dataService.findMaintenanceDataById(vehicleId.vehicleId)} className="child-grid" height="100%" width="100%"></IgrGrid>
        </>
    )
}