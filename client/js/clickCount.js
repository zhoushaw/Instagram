import React from 'react'

class clickCount extends React.Component {
  constructor(props){
    super(props);
    this.onClickButton = this.onClickButton.bind(this)
    this.state = {count: 0};
  }

  onClickButton() {
    this.setState({count: this.state.count + 1})
  }

  render() {
    return (
      <div>
        <button onClick={this.onClickButton} >click Me</button>
        Click Count: {this.state.count}
      </div>
    )
  }
}

export default clickCount