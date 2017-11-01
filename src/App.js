import React, { Component } from 'react';
import './App.css';

import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';


class App extends Component {
  constructor(props) {
    super(props);
    var state = localStorage.getItem("state");
    if (!state) {
    this.state = {
        list: [{"text": "test sample", "is_finished": false, edited: false}],
        task_value: "",
        filter: {
          complited: true,
          active: true
        },
        search_value: ""
      }
    } else {
      this.state = JSON.parse(state)
    }
    this.saveTask = this.saveTask.bind(this)
    this._onKeyPressAdd = this._onKeyPressAdd.bind(this)
    this.changeTask = this.changeTask.bind(this)
    this._onKeyPressChange = this._onKeyPressChange.bind(this)
    this.setOnResult = this.setOnResult.bind(this)
  }
  setOnResult(item) {
    this.setState(item);
    localStorage.setItem("state", JSON.stringify(this.state))
  }
  _onKeyPressAdd(event) {
    if (event.charCode === 13) { // enter key pressed
      this.saveTask();
      // do something here
    } 
  }
  saveTask() {
    if (this.state.value !== '') {
      this.setOnResult(
        { 
          list: this.state.list.concat(
            {
              text: this.state.task_value,
              is_finished: false,
              edited: false
            }
          ),
          task_value: ''
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
    this.setOnResult(
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
      width: "76.5%",
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
      <div className="App" style={{width: "40%", marginLeft:"30%", position: "absolute"}}>
        <div style={{marginTop: 8, textAlign: "left"}}>
          {
            Object.keys(this.state.filter).map(
              (key) =>
                <Toggle
                  label={key}
                  toggled={this.state.filter[key]}
                  style={{width: "120px", display: "inline-block", marginRight: 40}}
                  labelPosition="right"
                  onClick={() => {
                      const filter = this.state.filter;
                      filter[key] = !filter[key];
                      this.setOnResult({filter: filter});
                      return
                    }
                  }
                />
            )
          }
          <TextField
            hintText="Search"
            onChange={(evt) => this.setOnResult({search_value: evt.target.value})}
            
            style={{width: "20%"}}
            value={this.state.search_value}
          />
        </div>
        <div style={{marginTop: 8}}>
          <TextField
            hintText="Write your task here"
            onChange={(evt) => this.setOnResult({task_value: evt.target.value})}
            
            style={{width: "80%"}}
            value={this.state.task_value}
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
        {
          this.state.list.filter(
            (item) => {
              return (
                this.state.filter.complited && item.is_finished
              ) || (
                this.state.filter.active && !item.is_finished
              ) && (
                this.state.search_value == "" || !item.text.indexOf(
                  this.state.search_value
                )
              )
            }
          ).map(
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
                checked={item.is_finished}
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
                style={{marginLeft: "", height: 40}}
                mini={true}
                secondary={true}
                onClick={
                  () => this.setOnResult({list: this.state.list.filter(
                    (e, i) => {return i !== index}
                  )})
                }
              >
                <ContentRemove />
              </FloatingActionButton>
            </div>
          )
        }
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
