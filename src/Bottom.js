import React , {Component} from 'react';
import Status from './Status';
import './Bottom.css';

class Bottom extends Component{

    constructor(props){
        super(props);
    }
    
    handleClear= () => {
        this.props.deleteCompleteItem();
    }

    renderNumberOfItemsLeft(){
        return(this.props.totalItem - this.props.completeItem)
    }

    handleAll = () => {
        this.props.selectStatusChoice("All");
    }

    handleActive = () => {
        this.props.selectStatusChoice("Active");
    }

    handleComplete = () => {
        this.props.selectStatusChoice("Complete");
    }

    render(){
    return(
        <div className="bottom">
            <span className="left">{this.renderNumberOfItemsLeft()} {this.renderNumberOfItemsLeft() === 1 ? "item" : "items"}  left</span>
            <div className="status">
                <div>
                <Status statusChoice={this.props.statusChoice} name="All" handleClick={this.handleAll}/>
                </div>
                <div>
                <Status statusChoice={this.props.statusChoice} name="Active" handleClick={this.handleActive}/>
                </div>
                <div>
                <Status statusChoice={this.props.statusChoice} name="Complete" handleClick={this.handleComplete}/>
                </div>
            </div>
            <span className="complete" onClick={this.handleClear}>Clear Completed</span>
        </div>
    );
    }
}

export default Bottom;