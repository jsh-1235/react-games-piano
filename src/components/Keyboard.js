import React, { Component } from "react";

import styles from "./Keyboard.module.css";

import Info from "./Info";

import PropTypes from "prop-types";

export default class Keyboard extends Component {
  static propTypes = {
    colors: PropTypes.array,
  };

  static defaultProps = {
    colors: ["#d32f2f", "#c2185b", "#7b1fa2", "#512da8", "#303f9f", "#1976d2", "#0097a7", "#388e3c"],
  };

  constructor(props) {
    super(props);

    this.colors = {
      up: "#f5f5f5",
      down: "#1c313a",
    };

    this.state = {
      note: this.props.note,
      name: this.props.name,
      noteKey: this.props.noteKey,
      pressed: this.props.pressed,
      bgColor: this.colors.up,
      fgColor: this.colors.down,
    };
  }

  handleMouseDown = (e) => {
    e.preventDefault();

    if (!this.state.pressed) {
      this.props.play(this.props.index);
    }
  };

  handleMouseUp = (e) => {
    e.preventDefault();

    if (this.state.bgColor === this.colors.down) {
      this.props.pause(this.props.index);
    }
  };

  handleMouseOut = (e) => {
    e.preventDefault();

    if (this.state.bgColor === this.colors.down) {
      this.props.pause(this.props.index);
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.pressed !== prevProps.pressed) {
      // console.log(prevProps.pressed, this.props.pressed);

      this.setState({ bgColor: this.props.pressed ? this.colors.down : this.colors.up }, () => {
        console.log(this.state.bgColor);

        this.setState({ fgColor: !this.props.pressed ? this.colors.down : this.colors.up });
      });
    }
  }

  render() {
    return (
      <div className={styles.outline} style={{ backgroundColor: this.state.bgColor }} onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} onMouseOut={this.handleMouseOut}>
        <Info color={this.props.colors[this.props.index]} note={this.props.note} />
        <span className={styles.name} style={{ color: this.state.fgColor }}>
          {this.props.name}
        </span>
        <span className={styles.noteKey} style={{ color: this.state.fgColor }}>
          {this.props.noteKey}
        </span>
      </div>
    );
  }
}
