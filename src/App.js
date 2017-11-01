import React, { Component } from 'react';
import './App.css';

import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import Checkbox from 'material-ui/Checkbox';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [{"text": "test sample", "is_finished": false}],
      value: "",
    }
    this.saveTask = this.saveTask.bind(this)
    this._onKeyPress = this._onKeyPress.bind(this)
  }
  _onKeyPress(event) {
    if (event.charCode === 13) { // enter key pressed
      this.saveTask();
      // do something here
    } 
  }
  saveTask() {
    if (this.state.value !== '') {
      this.setState(
        { 
          list: this.state.list.concat(
            {
              text: this.state.value,
              is_finished: false
            }
          ),
          value: ''
        }
      );
    }
  }
  render() {
    return (
      <MuiThemeProvider>
      <div className="App" style={{width: "50%", marginLeft:"25%", position: "absolute"}}>
        {
          this.state.list.map(
            (item, index) => <div style={{display: 'flex', flexDirection: 'row', marginTop: 8}}>
              <Checkbox
                label={item.text}
                style={{
                    width: "80%",
                    verticalAlign: "middle",
                    textAlign: 'left',
                    marginTop: 8,
                }}
                labelStyle={
                  item.is_finished ? 
                  {color: "grey", textDecoration: "line-through"} : 
                  {}
                }
                onClick={() => this.setState({list: this.state.list.map(
                  (itemf, indexf) => indexf !== index ? itemf : {
                    "text": itemf.text,
                    "is_finished": !itemf.is_finished
                  }
                )})}
              />
              <FloatingActionButton 
                style={{marginLeft: 34, height: 40}}
                mini={true}
                secondary={true}
                onClick={
                  () => this.setState({list: this.state.list.filter(
                    (e, i) => {return i !== index}
                  )})
                }
              >
                <ContentRemove />
              </FloatingActionButton>
            </div>
          )
        }
        <div style={{marginTop: 8}}>
          <TextField
            hintText="Wtite your task here"
            onChange={(evt) => this.setState({value: evt.target.value})}
            
            style={{width: "80%"}}
            value={this.state.value}
            onKeyPress={this._onKeyPress}
          />
          <FloatingActionButton 
            style={{marginRight: 20}}
            mini={true}
            onClick={this.saveTask}
          >
            <ContentAdd />
          </FloatingActionButton>
        </div>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
