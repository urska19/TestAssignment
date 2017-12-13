import 'react-native';
import React from 'react';
import SettingsPage from '../app/containers/SettingsPage';
import renderer from 'react-test-renderer';
jest.mock('mobx-react/native', () => require('mobx-react/custom'));

it('renders correctly', () => {
  const tree = renderer.create(
    <SettingsPage />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});