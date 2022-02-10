import "./style.css";

export default function Header() {
  return (
    <div className="header">
      <img src="/images/logo.png" alt="" />
      <button>
        تصويتات عامة
        <img src="/images/vote.png" alt="" />
      </button>
    </div>
  );
}
