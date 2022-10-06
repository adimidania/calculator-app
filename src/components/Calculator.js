import { useEffect, useReducer } from "react";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";
import "../styles/components/calculator.scss";
import "../styles/components/buttons.scss";

export const OPERATIONS = {
  ADD_DIGIT: "add-digit",
  REMOVE_DIGIT: "remove-digit",
  SELECT_OPERATION: "select-operation",
  RESET: "reset",
  EQUAL: "evaluate",
};

function reducer(state, { type, payload }) {
  switch (type) {
    // Adding a digit to the screen
    case OPERATIONS.ADD_DIGIT:
      if (state.overwrite)
        return { state, current: payload.digit, overwrite: false };
      if (payload.digit === "0" && state.current === "0") return state;
      if (payload.digit === "." && state.current.includes(".")) return state;
      return {
        ...state,
        current: `${state.current || ""}${payload.digit}`,
      };
    // Clearing the calculator
    case OPERATIONS.RESET:
      return {};
    // Selecting an operation
    case OPERATIONS.SELECT_OPERATION:
      if (state.current == null && state.previous == null) return state;
      if (state.current == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }
      if (state.previous == null) {
        return {
          ...state,
          operation: payload.operation,
          previous: state.current,
          current: null,
        };
      }
      return {
        ...state,
        operation: payload.operation,
        previous: evaluate(state),
        current: null,
      };
    // Evaluating
    case OPERATIONS.EQUAL:
      if (
        state.operation == null ||
        state.current == null ||
        state.previous == null
      ) {
        return state;
      }
      return {
        ...state,
        overwrite: true,
        previous: null,
        operation: null,
        current: evaluate(state),
      };
    // Deleting a digit
    case OPERATIONS.REMOVE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          current: null,
        };
      }
      if (state.current == null) return state;
      if (state.current.length === 1) {
        return { ...state, current: null };
      }
      return {
        ...state,
        current: state.current.slice(0, -1),
      };
    default:
      return { state };
  }
}

function evaluate({ current, previous, operation }) {
  const prev = parseFloat(previous);
  const curr = parseFloat(current);
  const fixNumber = (num) => Number.parseFloat(num.toPrecision(4));
  if (isNaN(prev) || isNaN(curr)) {
    return "";
  }
  let result = "";
  switch (operation) {
    case "+":
      result = fixNumber(prev + curr);
      break;
    case "-":
      result = fixNumber(prev - curr);
      break;
    case "x":
      result = fixNumber(prev * curr);
      break;
    case "÷":
      result = fixNumber(prev / curr);
      break;
    default:
      break;
  }
  result = result.toString();
  return result;
}
function Calculator() {
  const [{ current, previous, operation }, dispatch] = useReducer(reducer, {});
  useEffect(() => {
    document.addEventListener("keydown", detecteKeyDown, true)
    return () => {
      document.removeEventListener("keydown")
    }
  }, [])

  const detecteKeyDown = (e) => {
    e.preventDefault()
    // console.log(e.key)
    const digitsRE = /[0-9]/
    if (digitsRE.test(e.key)) {
      dispatch({ type: OPERATIONS.ADD_DIGIT, payload: { digit: e.key } })
    }
    switch (e.key) {
      case 'Backspace':
        dispatch({ type: OPERATIONS.REMOVE_DIGIT })
        break
      case 'Enter':
        dispatch({ type: OPERATIONS.EQUAL })
        break;
      case ' ':
        dispatch({ type: OPERATIONS.RESET })
        break;
      case '+':
        dispatch({
          type: OPERATIONS.SELECT_OPERATION,
          payload: { operation: '+' },
        })
        break;
      case '-':
        dispatch({
          type: OPERATIONS.SELECT_OPERATION,
          payload: { operation: '-' },
        })
        break;
      case '/':
        dispatch({
          type: OPERATIONS.SELECT_OPERATION,
          payload: { operation: '/' },
        })
        break;
      case '*':
        dispatch({
          type: OPERATIONS.SELECT_OPERATION,
          payload: { operation: 'x' },
        })
        break;
      default:
        break;

    }
  }
  return (
    <div className="calculator-wrapper"

    >
      <div className="screen">
        <div className="previous-op">
          {previous}
          {operation}
        </div>
        <div className="current-op">
          <p>{current}</p>
        </div>
      </div>
      <div
        className="grid-buttons"
      >
        {/* First row */}
        <DigitButton digit="7" dispatch={dispatch} />
        <DigitButton digit="8" dispatch={dispatch} />
        <DigitButton digit="9" dispatch={dispatch} />
        <button
          className="del-button"
          onClick={() => dispatch({ type: OPERATIONS.REMOVE_DIGIT })}
        >
          DEL
        </button>
        {/* Second row */}
        <DigitButton digit="4" dispatch={dispatch} />
        <DigitButton digit="5" dispatch={dispatch} />
        <DigitButton digit="6" dispatch={dispatch} />
        <OperationButton operation="+" dispatch={dispatch} />
        {/* Third row */}
        <DigitButton digit="1" dispatch={dispatch} />
        <DigitButton digit="2" dispatch={dispatch} />
        <DigitButton digit="3" dispatch={dispatch} />
        <OperationButton operation="-" dispatch={dispatch} />
        {/* Fourth row */}
        <DigitButton digit="." dispatch={dispatch} />
        <DigitButton digit="0" dispatch={dispatch} />
        <OperationButton operation="/" dispatch={dispatch} />
        <OperationButton operation="x" dispatch={dispatch} />
        {/* Fourth row */}
        <button
          className="rest-button"
          onClick={() => dispatch({ type: OPERATIONS.RESET })}
        >
          REST
        </button>
        <button
          className="equal-button"
          onClick={() => dispatch({ type: OPERATIONS.EQUAL })}
        >
          =
        </button>
      </div>
    </div>
  );
}

export default Calculator;
