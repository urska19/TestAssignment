import 'react-native';
import React from 'react';
import ContainerRowView from '../app/components/ContainerRowView';
import LoadingView from '../app/components/LoadingView';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <ContainerRowView />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly', () => {
  const tree = renderer.create(
    <LoadingView />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});