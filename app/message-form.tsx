"use client";

import { useActionState } from "react";
import { submitMessage } from "./actions";

const initialState = {
  message: "",
  handledAt: "",
};

async function handleSubmit(_previousState, formData) {
  return submitMessage(formData);
}

export default function MessageForm() {
  const [state, formAction, isPending] = useActionState(handleSubmit, initialState);

  return (
    <section className="panel">
      <form action={formAction} className="form">
        <label htmlFor="message">Message</label>
        <div className="row">
          <input
            id="message"
            name="message"
            placeholder="Type a message for the server"
            autoComplete="off"
          />
          <button type="submit" disabled={isPending}>
            {isPending ? "Sending..." : "Send"}
          </button>
        </div>
      </form>

      {state.handledAt ? (
        <div className="result">
          <span>Server action result</span>
          <strong>{state.message}</strong>
          <code>{state.handledAt}</code>
        </div>
      ) : null}
    </section>
  );
}
