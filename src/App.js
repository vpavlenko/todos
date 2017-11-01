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
      list: [{"text": "test sample", "is_finished": false, edited: false}],
      value: "",
    }
    this.saveTask = this.saveTask.bind(this)
    this._onKeyPressAdd = this._onKeyPressAdd.bind(this)
    this.changeTask = this.changeTask.bind(this)
    this._onKeyPressChange = this._onKeyPressChange.bind(this)
  }
  _onKeyPressAdd(event) {
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
              is_finished: false,
              edited: false
            }
          ),
          value: ''
        }
      );
    }
  }
  _onKeyPressChange(event, item, index) {
    if (event.charCode === 13) { // enter key pressed
      this.changeTask(item, index);
      // do something here
    } 
  }
  changeTask(item, index) {
    this.setState(
      {
        list: this.state.list.map(
          (itemf, indexf) => indexf !== index ? itemf : {
            text: item.text,
            is_finished: item.is_finished,
            edited: item.edited
          }
        )
      }
    )
  }
  makeTaskStyle(item, is_textedit=false) {
    var res = {
      display: is_textedit ?  "None": "inline-block",
      width: "73.6%",
      verticalAlign: "middle",
    };
    if (item.is_finished) {
      res.color = "grey";
      res.textDecoration = "line-through";
    };
    if (item.edited) {
      res.display = is_textedit ?  "inline-block" : "None";
      res.height = "auto";
    } else {
      res.display = is_textedit ?  "None": "inline-block";
      res.marginTop = 8;
      res.paddingTop = 3;
    };
    return res
  }
  render() {
    return (
      <MuiThemeProvider>
      <div className="App" style={{width: "50%", marginLeft:"25%", position: "absolute"}}>
        {
          this.state.list.map(
            (item, index) => <div style={
              {
                display: 'flex',
                flexDirection: 'row',
                marginTop: 8,
                verticalAlign: "middle",
                textAlign: 'left'
              }
            }>
              <Checkbox
                style={{
                    width: "5%",
                    verticalAlign: "middle",
                    textAlign: 'left',
                    marginTop: 8,
                }}
                onClick={() => this.changeTask(
                  {
                    text: item.text,
                    is_finished: !item.is_finished,
                    edited: item.edited
                  },
                  index
                )}
              />
              <div
                style={this.makeTaskStyle(item)}
                onDoubleClick={() => this.changeTask(
                  {
                    text: item.text,
                    is_finished: item.is_finished,
                    edited: true
                  },
                  index
                )}
              >
                {item.text}
              </div>
              <TextField 
                style={this.makeTaskStyle(item, true)}
                value={item.text}
                onChange={(evt) => this.changeTask(
                  {
                    text: evt.target.value,
                    is_finished: item.is_finished,
                    edited: item.edited
                  },
                  index
                )}
                onKeyPress={(evt) => this._onKeyPressChange(
                  evt,
                  {
                    text: item.text,
                    is_finished: item.is_finished,
                    edited: false
                  },
                  index
                )}
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
            onKeyPress={this._onKeyPressAdd}
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
