import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import {Input, FormGroup, Label} from 'reactstrap';
import AvInput from './AvInput';

const radioPropTypes = Object.assign({}, AvInput.propTypes);
delete radioPropTypes.name;

export default class AvRadio extends Component {

  static contextTypes = Object.assign({}, AvInput.contextTypes, {
    Group: PropTypes.object.isRequired,
  });

  static propTypes = radioPropTypes;

  onChangeHandler = (e) => {
    this.context.Group.update(this.props.value);
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  };

  render() {
    const {
      className,
      ...attributes} = this.props;

    const classes = classNames(
      className,
      this.context.FormCtrl.isTouched[this.props.name] ? 'av-touched' : 'av-untouched',
      this.context.FormCtrl.isDirty[this.props.name] ? 'av-dirty' : 'av-pristine',
      this.context.FormCtrl.hasError[this.props.name] ? 'av-invalid' : 'av-valid'
    );

    const input = (<Label check inline={this.context.Group.inline} disabled={this.props.disabled}>
      <Input
        name={this.context.Group.name}
        type='radio'
        {...attributes}
        className={classes}
        onChange={this.onChangeHandler}
        checked={this.props.value === this.context.Group.value}
      /> {this.props.label}
    </Label>);

    if (this.context.Group.inline) {
      return input;
    }

    return (
      <FormGroup check disabled={this.props.disabled}>
        {input}
      </FormGroup>
    );
  }
}
