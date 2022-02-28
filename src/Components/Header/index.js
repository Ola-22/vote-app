import { Link } from "react-router-dom";
import "./style.css";

export default function Header() {
  return (
    <div className="header">
      <Link to="/">
        <button>
          تصويتات عامة
          <img src="/images/vote.png" alt="" />
        </button>
      </Link>
      <Link to="/">
        <img src="/images/logo.png" alt="" />
      </Link>
    </div>
  );
}
