import { useState } from "react";
import { Brand } from "./components/Brand";

const MAIL = "alberto@iberiancaucasus.com";

const SERVICES = [
  ["Listing", "We publish the apartment on Airbnb and Booking.com and keep the text and photos honest."],
  ["Pricing and calendar", "We set the nightly price and which dates stay open."],
  ["Calendar sync", "A night taken on one platform is closed on the other."],
  ["Guests", "We answer guests, from the first question to the day they leave."],
  ["Check-in and check-out", "We coordinate arrival and departure."],
  ["Cleaning and linen", "We coordinate the turnover: cleaning and bed linen."],
  ["Maintenance", "We handle issues and tell you what happened."],
  ["Monthly report", "Bookings, income, expenses, occupancy and issues, once a month."],
];

const REPORT = [
  ["Bookings", "Dates, platform and nights"],
  ["Income", "What the stays paid"],
  ["Expenses", "Cleaning, linen and repairs"],
  ["Occupancy", "Nights that were filled"],
  ["Issues", "What broke, and anything that needs your decision"],
];

const BEDS = ["Studio", "1", "2", "3", "4+"];
const FURNISHED = ["Furnished", "Partly furnished", "Unfurnished"];
const CONDITION = ["Ready to host", "Needs some work", "I'm not sure"];

const EMPTY = {
  name: "",
  email: "",
  phone: "",
  address: "",
  bedrooms: "",
  sqm: "",
  furnished: "",
  condition: "",
  rent: "",
  vacant: false,
};

export default function App() {
  return (
    <>
      <a className="skip" href="#analysis">
        Skip to the analysis
      </a>
      <header className="nav">
        <div className="nav-bar wrap">
          <Brand />
          <nav className="links" aria-label="On this page">
            <a href="#service">Service</a>
            <a href="#reporting">Reporting</a>
            <a href="#analysis">Analysis</a>
          </nav>
          <a className="btn btn-primary btn-small" href="#analysis">
            Free analysis
          </a>
        </div>
      </header>
      <main id="top">
        <Hero />
        <Service />
        <Reporting />
        <Analysis />
      </main>
      <footer className="footer">
        <div className="wrap footer-grid">
          <div>
            <Brand />
            <p>Short and mid-stay apartment management in Tbilisi.</p>
          </div>
          <div>
            <p className="kicker">Contact</p>
            <a href={`mailto:${MAIL}`}>{MAIL}</a>
            <p>iberiancaucasus.com</p>
          </div>
          <div>
            <p className="kicker">Fee</p>
            <p>Management from 20%.</p>
            <p>The analysis names the fee for your apartment before you decide.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

function Hero() {
  return (
    <section className="wrap hero">
      <p className="kicker">Short and mid-stay · Tbilisi</p>
      <h1>We look after your apartment on Airbnb and Booking.</h1>
      <p className="lede">
        Iberian Caucasus manages short and mid-stay rentals for apartment owners in
        Tbilisi. We list it, price it, sync the calendars, talk to guests, and coordinate
        check-in, cleaning and repairs. You keep the apartment.
      </p>
      <p className="fee-line">Management from 20%.</p>
      <a className="btn btn-primary" href="#analysis">
        Request a free analysis
      </a>
    </section>
  );
}

function Service() {
  return (
    <section className="wrap section" id="service">
      <div className="section-head">
        <p className="kicker">The work</p>
        <h2>What we do with the apartment.</h2>
      </div>
      <ol className="service-list">
        {SERVICES.map(([title, text]) => (
          <li key={title}>
            <h3>{title}</h3>
            <p>{text}</p>
          </li>
        ))}
      </ol>
      <div className="steps">
        <article>
          <em>01</em>
          <h3>Send the apartment</h3>
          <p>Address, size, and what it earns today, if it earns anything.</p>
        </article>
        <article>
          <em>02</em>
          <h3>We look, then we talk</h3>
          <p>If short or mid-stay is a poor fit, we say so. The analysis does not oblige you.</p>
        </article>
        <article>
          <em>03</em>
          <h3>Then we run it</h3>
          <p>Listing, guests, turnovers. After the first month, you get a report.</p>
        </article>
      </div>
    </section>
  );
}

function Reporting() {
  return (
    <section className="band" id="reporting">
      <div className="wrap section report-layout">
        <div>
          <p className="kicker">Owner reporting</p>
          <h2>What you receive each month.</h2>
          <p className="lede">
            There is no login yet. After a month with your apartment, you receive a report:
            bookings, income, expenses, occupancy and issues. That is the record of your
            place, written once the month has happened.
          </p>
        </div>
        <article className="report" aria-label="What a monthly report contains">
          <p className="kicker">Monthly report</p>
          <h3>Your apartment in Tbilisi</h3>
          <p className="note">Nothing is filled in until the first month is over.</p>
          <ul>
            {REPORT.map(([label, detail]) => (
              <li key={label}>
                <span>{label}</span>
                <b>{detail}</b>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

function Analysis() {
  const [fields, setFields] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [honey, setHoney] = useState("");

  function set(key, value) {
    setStatus((current) => (current === "sending" ? current : null));
    setFields((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function validate() {
    const next = {};
    if (!fields.name.trim()) next.name = "Add your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) next.email = "Add an email we can reply to.";
    if (!fields.address.trim()) next.address = "Add the address in Tbilisi.";
    if (!fields.bedrooms) next.bedrooms = "Choose the bedrooms.";
    const size = Number(fields.sqm);
    if (!fields.sqm || Number.isNaN(size) || size <= 0) next.sqm = "Add the size in square metres.";
    if (!fields.furnished) next.furnished = "Say how furnished it is.";
    if (!fields.condition) next.condition = "Say what state it is in.";
    if (!fields.vacant) {
      const rent = Number(fields.rent);
      if (!fields.rent || Number.isNaN(rent) || rent < 0) next.rent = "Add the current monthly rent, or mark it as not rented.";
    }
    return next;
  }

  async function submit(event) {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length || status === "sending") return;
    if (honey) {
      setStatus("sent");
      return;
    }
    setStatus("sending");
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(MAIL)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(requestPayload(fields)),
      });
      const data = await response.json().catch(() => ({}));
      const accepted = response.ok && data.success !== false && data.success !== "false";
      setStatus(accepted ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  const rentLabel = fields.vacant
    ? "Not currently rented"
    : fields.rent
      ? `${Number(fields.rent).toLocaleString("en-GB")} GEL`
      : "Not entered";

  return (
    <section className="wrap section" id="analysis">
      <div className="section-head">
        <p className="kicker">Free analysis</p>
        <h2>Tell us about this apartment.</h2>
        <p className="lede">
          We will not answer with a city average. The reply is an estimate for this
          address, after we have looked at it, and it is free. Management starts from 20%.
        </p>
      </div>
      <div className="analysis">
        <form className="form" onSubmit={submit} noValidate aria-busy={status === "sending"}>
          <div className="form-grid">
            <label>
              Name
              <input
                name="name"
                autoComplete="name"
                value={fields.name}
                onChange={(event) => set("name", event.target.value)}
                aria-invalid={Boolean(errors.name)}
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </label>
            <label>
              Email
              <input
                name="email"
                type="email"
                autoComplete="email"
                value={fields.email}
                onChange={(event) => set("email", event.target.value)}
                aria-invalid={Boolean(errors.email)}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </label>
            <label>
              Phone
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                value={fields.phone}
                onChange={(event) => set("phone", event.target.value)}
              />
            </label>
            <label>
              Bedrooms
              <select
                name="bedrooms"
                value={fields.bedrooms}
                onChange={(event) => set("bedrooms", event.target.value)}
                aria-invalid={Boolean(errors.bedrooms)}
              >
                <option value="">Choose</option>
                {BEDS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.bedrooms && <span className="error">{errors.bedrooms}</span>}
            </label>
            <label className="wide">
              Address in Tbilisi
              <input
                name="address"
                autoComplete="street-address"
                value={fields.address}
                onChange={(event) => set("address", event.target.value)}
                aria-invalid={Boolean(errors.address)}
              />
              {errors.address && <span className="error">{errors.address}</span>}
            </label>
            <label>
              Size, m²
              <input
                name="sqm"
                inputMode="decimal"
                value={fields.sqm}
                onChange={(event) => set("sqm", event.target.value)}
                aria-invalid={Boolean(errors.sqm)}
              />
              {errors.sqm && <span className="error">{errors.sqm}</span>}
            </label>
            <label>
              Furnished
              <select
                name="furnished"
                value={fields.furnished}
                onChange={(event) => set("furnished", event.target.value)}
                aria-invalid={Boolean(errors.furnished)}
              >
                <option value="">Choose</option>
                {FURNISHED.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.furnished && <span className="error">{errors.furnished}</span>}
            </label>
            <label className="wide">
              State of the apartment
              <select
                name="condition"
                value={fields.condition}
                onChange={(event) => set("condition", event.target.value)}
                aria-invalid={Boolean(errors.condition)}
              >
                <option value="">Choose</option>
                {CONDITION.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.condition && <span className="error">{errors.condition}</span>}
            </label>
            <label>
              Current monthly rent, GEL
              <input
                name="rent"
                inputMode="decimal"
                value={fields.rent}
                disabled={fields.vacant}
                onChange={(event) => set("rent", event.target.value)}
                aria-invalid={Boolean(errors.rent)}
              />
              {errors.rent && <span className="error">{errors.rent}</span>}
            </label>
            <label className="check">
              <input
                type="checkbox"
                checked={fields.vacant}
                onChange={(event) => {
                  set("vacant", event.target.checked);
                  if (event.target.checked) set("rent", "");
                }}
              />
              Not currently rented
            </label>
          </div>
          <label className="honey" aria-hidden="true">
            Company
            <input
              name="_honey"
              tabIndex={-1}
              autoComplete="off"
              value={honey}
              onChange={(event) => setHoney(event.target.value)}
            />
          </label>
          <button className="btn btn-primary" type="submit" disabled={status === "sending" || status === "sent"}>
            {status === "sending" ? "Sending…" : status === "sent" ? "Request sent" : "Request the free analysis"}
          </button>
          {status === "error" && (
            <p className="error" role="alert">
              The request did not go through. Write to us at <a href={mailtoHref(fields)}>{MAIL}</a> with the same details.
            </p>
          )}
        </form>
        <aside className="summary" aria-live="polite">
          <p className="kicker">{status === "sent" ? "Request sent" : "For the analysis"}</p>
          <p className="figure">{rentLabel}</p>
          <p className="figure-note">
            {fields.vacant
              ? "No monthly rent to set beside a hosting estimate."
              : "Current rent, as you entered it. Not a hosting forecast."}
          </p>
          <ul>
            <li>{fields.address.trim() || "Address not entered"}</li>
            <li>
              {fields.bedrooms ? `${fields.bedrooms} · ` : ""}
              {fields.sqm ? `${fields.sqm} m²` : "Size not entered"}
            </li>
            <li>{[fields.furnished, fields.condition].filter(Boolean).join(" · ") || "Furnishing and state not entered"}</li>
          </ul>
          {status === "sent" ? (
            <p>
              This is a request for an estimate, not the estimate. We have the details and
              will reply to {fields.email.trim()} after we have looked at the apartment.
            </p>
          ) : status === "error" ? (
            <p>
              The request did not go through. Write to us at{" "}
              <a href={mailtoHref(fields)}>{MAIL}</a> with the same details.
            </p>
          ) : (
            <p>
              An income figure here would be a guess. Send the apartment and we will come
              back with an analysis: whether short or mid-stay is worth it, and the fee,
              which starts from 20%.
            </p>
          )}
        </aside>
      </div>
    </section>
  );
}

function requestPayload(fields) {
  const rent = fields.vacant ? "Not currently rented" : `${fields.rent} GEL per month`;
  return {
    name: fields.name.trim(),
    email: fields.email.trim(),
    phone: fields.phone.trim() || "—",
    address: fields.address.trim(),
    bedrooms: fields.bedrooms,
    size: `${fields.sqm} m²`,
    furnished: fields.furnished,
    state: fields.condition,
    current_monthly_rent: rent,
    _subject: `Free apartment analysis — ${fields.address.trim()}`,
    _template: "table",
    _captcha: "false",
    _replyto: fields.email.trim(),
  };
}

function mailtoHref(fields) {
  const rent = fields.vacant ? "Not currently rented" : `${fields.rent} GEL per month`;
  const body = [
    "Free apartment analysis",
    "",
    `Name: ${fields.name.trim()}`,
    `Email: ${fields.email.trim()}`,
    `Phone: ${fields.phone.trim() || "—"}`,
    `Address: ${fields.address.trim()}`,
    `Bedrooms: ${fields.bedrooms}`,
    `Size: ${fields.sqm} m²`,
    `Furnished: ${fields.furnished}`,
    `State: ${fields.condition}`,
    `Current monthly rent: ${rent}`,
    "",
    "This is a request for an analysis, not a booking.",
  ].join("\n");
  const subject = `Free apartment analysis — ${fields.address.trim()}`;
  return `mailto:${MAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
