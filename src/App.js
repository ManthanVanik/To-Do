import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import Item from './Item';
import Bottom from './Bottom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { library, text } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import FlipMove from 'react-flip-move';

library.add(faTrash, faPlus);

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      items: [],
      completeList: [],
      statusChoice: "All",
      currentItem: {
        text: "",
        key: ""
      }
    }
  }

  handleInput = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
    this.setState({
      currentItem: {
        text: e.target.value,
        key: Date.now()
      }
    })
  }

  // Add Entries
  addItem = (e) => {
    this.text.style.height = "inherit";
    e.preventDefault();
    const newitem = this.state.currentItem;
    console.log(newitem);
    if (newitem.text !== "") {
      const newItems = [...this.state.items, newitem];
      this.setState({
        items: newItems,
        currentItem: {
          text: '',
          key: ''
        }
      });
    }
  }

  // Delete entries
  deleteItem = (key) => {
    const filtereditems = this.state.items.filter(item => item.key !== key);
    const filteredCompleteitems = this.state.completeList.filter(item => item.key !== key);
    this.setState({
      items: filtereditems,
      completeList: filteredCompleteitems
    })
  }

  // Delete all completed items
  deleteCompleteItem = () => {
    const newList = [...this.state.items];
    this.state.completeList.forEach(citem => {
      const index = newList.findIndex(item => item.key === citem.key)
      console.log("index" + index);
      newList.splice(index, 1);
    })
    this.setState({
      items: newList,
      completeList: []
    })
  }

  // Update Entries
  setUpdate = (text, key) => {
    const items = this.state.items;
    items.map(item => {
      if (item.key === key) {
        item.text = text;
      }
    })
    this.setState({
      items: items
    })
  }

  // All active Completed ?????
  selectStatusChoice = (selectedChoice) => {
    this.setState({
      statusChoice: selectedChoice
    })
  }

  addToCompleteList = (item) => {
    const completeList = [...this.state.completeList, item];
    this.setState({
      completeList: completeList
    })
    console.log(completeList);
  }

  deleteFromCompleteList = (item) => {
    const completedListToBeUpdated = [...this.state.completeList]
    const indexOfCompletedActivity = this.state.completeList.findIndex(i => i.key === item.key)
    completedListToBeUpdated.splice(indexOfCompletedActivity, 1)

    this.setState({ completeList: completedListToBeUpdated })
  }

  handleDragStart = (e) => {
    e.dataTransfer.setData("activity_id", e.target.id)
  }

  handleDragOver = (e) => {
    e.preventDefault();
  }

  handleDrop = (e) => {
    //get the key of activity to be dropped using the e.dataTransfer.getData(key) function
    const activityToBeDropped = e.dataTransfer.getData("activity_id")

    //find index of that activity in the current activity list
    const activityToBeDroppedIndex = this.state.items.findIndex(item => item.key === parseInt(activityToBeDropped))

    //index of activity where we wnat to drop
    const indexToBeDroppedAt = this.state.items.findIndex(item => item.key === parseInt(e.target.id))

    //copy main array in temp variable
    const listToBeUpdated = [...this.state.items]

    // remove activity we want change place of
    const removed = listToBeUpdated.splice(activityToBeDroppedIndex, 1)

    //And then add that activity to the desired index in the activity list
    listToBeUpdated.splice(indexToBeDroppedAt, 0, removed[0])

    this.setState({ items: listToBeUpdated })
  }

  renderList() {
    return this.state.items.map((item) => {
      return (
        <Item
          key={item.key}
          item={item}
          deleteItem={this.deleteItem}
          setUpdate={this.setUpdate}
          statusChoice={this.state.statusChoice}
          addToCompleteList={this.addToCompleteList}
          deleteFromCompleteList={this.deleteFromCompleteList}
          handleDragStart={this.handleDragStart}
          handleDragOver={this.handleDragOver}
          handleDrop={this.handleDrop}
        />
      )
    })
  }

  render() {
    return (
      <div className="App">
        <h1>TO DO</h1>
        <header>
          <form id="to-do-form" onSubmit={this.addItem}>
            <textarea rows="1" placeholder="Enter Text"
              value={this.state.currentItem.text}
              onChange={this.handleInput}
              ref={text => this.text = text} />
            <button type="submit"><FontAwesomeIcon className="faicons" icon='plus'></FontAwesomeIcon></button>
          </form>
        </header>

        <div className="activity-list">
          {this.renderList()}
        </div>

        <Bottom
          statusChoice={this.state.statusChoice}
          selectStatusChoice={this.selectStatusChoice}
          totalItem={this.state.items.length}
          completeItem={this.state.completeList.length}
          deleteCompleteItem={this.deleteCompleteItem} />
        <p className="last">Drag and Drop to reorder List</p>
      </div>
    );
  }
}

export default App;
