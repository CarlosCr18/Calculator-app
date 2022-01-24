const items = [
  {
    keyCode: 48,
    keyTrigger: "0",
    id: "zero",
  },
  {
    keyCode: 49,
    keyTrigger: "1",
    id: "one",
  },
  {
    keyCode: 50,
    keyTrigger: "2",
    id: "two",
  },
  {
    keyCode: 51,
    keyTrigger: "3",
    id: "three",
  },
  {
    keyCode: 52,
    keyTrigger: "4",
    id: "four",
  },
  {
    keyCode: 53,
    keyTrigger: "5",
    id: "five",
  },
  {
    keyCode: 54,
    keyTrigger: "6",
    id: "six",
  },
  {
    keyCode: 55,
    keyTrigger: "7",
    id: "seven",
  },
  {
    keyCode: 56,
    keyTrigger: "8",
    id: "eight",
  },
  {
    keyCode: 57,
    keyTrigger: "9",
    id: "nine",
  },
  {
    keyCode: 107,
    keyTrigger: "+",
    id: "add",
  },
  {
    keyCode: 109,
    keyTrigger: "-",
    id: "subtract",
  },
  {
    keyCode: 106,
    keyTrigger: "*",
    id: "multiply",
  },
  {
    keyCode: 111,
    keyTrigger: "/",
    id: "divide",
  },
  {
    keyCode: 13,
    keyTrigger: "=",
    id: "equals",
  },
  {
    keyCode: 8,
    keyTrigger: "Back",
    id: "Back",
  },
  {
    keyCode: 190,
    keyTrigger: ".",
    id: "decimal",
  },
  {
    keyCode: 67,
    keyTrigger: "Clear",
    id: "clear",
  },
];

class Presentational extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      result: 0,
      display: ["0"],
    };
    this.updateTextString = this.updateTextString.bind(this);
  }

  //Function that gets a string and depending on its value it updates the display and result status
  //Funcion que recibe una string y dependiendo del valor actualiza el display y result status
  updateTextString(newD) {
    //check operators sequence
    //Revisar secuencia de oepradores
    if (
      !(
        /[\*|\/|\+]/.test(newD) &&
        /[\*|\/|\+|\-]$/.test(this.state.display.join(""))
      )
    ) {
      if (newD === "Clear") {
        this.setState({
          result: 0,
          display: ["0"],
        });
      } else if (newD === "Back") {
        if (this.state.display.length === 1) {
          this.setState({
            display: ["0"],
            result: 0,
          });
        } else {
          this.setState({
            display: [...this.state.display].slice(0, -1),
            result: 0,
          });
        }
      } else if (newD === "=") {
        //If last character is an operator
        if (/[\/|\*|\+]$/.test(this.state.display.join())) {
          this.setState({
            display: [...this.state.display].slice(0, -1),
          });
        }

        if (
          !/^[\/|\*]|[\/|\*|\+|\-|\.]$/.test(this.state.display.join()) &&
          this.state.display[0] !== undefined
        ) {
          let r = eval(this.state.display.join(""));
          if (r % 1 > 0) {
            r = r.toFixed(8);
          }

          this.setState({
            result: 0,
            display: ["0"],
            result: parseFloat(r),
            display: [parseFloat(r)],
          });
        }
      } else if (newD === ".") {
        let count = (this.state.display.join("").match(/\+|\-|\*|\//g) || [])
          .length;
        if (
          /\./.test([this.state.display].join("").split(/\+|\-|\*|\//)[count])
        ) {
          //alert("last item already has decimal point");
        } else {
          if (this.state.display[0] != "0") {
            this.setState({
              display: [...this.state.display, newD],
            });
          } else {
            this.setState({
              display: [newD],
            });
          }
        }
      } else {
        if (this.state.display[0] != "0") {
          this.setState({
            display: [...this.state.display, newD],
          });
        } else {
          this.setState({
            display: [newD],
          });
        }
      }
    } else {
      //Allowing negative numbers
      if (this.state.display[this.state.display.length - 1] == "-") {
        this.setState({
          display: [...this.state.display.slice(0, -2), newD],
        });
      } else {
        this.setState({
          display: [...this.state.display.slice(0, -1), newD],
        });
      }
    }
  }

  render() {
    return (
      <div id="Calculator">
        <div className="displays">
          <p id="display" className="displays">
            <b>{this.state.display}</b>
          </p>
          <p id="displayNumber" className="displays">
            {this.state.result}
          </p>
        </div>
        <NumPad itemList={items} updateTextString={this.updateTextString} />
      </div>
    );
  }
}

const NumPad = (props) => {
  const items = props.itemList;
  return (
    <div id="calcG" className="calcGrid">
      {items.map((e) => (
        <CalcButton
          key={e.id}
          id={e.id}
          keyTrigger={e.keyTrigger}
          keyCode={e.keyCode}
          updateTextString={props.updateTextString}
        />
      ))}
    </div>
  );
};

class CalcButton extends React.Component {
  constructor(props) {
    super(props);

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.updateText = this.updateText.bind(this);
  }

  //Register key events
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }
  handleKeyPress(e) {
    if (e.keyCode === this.props.keyCode) {
      this.updateText();
    }
  }

  //function to update text and animate keys background when pressed
  updateText() {
    this.props.updateTextString(this.props.keyTrigger);

    document.getElementById(this.props.id).classList.toggle("light");
    setTimeout(
      () => document.getElementById(this.props.id).classList.toggle("light"),
      300
    );
  }

  handleKeyPress(e) {
    if (e.keyCode === this.props.keyCode) {
      this.updateText();
    }
  }

  render() {
    return (
      <button
        id={this.props.id}
        onClick={this.updateText}
        className="calcB multiply"
      >
        {this.props.keyTrigger}
      </button>
    );
  }
}

ReactDOM.render(<Presentational />, document.getElementById("App"));
