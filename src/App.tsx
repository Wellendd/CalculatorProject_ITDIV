import { useState } from "react";
import React from "react";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  useNavigate,
} from "react-router-dom";
import Support from "./support";

function Calculator() {
  const [calc, setCalc] = useState("");
  const [prevAnswer, setPrevAnswer] = useState([]);

  const ops = ["/", "*", "+", "-"];
  const updateCalc = (value: string) => {
    if (
      (ops.includes(value) && calc === "") ||
      (ops.includes(value) && ops.includes(calc.slice(-1)))
    ) {
      return;
    }

    if (calc.length < 3) {
      setCalc(calc + value);
    } else if (calc.length >= 3 && ops.includes(value)) {
      const result = eval(calc).toString();
      setCalc(result + value);
      setPrevAnswer((prev) => [...prev, result]);
    } else {
      setCalc(calc + value);
    }
  };

  const calculate = () => {
    if (calc.length < 3) {
      return;
    }
    const result = eval(calc).toString();

    if (result === "Infinity" || result === "-Infinity") {
      setCalc("Err");
    } else {
      setCalc(result);
      setPrevAnswer((prev) => [...prev, result]);
    }
  };

  const deleteLast = () => {
    if (calc == "") {
      return;
    }

    const value = calc.slice(0, -1);

    setCalc(value);
  };

  const deleteAll = () => {
    setCalc("");
    return;
  };

  const navigate = useNavigate();

  const navigateToSupport = () => {
    navigate("/support");
  };

  return (
    <div className="App">
      <div className="Calculator">
        <div className="display">
          <div className="history">
            {prevAnswer.map((item) => (
              <React.Fragment>
                {item}
                <br />
              </React.Fragment>
            ))}
          </div>
          <div className="results">
            <span>{calc || "0"}</span>
          </div>
        </div>
        <div className="buttons">
          <div className="row">
            <div className="left">
              <button onClick={deleteAll}>C</button>
              <button onClick={deleteLast}>DEL</button>
              <button id="support" onClick={navigateToSupport}>
                ?
              </button>
            </div>

            <div className="right">
              <button id="operators" onClick={() => updateCalc("/")}>
                /
              </button>
            </div>
          </div>

          <div className="row">
            <div className="left">
              <button onClick={() => updateCalc("1")}>1</button>
              <button onClick={() => updateCalc("2")}>2</button>
              <button onClick={() => updateCalc("3")}>3</button>
            </div>
            <div className="right">
              <button id="operators" onClick={() => updateCalc("*")}>
                x
              </button>
            </div>
          </div>

          <div className="row">
            <div className="left">
              <button onClick={() => updateCalc("4")}>4</button>
              <button onClick={() => updateCalc("5")}>5</button>
              <button onClick={() => updateCalc("6")}>6</button>
            </div>
            <div className="right">
              <button id="operators" onClick={() => updateCalc("-")}>
                -
              </button>
            </div>
          </div>

          <div className="row">
            <div className="left">
              <button onClick={() => updateCalc("7")}>7</button>
              <button onClick={() => updateCalc("8")}>8</button>
              <button onClick={() => updateCalc("9")}>9</button>
            </div>
            <div className="right">
              <button id="operators" onClick={() => updateCalc("+")}>
                +
              </button>
            </div>
          </div>

          <div className="lastrow">
            <button onClick={() => updateCalc("0")}>0</button>
            <button id="operators" onClick={calculate}>
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Calculator />} />
          <Route path="/support" element={<Support />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
