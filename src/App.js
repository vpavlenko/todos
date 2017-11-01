import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off'


const TextFieldExampleSimple = () => (
  <div>
    <TextField
      hintText="Hint Text"
      onChange={(evt) => this.setState({value: evt.target.value})}
    /><br />
  </div>
);


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [{"text": "test sample", "is_finished": false}],
      value: "",
    }
  }
  render() {
    return (
      <MuiThemeProvider>
      <div className="App" style={{width: 500, left: 500, position: "absolute"}}>
        {
          this.state.list.map(
            (item, index) => <div style={{display: 'flex', flexDirection: 'row'}}>
              <Checkbox
                label={item.text}
                style={
                  item.is_finished ? {
                    textDecoration: "line-through",
                    marginBottom: 16,
                    width: "80%"
                  }: {marginBottom: 16, width: "80%"}
                }
                onClick={() => this.setState({list: this.state.list.map(
                  (itemf, indexf) => indexf !== index ? itemf : {
                    "text": itemf.text,
                    "is_finished": !itemf.is_finished
                  }
                )})}
              />
              <FloatingActionButton 
                style={{marginLeft: 20}}
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
        <div>
          <TextField
            hintText="Wtite your task here"
            onChange={(evt) => this.setState({value: evt.target.value})}
            style={{width: "80%"}}
          />
          <FloatingActionButton 
            style={{marginRight: 20}}
            mini={true}
            onClick={() => this.setState(
              { list: this.state.list.concat(
                {text: this.state.value, is_finished: false}
              )}
            )}
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
