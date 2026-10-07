import { useEffect, useRef, useState } from "react";
import { Brand } from "./components/Brand";
import { copy } from "./copy";
import { useI18n } from "./i18n";

const MAIL = "alberto@iberiancaucasus.com";
const FORMSUBMIT = "9bc1fdb2cb99786bdb702f84ab4e38c9";

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
  notes: "",
};

export default function App() {
  const { t } = useI18n();
  const [view, setView] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef(null);

  useEffect(() => {
    function onResize() {
      if (window.innerWidth > 1040) setMenuOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  function onNavKeyDown(event) {
    if (event.key === "Escape" && menuOpen) {
      setMenuOpen(false);
      menuButton.current?.focus();
    }
  }

  function openSection(hash) {
    return (event) => {
      closeMenu();
      if (view === "home") return;
      event.preventDefault();
      setView("home");
      const path = window.location.pathname + window.location.search;
      history.replaceState(null, "", !hash || hash === "#top" ? path : hash);
      window.setTimeout(() => {
        if (!hash || hash === "#top") {
          window.scrollTo(0, 0);
          return;
        }
        document.querySelector(hash)?.scrollIntoView();
      }, 0);
    };
  }

  function openLogin(event) {
    event.preventDefault();
    closeMenu();
    setView("login");
    window.scrollTo(0, 0);
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }

  return (
    <>
      <a className="skip" href={view === "login" ? "#login" : "#analysis"}>
        {view === "login" ? t.skipLogin : t.skip}
      </a>
      <header className={menuOpen ? "nav is-open" : "nav"} onKeyDown={onNavKeyDown}>
        <div className="nav-bar wrap">
          <Brand onClick={openSection("#top")} />
          <nav className="links" id="site-nav" aria-label={t.onThisPage}>
            {t.nav.map(([href, label]) => (
              <a key={href} href={href} onClick={openSection(href)}>
                {label}
              </a>
            ))}
          </nav>
          <div className="nav-actions">
            <LanguageSwitch />
            <button
              ref={menuButton}
              className="menu-btn"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="site-nav"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? t.close : t.menu}
            </button>
            <a
              className="btn btn-line btn-small"
              href="#login"
              aria-current={view === "login" ? "page" : undefined}
              onClick={openLogin}
            >
              {t.navLogin}
            </a>
            <a className="btn btn-primary btn-small" href="#analysis" onClick={openSection("#analysis")}>
              {t.navCta}
            </a>
          </div>
        </div>
      </header>
      <main id="top">
        {view === "login" ? (
          <Login />
        ) : (
          <>
            <Hero />
            <Benefits />
            <Service />
            <Process />
            <Pricing />
            <Reporting onLogin={openLogin} />
            <Contact />
            <Analysis />
          </>
        )}
      </main>
      <footer className="footer">
        <div className="wrap footer-grid">
          <div>
            <Brand onClick={openSection("#top")} />
            <p>{t.footer.blurb}</p>
          </div>
          <div>
            <p className="kicker">{t.onThisPage}</p>
            {t.nav.map(([href, label]) => (
              <a key={href} href={href} onClick={openSection(href)}>
                {label}
              </a>
            ))}
          </div>
          <div>
            <p className="kicker">{t.contact.kicker}</p>
            <a href={`mailto:${MAIL}`}>{MAIL}</a>
            <p>{t.footer.reply}</p>
          </div>
          <div>
            <p className="kicker">{t.footer.fee}</p>
            <p>{t.footer.feeLine}</p>
            <p>{t.footer.feeNote}</p>
          </div>
        </div>
      </footer>
    </>
  );
}

function LanguageSwitch() {
  const { lang, setLang, t } = useI18n();
  return (
    <div className="lang-switch" role="group" aria-label={t.languageLabel}>
      <button type="button" lang="en" aria-pressed={lang === "en"} onClick={() => setLang("en")}>
        EN
      </button>
      <button type="button" lang="ka" aria-pressed={lang === "ka"} onClick={() => setLang("ka")}>
        ქარ
      </button>
    </div>
  );
}

function Hero() {
  const { t } = useI18n();
  return (
    <section className="wrap hero">
      <div className="hero-grid">
        <div className="hero-intro">
          <p className="kicker">{t.hero.kicker}</p>
          <h1>{t.hero.title}</h1>
        </div>
        <figure className="hero-figure">
          <div className="hero-frame">
            <BalconyPlate />
          </div>
          <figcaption>
            <span>{t.hero.illustrative}</span>
            {t.hero.caption}
          </figcaption>
        </figure>
        <div className="hero-actions">
          <p className="lede">{t.hero.lede}</p>
          <p className="fee-line">{t.hero.fee}</p>
          <a className="btn btn-primary" href="#analysis">
            {t.hero.cta}
          </a>
        </div>
      </div>
    </section>
  );
}

function BalconyPlate() {
  return (
    <svg className="plate" viewBox="0 0 480 600" aria-hidden="true">
      <rect width="480" height="600" fill="#e4ddd0" />
      <rect x="40" y="40" width="400" height="520" fill="#f7f3ec" />
      <rect x="116" y="88" width="248" height="300" fill="#d5e0da" />
      <path
        fill="#14352e"
        opacity="0.2"
        d="M116 236c42-36 78 10 124-6 38-14 74 10 124-16v174H116V236z"
      />
      <path
        fill="#14352e"
        opacity="0.42"
        d="M116 300c34 24 72-16 122 4 42 16 70-8 126 14v68H116V300z"
      />
      <path
        fill="none"
        stroke="#14352e"
        strokeWidth="1.6"
        d="M116 88h248v300H116zM240 88v300M116 238h248"
      />
      <path
        fill="none"
        stroke="#14352e"
        strokeWidth="1.7"
        d="M92 404h296M108 404v52M372 404v52M156 404v38M204 404v38M252 404v38M300 404v38M108 456h264"
      />
      <path fill="none" stroke="#14352e" strokeWidth="1.2" opacity="0.45" d="M40 500h400" />
    </svg>
  );
}

function Benefits() {
  const { t } = useI18n();
  return (
    <section className="wrap section benefits">
      <div className="section-head">
        <p className="kicker">{t.benefits.kicker}</p>
        <h2>{t.benefits.title}</h2>
      </div>
      <div className="benefit-grid">
        {t.benefits.items.map(([title, text]) => (
          <article key={title}>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Service() {
  const { t } = useI18n();
  return (
    <section className="wrap section" id="service">
      <div className="section-head">
        <p className="kicker">{t.service.kicker}</p>
        <h2>{t.service.title}</h2>
      </div>
      <div className="service-groups">
        {t.service.groups.map((group) => (
          <article key={group.title}>
            <h3>{group.title}</h3>
            <ul>
              {group.items.map(([title, text]) => (
                <li key={title}>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function Process() {
  const { t } = useI18n();
  return (
    <section className="wrap section" id="process">
      <div className="section-head">
        <p className="kicker">{t.process.kicker}</p>
        <h2>{t.process.title}</h2>
      </div>
      <div className="steps">
        {t.process.steps.map(([title, text], index) => (
          <article key={title}>
            <em>{String(index + 1).padStart(2, "0")}</em>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Pricing() {
  const { t } = useI18n();
  return (
    <section className="wrap section" id="pricing">
      <div className="section-head">
        <p className="kicker">{t.pricing.kicker}</p>
        <h2>{t.pricing.title}</h2>
      </div>
      <div className="price-layout">
        <p className="price-figure">
          <small>{t.pricing.from}</small>
          20%
        </p>
        <div>
          <p>{t.pricing.one}</p>
          <p>{t.pricing.two}</p>
        </div>
      </div>
    </section>
  );
}

function Reporting({ onLogin }) {
  const { t } = useI18n();
  return (
    <section className="band" id="reporting">
      <div className="wrap section report-layout">
        <div>
          <p className="kicker">{t.reporting.kicker}</p>
          <h2>{t.reporting.title}</h2>
          <p className="lede">{t.reporting.lede}</p>
          <a className="btn btn-line" href="#login" onClick={onLogin}>
            {t.reporting.login}
          </a>
        </div>
        <article className="dashboard" aria-label={t.reporting.sampleAria}>
          <p className="sample-flag">{t.reporting.sampleFlag}</p>
          <h3>{t.reporting.sampleTitle}</h3>
          <p className="note">{t.reporting.sampleNote}</p>
          <dl>
            {t.reporting.rows.map(([label, value, payout]) => (
              <div key={label} className={payout ? "payout" : undefined}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </article>
      </div>
    </section>
  );
}

function Login() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  function submit(event) {
    event.preventDefault();
    const next = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = t.login.emailError;
    if (!password) next.password = t.login.passwordError;
    setErrors(next);
  }

  return (
    <section className="wrap section login" id="login">
      <div className="login-layout">
        <div>
          <p className="kicker">{t.login.kicker}</p>
          <h1>{t.login.title}</h1>
          <p className="lede">{t.login.lede}</p>
          <form className="form" onSubmit={submit} noValidate>
            <div className="form-grid">
              <label className="wide">
                {t.login.email}
                <input
                  name="email"
                  type="email"
                  autoComplete="username"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setErrors((current) => ({ ...current, email: undefined }));
                  }}
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </label>
              <label className="wide">
                {t.login.password}
                <input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setErrors((current) => ({ ...current, password: undefined }));
                  }}
                  aria-invalid={Boolean(errors.password)}
                />
                {errors.password && <span className="error">{errors.password}</span>}
              </label>
            </div>
            <button className="btn btn-primary" type="submit">
              {t.login.submit}
            </button>
          </form>
        </div>
        <aside className="signup">
          <p className="kicker">{t.signup.kicker}</p>
          <h2>{t.signup.title}</h2>
          <p>{t.signup.lede}</p>
          <a className="signup-mail" href={`mailto:${MAIL}?subject=${encodeURIComponent(t.signup.subject)}`}>
            {MAIL}
          </a>
        </aside>
      </div>
    </section>
  );
}

function Contact() {
  const { t } = useI18n();
  return (
    <section className="wrap section" id="contact">
      <div className="founder">
        <figure className="portrait">
          <div className="portrait-frame" aria-hidden="true">
            <span>AR</span>
          </div>
          <figcaption>{t.contact.portrait}</figcaption>
        </figure>
        <div>
          <p className="kicker">{t.contact.kicker}</p>
          <h2>{t.contact.name}</h2>
          <p className="lede">{t.contact.lede}</p>
          <a className="contact-mail" href={`mailto:${MAIL}`}>
            {MAIL}
          </a>
        </div>
      </div>
      <div className="trust-block">
        <p>{t.contact.trustLead}</p>
        <ul className="trust">
          {t.contact.trust.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Analysis() {
  const { lang, t } = useI18n();
  const [fields, setFields] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [honey, setHoney] = useState("");

  function set(key, value) {
    setStatus((current) => (current === "sending" ? current : null));
    setFields((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined, contact: undefined }));
  }

  function validate() {
    const next = {};
    const email = fields.email.trim();
    const phone = fields.phone.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const phoneOk = phone.replace(/\D/g, "").length >= 6;

    if (!fields.name.trim()) next.name = "name";
    if (email && !emailOk) next.email = "email";
    if (phone && !phoneOk) next.phone = "phone";
    if (!emailOk && !phoneOk && !next.email && !next.phone) next.contact = "contact";
    if (!fields.address.trim()) next.address = "address";
    if (!fields.bedrooms) next.bedrooms = "bedrooms";
    if (fields.sqm.trim()) {
      const size = Number(fields.sqm);
      if (Number.isNaN(size) || size <= 0) next.sqm = "sqm";
    }
    if (!fields.vacant && fields.rent.trim()) {
      const rent = Number(fields.rent);
      if (Number.isNaN(rent) || rent < 0) next.rent = "rent";
    }
    return next;
  }

  async function submit(event) {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) {
      const first = ["name", "email", "phone", "contact", "address", "bedrooms", "sqm", "rent"].find(
        (key) => next[key]
      );
      const name = first === "contact" ? "email" : first;
      event.currentTarget.querySelector(`[name="${name}"]`)?.focus();
      return;
    }
    if (status === "sending") return;
    if (honey) {
      setStatus("sent");
      return;
    }
    setStatus("sending");
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${FORMSUBMIT}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(requestPayload(fields, lang)),
      });
      const data = await response.json().catch(() => ({}));
      const accepted = response.ok && data.success !== false && data.success !== "false";
      setStatus(accepted ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  const rentShown = fields.vacant || fields.rent.trim();
  const rentAmount = Number(fields.rent);
  const rentLabel = fields.vacant
    ? t.analysis.notRented
    : fields.rent.trim() && !Number.isNaN(rentAmount)
      ? `${rentAmount.toLocaleString(lang === "ka" ? "ka" : "en-GB")} ${t.currency}`
      : t.summary.noRent;

  const replyAt = fields.email.trim() || fields.phone.trim();
  const bedroomLabel = optionLabel(t.beds, fields.bedrooms);
  const detailLine = [optionLabel(t.furnished, fields.furnished), optionLabel(t.condition, fields.condition)]
    .filter(Boolean)
    .join(" · ");

  return (
    <section className="wrap section" id="analysis">
      <div className="section-head">
        <p className="kicker">{t.analysis.kicker}</p>
        <h2>{t.analysis.title}</h2>
        <p className="lede">{t.analysis.lede}</p>
      </div>
      <div className="analysis">
        <form className="form" onSubmit={submit} noValidate aria-busy={status === "sending"}>
          <p className="form-hint" id="contact-hint">
            {t.analysis.hint}
          </p>
          <div className="form-grid">
            <label className="wide">
              {t.analysis.name}
              <input
                name="name"
                autoComplete="name"
                required
                value={fields.name}
                onChange={(event) => set("name", event.target.value)}
                aria-invalid={Boolean(errors.name)}
              />
              {errors.name && <span className="error">{t.errors[errors.name]}</span>}
            </label>
            <label>
              {t.analysis.email}
              <input
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                value={fields.email}
                onChange={(event) => set("email", event.target.value)}
                aria-invalid={Boolean(errors.email || errors.contact)}
                aria-describedby="contact-hint"
              />
              {errors.email && <span className="error">{t.errors[errors.email]}</span>}
            </label>
            <label>
              {t.analysis.phone}
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                value={fields.phone}
                onChange={(event) => set("phone", event.target.value)}
                aria-invalid={Boolean(errors.phone || errors.contact)}
                aria-describedby="contact-hint"
              />
              {errors.phone && <span className="error">{t.errors[errors.phone]}</span>}
            </label>
            {errors.contact && (
              <p className="error span-error" role="alert">
                {t.errors[errors.contact]}
              </p>
            )}
            <label className="wide">
              {t.analysis.address}
              <input
                name="address"
                autoComplete="street-address"
                required
                value={fields.address}
                onChange={(event) => set("address", event.target.value)}
                aria-invalid={Boolean(errors.address)}
              />
              {errors.address && <span className="error">{t.errors[errors.address]}</span>}
            </label>
            <label className="wide">
              {t.analysis.bedrooms}
              <select
                name="bedrooms"
                required
                value={fields.bedrooms}
                onChange={(event) => set("bedrooms", event.target.value)}
                aria-invalid={Boolean(errors.bedrooms)}
              >
                <option value="">{t.analysis.choose}</option>
                {t.beds.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              {errors.bedrooms && <span className="error">{t.errors[errors.bedrooms]}</span>}
            </label>
            <p className="optional-rule">{t.analysis.optional}</p>
            <label>
              {t.analysis.size}
              <input
                name="sqm"
                inputMode="decimal"
                value={fields.sqm}
                onChange={(event) => set("sqm", event.target.value)}
                aria-invalid={Boolean(errors.sqm)}
              />
              {errors.sqm && <span className="error">{t.errors[errors.sqm]}</span>}
            </label>
            <label>
              {t.analysis.furnished}
              <select
                name="furnished"
                value={fields.furnished}
                onChange={(event) => set("furnished", event.target.value)}
              >
                <option value="">{t.analysis.choose}</option>
                {t.furnished.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <label className="wide">
              {t.analysis.condition}
              <select
                name="condition"
                value={fields.condition}
                onChange={(event) => set("condition", event.target.value)}
              >
                <option value="">{t.analysis.choose}</option>
                {t.condition.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              {t.analysis.rent}
              <input
                name="rent"
                inputMode="decimal"
                value={fields.rent}
                disabled={fields.vacant}
                onChange={(event) => set("rent", event.target.value)}
                aria-invalid={Boolean(errors.rent)}
              />
              {errors.rent && <span className="error">{t.errors[errors.rent]}</span>}
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
              {t.analysis.notRented}
            </label>
            <label className="wide">
              {t.analysis.notes}
              <textarea
                name="notes"
                rows={4}
                maxLength={2000}
                value={fields.notes}
                onChange={(event) => set("notes", event.target.value)}
              />
            </label>
          </div>
          <label className="honey" aria-hidden="true">
            {t.analysis.company}
            <input
              name="_honey"
              tabIndex={-1}
              autoComplete="off"
              value={honey}
              onChange={(event) => setHoney(event.target.value)}
            />
          </label>
          <button className="btn btn-primary" type="submit" disabled={status === "sending" || status === "sent"}>
            {status === "sending" ? t.analysis.sending : status === "sent" ? t.analysis.sent : t.analysis.submit}
          </button>
          {status === "error" && (
            <p className="error" role="alert">
              {t.analysis.errorLead} <a href={mailtoHref(fields, t)}>{MAIL}</a>
              {t.analysis.errorTail ? ` ${t.analysis.errorTail}` : ""}
            </p>
          )}
        </form>
        <aside className="summary" aria-live="polite">
          <p className="kicker">{status === "sent" ? t.analysis.sent : t.summary.forAnalysis}</p>
          <p className={rentShown ? "figure" : "figure figure-empty"}>{rentLabel}</p>
          <p className="figure-note">{fields.vacant ? t.summary.vacantNote : t.summary.rentNote}</p>
          <ul>
            <li>{fields.address.trim() || t.summary.locationMissing}</li>
            <li>
              {bedroomLabel ? `${bedroomLabel} · ` : ""}
              {fields.sqm ? `${fields.sqm} m²` : t.summary.sizeMissing}
            </li>
            <li>{detailLine || t.summary.detailsMissing}</li>
          </ul>
          {status === "sent" ? (
            <p>
              {t.summary.sentBefore} {replyAt}
              {t.summary.sentAfter ? ` ${t.summary.sentAfter}` : ""}
            </p>
          ) : status === "error" ? (
            <p>
              {t.analysis.errorLead} <a href={mailtoHref(fields, t)}>{MAIL}</a>
              {t.analysis.errorTail ? ` ${t.analysis.errorTail}` : ""}
            </p>
          ) : (
            <p>{t.summary.idle}</p>
          )}
        </aside>
      </div>
    </section>
  );
}

function optionLabel(options, value) {
  return options.find(([option]) => option === value)?.[1] || "";
}

function rentLine(fields, mail) {
  if (fields.vacant) return mail.notRented;
  if (!fields.rent.trim()) return mail.empty;
  return `${fields.rent.trim()} ${mail.perMonth}`;
}

function requestPayload(fields, lang) {
  const mail = copy.en.mail;
  const payload = {
    name: fields.name.trim(),
    email: fields.email.trim() || mail.empty,
    phone: fields.phone.trim() || mail.empty,
    address: fields.address.trim(),
    bedrooms: fields.bedrooms,
    size: fields.sqm.trim() ? `${fields.sqm.trim()} m²` : mail.empty,
    furnished: fields.furnished || mail.empty,
    state: fields.condition || mail.empty,
    current_monthly_rent: rentLine(fields, mail),
    notes: fields.notes.trim() || mail.empty,
    language: copy[lang].mail.language,
    _subject: mail.subject(fields.address.trim()),
    _template: "table",
    _captcha: "false",
  };
  if (fields.email.trim()) payload._replyto = fields.email.trim();
  return payload;
}

function mailtoHref(fields, t) {
  const mail = t.mail;
  const body = [
    mail.intro,
    "",
    `${mail.name}: ${fields.name.trim()}`,
    `${mail.email}: ${fields.email.trim() || mail.empty}`,
    `${mail.phone}: ${fields.phone.trim() || mail.empty}`,
    `${mail.address}: ${fields.address.trim()}`,
    `${mail.bedrooms}: ${optionLabel(t.beds, fields.bedrooms) || fields.bedrooms}`,
    `${mail.size}: ${fields.sqm.trim() ? `${fields.sqm.trim()} m²` : mail.empty}`,
    `${mail.furnished}: ${optionLabel(t.furnished, fields.furnished) || mail.empty}`,
    `${mail.condition}: ${optionLabel(t.condition, fields.condition) || mail.empty}`,
    `${mail.rent}: ${rentLine(fields, mail)}`,
    `${mail.notes}: ${fields.notes.trim() || mail.empty}`,
    "",
    mail.closing,
  ].join("\n");
  return `mailto:${MAIL}?subject=${encodeURIComponent(mail.subject(fields.address.trim()))}&body=${encodeURIComponent(body)}`;
}
