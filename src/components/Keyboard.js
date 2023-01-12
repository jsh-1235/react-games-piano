import React, { Component } from "react";

import styles from "./Keyboard.module.css";

export default class Keyboard extends Component {
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
        <span className={styles.note} style={{ color: this.state.fgColor }}>
          {this.props.note}
        </span>
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
