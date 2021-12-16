import React,{Component} from "react";

class Status extends Component{
    // constructor
    render(){
        console.log(this.props.statusChoice,this.props.name)
    return(
        <span onClick={this.props.handleClick}  style={{color: this.props.statusChoice === this.props.name ? "#fff" : "#c77dff"}}>
            {this.props.name}
        </span>
    );
    }
}

export default Status;