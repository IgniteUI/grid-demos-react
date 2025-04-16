import { expect, test, vi } from 'vitest';
import { render } from '@testing-library/react';
import ERPInventory from './erp-hgrid-view';
import 'element-internals-polyfill';

// Mock API response
const mockResponse = {
  json: () => new Promise((resolve) => resolve({}))
};
global.fetch = vi.fn().mockResolvedValue(mockResponse);

test('renders ERPInventory component', () => {
  const wrapper = render(<ERPInventory />);
  expect(wrapper).toBeTruthy();
});
