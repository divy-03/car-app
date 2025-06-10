import Link from "next/link";
import AISearch from "./ai-search";
import ThemSwitch from "./theme-switch";

const Header = () => {
  return (
    <header className="h-16 flex items-center">
      <Link href={"/"} className="ml-4">
        lOGO
      </Link>

      <AISearch />

      <ThemSwitch />
    </header>
  );
};

export default Header;
