import { OPERATIONS } from "./Calculator";

function DigitButton({ digit, dispatch }) {
  return (
    <button
      className="digit-button"
      onClick={() =>
        dispatch({ type: OPERATIONS.ADD_DIGIT, payload: { digit } })
      }
    >
      {digit}
    </button>
  );
}

export default DigitButton;
