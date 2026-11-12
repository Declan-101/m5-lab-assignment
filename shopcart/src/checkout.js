import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { prepareFacebookLogin, signInWithFacebook } from "./facebookLogin";

function SignIn({ onSignIn }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ready, setReady] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    prepareFacebookLogin()
      .then(() => { if (active) setReady(true); })
      .catch(reason => { if (active) setError(reason.message); });
    return () => { active = false; };
  }, []);

  function handleLocalLogin(event) {
    event.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError("Please enter your name.");
      return;
    }
    onSignIn({ name: trimmedName, email: email.trim(), provider: "Classroom form" });
  }

  async function handleFacebookLogin() {
    setPending(true);
    setError("");
    try {
      onSignIn(await signInWithFacebook());
    } catch (reason) {
      setError(reason.message);
      setPending(false);
    }
  }

  return (
    <section className="card checkout-card">
      <div className="card-header"><h2 className="mb-0">Sign In</h2></div>
      <div className="card-body">
        <p>Please login using one of the following:</p>
        <form className="class-login-form" onSubmit={handleLocalLogin}>
          <label className="form-label" htmlFor="customer-name">Name</label>
          <input className="form-control mb-3" id="customer-name" autoComplete="name"
            placeholder="Your name" required value={name}
            onChange={event => setName(event.target.value)} />
          <label className="form-label" htmlFor="customer-email">Email</label>
          <input className="form-control mb-3" id="customer-email" type="email"
            placeholder="Your email" autoComplete="email" required value={email}
            onChange={event => setEmail(event.target.value)} />
          <button className="btn btn-success" type="submit">Login</button>
        </form>
        {error && <p role="alert" className="text-danger mt-3">{error}</p>}
        <button className="btn btn-primary mt-4" type="button"
          disabled={!ready || pending} onClick={handleFacebookLogin}>
          {pending ? "Connecting to Facebook…" : "Login with Facebook"}
        </button>
      </div>
    </section>
  );
}

export default function Checkout({ total, customer, onSignIn }) {
  if (total === 0) return <Navigate to="/cart" replace />;

  return (
    <main className="container my-4">
      {customer ? (
        <section className="card checkout-card">
          <div className="card-header"><h2 className="mb-0">Check Out</h2></div>
          <div className="card-body">
            <div className="d-flex align-items-center gap-3 mb-4">
              {customer.picture && <img className="customer-picture" src={customer.picture}
                alt="" referrerPolicy="no-referrer" />}
              <h3 className="h5 text-success mb-0">Welcome Back {customer.name}!</h3>
            </div>
            <p>Time to check out?</p>
            <p>You have {total} {total === 1 ? "item" : "items"} in your cart.</p>
            <Link to="/cart" className="btn btn-outline-secondary">Back to Cart</Link>
          </div>
        </section>
      ) : <SignIn onSignIn={onSignIn} />}
    </main>
  );
}
