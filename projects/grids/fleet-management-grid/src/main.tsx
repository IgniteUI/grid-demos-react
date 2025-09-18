import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
import FleetManagement from './app/components/fleet-management-grid/fleet-management-grid';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FleetManagement />
  </StrictMode>

)
