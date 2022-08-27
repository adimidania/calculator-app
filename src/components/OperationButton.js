import { OPERATIONS } from "./Calculator";

function OperationButton({ operation, dispatch }) {
  return (
    <button
      className="operation-button"
      onClick={() =>
        dispatch({
          type: OPERATIONS.SELECT_OPERATION,
          payload: { operation },
        })
      }
    >
      {operation}
    </button>
  );
}

export default OperationButton;
