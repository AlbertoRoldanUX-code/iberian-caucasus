export function Mark() {
  return (
    <svg className="brand-mark" viewBox="0 0 32 32" aria-hidden="true">
      <path
        d="M5 27V13.5C5 7.7 9.4 4 16 4s11 3.7 11 9.5V27"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path d="M16 27V15" fill="none" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

export function Brand() {
  return (
    <a className="brand" href="#top">
      <Mark />
      <span>
        <strong>Iberian Caucasus</strong>
        <small>Tbilisi</small>
      </span>
    </a>
  );
}
