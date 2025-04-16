import { expect, test, vi } from 'vitest';
import { render } from '@testing-library/react';
import SalesDashboard from './sales-view';
import 'element-internals-polyfill';

// Mock API response
const mockResponse = {
  json: () => new Promise((resolve) => resolve({}))
};
global.fetch = vi.fn().mockResolvedValue(mockResponse);

test('renders SalesDashboard component', () => {
  const wrapper = render(<SalesDashboard />);
  expect(wrapper).toBeTruthy();
});
