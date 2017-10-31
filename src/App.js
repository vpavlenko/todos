import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

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
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {
          this.state.list.map(
            (item, index) => <div>
              <input type="checkbox"  checked={item.is_finished} onClick={
                () => this.setState({list: this.state.list.map(
                  (itemf, indexf) => indexf !== index ? itemf : {
                      "text": itemf.text,
                      "is_finished": !itemf.is_finished
                    }
                  )})
              }/>
              <span style={item.is_finished ? { textDecoration: "line-through" }: {}}>
                {item.text}
              </span>
              <button onClick={
                () => this.setState({list: this.state.list.filter(
                    (e, i) => {return i !== index}
                  )
              })
              }>remove
              </button>
            </div>
          )
        }
        <input type="text" onChange={(evt) => this.setState({value: evt.target.value})} />
        <button onClick={() => this.setState({ list: this.state.list.concat(
          {text: this.state.value, is_finished: false}
        )})}>
            Add new Item
        </button>
      </div>
    );
  }
}

export default App;
