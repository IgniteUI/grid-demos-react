import { expect, test, vi } from 'vitest';
import { render } from '@testing-library/react';
import OrgChartHRPortal from './hr-portal-view';
import 'element-internals-polyfill';

// Mock API response
const mockResponse = {
  json: () => new Promise((resolve) => resolve({}))
};
global.fetch = vi.fn().mockResolvedValue(mockResponse);

test('renders OrgChartHRPortal component', () => {
  const wrapper = render(<OrgChartHRPortal />);
  expect(wrapper).toBeTruthy();
});
