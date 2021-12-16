import React, { Component } from 'react';
import './Item.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Item extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isCompleted: false
    }
  }

  handleCheckClick = async () => {
    await this.setState({ isCompleted: !this.state.isCompleted });

    console.log("handle");
    console.log(this.props.item, this.state.isCompleted);
    if (this.state.isCompleted) {
      this.props.addToCompleteList(this.props.item)
    } else {
      this.props.deleteFromCompleteList(this.props.item)
    }
  }

  renderActivityDisplay() {
    if (this.props.statusChoice === "Complete") {
      if (!this.state.isCompleted) {
        return "none";
      }
      else {
        return "";
      }
    }
    else if (this.props.statusChoice === "Active") {
      if (this.state.isCompleted) {
        return "none";
      }
      else {
        return "";
      }
    }
    else {
      return "";
    }
  }

  componentDidMount() {
    this.textAreaRef.style.height = "inherit";
    this.textAreaRef.style.height = this.textAreaRef.scrollHeight + "px";
  }

  componentDidUpdate() {
    this.textAreaRef.style.height = "inherit";
    this.textAreaRef.style.height = this.textAreaRef.scrollHeight + "px";
  }

  render() {
    console.log(this.props.item, this.state.isCompleted);
    return (
      <div style={{ display: `${this.renderActivityDisplay()}` }}
        id={this.props.item.key}
        key={this.props.item.key}
        className="maindiv"
        draggable
        onDragStart={(e) => this.props.handleDragStart(e)}
        onDragOver={(e) => this.props.handleDragOver(e)}
        onDrop={(e) => this.props.handleDrop(e)}>
        <div className="list" id={this.props.item.key}>
          <div id={this.props.item.key} type="button" onClick={this.handleCheckClick} className="circle">
            <div className="innerCircle"
              style={{ display: this.state.isCompleted ? "" : "none" }}></div>
          </div>
          <textarea
            rows="1"
            id={this.props.item.key}
            value={this.props.item.text}
            ref={textAreaRef => this.textAreaRef = textAreaRef}
            style={{ textDecoration: this.state.isCompleted ? "line-through" : "" }}
            onChange={(e) => { this.props.setUpdate(e.target.value, this.props.item.key) }} />
          <span id={this.props.item.key}>
            <FontAwesomeIcon
              className="bin"
              icon='trash'
              onClick={() => this.props.deleteItem(this.props.item.key)}>
            </FontAwesomeIcon>
          </span>
        </div>
      </div>
    );
  }
}

export default Item;