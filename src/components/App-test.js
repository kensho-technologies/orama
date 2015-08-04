
import React from 'react';
import expect from 'expect';
import renderComponent from '../renderComponentTest';

import App, * as AppUtils from './App';

describe('App', () => {
  it('should exist', () => {
    expect(App).toExist();
  });
  it('should render', () => {
    var component = renderComponent(<App/>);
    expect(component.type).toBe('div');
  });
});

describe('App.add', () => {
  it('should exist', () => {
    expect(AppUtils.add).toExist();
  });
  it('should add', () => {
    expect(AppUtils.add(1, 1)).toBe(2);
  });
});
