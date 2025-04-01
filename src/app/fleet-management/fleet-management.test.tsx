import { expect, test, vi } from 'vitest';
import { render } from '@testing-library/react';
import FleetManagement from './fleet-management';
import 'element-internals-polyfill';

// Mock API response
const mockResponse = {
  json: () => new Promise((resolve) => resolve({}))
};
global.fetch = vi.fn().mockResolvedValue(mockResponse);

test('renders FleetManagement component', () => {
  const wrapper = render(<FleetManagement />);
  expect(wrapper).toBeTruthy();
});