import { useActionState } from "react";

function CounterApp() {
  // Step 1: Define the update function for useActionState
  function updateCount(prevCount, actionOrFormData) {
    // Handle different action types to update the count
    if(actionOrFormData instanceof FormData) {
          // If it's a FormData, we need to extract the value
          actionOrFormData = {
            type: "set",
            value: Number(actionOrFormData.get("countValue")),
          };
        }
    const value = actionOrFormData.value;

    switch (actionOrFormData.type) {
      case "increment":
        return prevCount + 1;
      case "decrement":
        return prevCount - 1;
      case "set":
        return value;
      default:
        return prevCount;
    }
  }

  // Step 2: Use useActionState Hook to manage the count state
  const [count, formAction] = useActionState(updateCount, 0);

  return (
    <div>
      <h1>Counter: {count}</h1>

      {/* Step 3: Buttons should call dispatch with the correct action type */}
      <button
        onClick={() => formAction({ type: "increment" })}
      >
        Increment
      </button>

      <button
        onClick={() => formAction({ type: "decrement" })}
      >
        Decrement
      </button>

      {/* Step 4: Form should use the action attribute to update the count */}
      <form
        action={formAction}
      >
        <input type="number" name="countValue" required />
        <button type="submit">Set Count</button>
      </form>
    </div>
  );
}

export default CounterApp;
