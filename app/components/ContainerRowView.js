import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

class ContainerRowView extends React.Component {

  static propTypes = {
    listRowContainerStyle: PropTypes.array,
    insideElement: PropTypes.element,
    onPress: PropTypes.func
  }

  static defaultProps = {
    listRowContainerStyle: [{
          height: 46,
          backgroundColor: 'white',
          borderRadius: 10,
          borderWidth: 1,
          marginVertical: 2,
          paddingHorizontal: 15
        }],
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity style={ this.props.listRowContainerStyle }
                        onPress={this.props.onPress}>
        {this.props.insideElement}
      </TouchableOpacity>
    )
  }
  
}

module.exports = ContainerRowView;
