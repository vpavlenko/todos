import React, { Component } from "react";

import ContentAdd from "material-ui/svg-icons/content/add";
import ContentRemove from "material-ui/svg-icons/content/remove";
import { Checkbox, Toggle, TextField, FloatingActionButton } from "material-ui";
import { Draggable, Droppable } from "react-drag-and-drop";

export default class Task extends Component {
  render() {
    const { index, item } = this.props;
    const focusUsernameInputField = input => {
      if (input) {
        setTimeout(() => input.focus(), 100);
      }
    };
    let textFieldInput;
    const textField = (
      <TextField
        style={this.props.makeTaskStyle(item, true)}
        value={item.text}
        ref={field => {
          // debugger;
          textFieldInput = field;
        }}
        onChange={evt =>
          this.props.changeTask({
            text: evt.target.value,
            is_finished: item.is_finished,
            edited: item.edited
          })}
        onKeyPress={event => {
          if (event.charCode === 13) {
            this.props.changeTask({
              text: item.text,
              is_finished: item.is_finished,
              edited: false
            });
          }
        }}
      />
    );

    return (
      <Draggable type="fruit" data="banana">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 8,
            verticalAlign: "middle",
            textAlign: "left"
          }}
        >
          <Checkbox
            style={{
              width: "5%",
              verticalAlign: "middle",
              textAlign: "left",
              marginTop: 8
            }}
            checked={item.is_finished}
            onClick={() =>
              this.props.changeTask({
                text: item.text,
                is_finished: !item.is_finished,
                edited: item.edited
              })}
          />
          <div
            style={this.props.makeTaskStyle(item)}
            onDoubleClick={() => {
              this.props.changeTask({
                text: item.text,
                is_finished: item.is_finished,
                edited: true
              });
              // TODO: make it work.
              // textFieldInput.focus();
            }}
          >
            {item.text}
          </div>
          {textField}
          <FloatingActionButton
            style={{ marginLeft: "", height: 40 }}
            mini={true}
            secondary={true}
            onClick={this.props.removeTask}
          >
            <ContentRemove />
          </FloatingActionButton>
        </div>
      </Draggable>
    );
  }
}
