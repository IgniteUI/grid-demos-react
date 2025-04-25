import FleetManagement from "../../../../projects/fleet-management-grid/src/app/components/fleet-management-grid/fleet-management-grid";
import sampleStyles from "../../../../projects/fleet-management-grid/src/app/components/fleet-management-grid/fleet-management-grid.scss?inline";
import darkMaterial from "igniteui-react-grids/grids/themes/dark/material.css?inline";

export default function FleetManagementView() {
  return (
    <>
      <style>{darkMaterial}</style>
      <style>{sampleStyles}</style>

      <FleetManagement />
    </>
  )
}