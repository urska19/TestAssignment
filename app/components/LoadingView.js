import React, {Component} from 'react';
import {View, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';

class LoadingView extends React.Component {

  static propTypes = {
    style: PropTypes.object,
    size: PropTypes.string,
    color: PropTypes.string
  }

  static defaultProps = {
    style: {alignItems: 'center', justifyContent: 'center'},
    size: 'large',
    color: 'yellow'
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ActivityIndicator style={this.props.style} 
        size={this.props.size}
        color={this.props.color} />
    )
  }

}

module.exports = LoadingView;
