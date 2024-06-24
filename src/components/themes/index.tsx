import {
  RecoilEnv,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState
} from "recoil";
import { Suspense, lazy, useEffect, useState, useCallback, startTransition } from "react";
import { useRouter } from "next/router";
import { themesSetting } from "@/recoil";
import { screenSize, toggleSidebarMenu } from "../utils";
import {
  LoadingApp,
  addWindowClass,
  calculateWindowSize,
  removeWindowClass,
  useWindowSize
} from "../utils/function";
import { isUserValidated } from "../utils/authHelper";

const Footer = lazy(() => import("./footer"));
const Header = lazy(() => import("./header"));
const Sidebar = lazy(() => import("./sidebar"));

const Layout = ({ children }: any) => {
  const theme = useRecoilValue(themesSetting);
  const screen = useRecoilValue(screenSize);
  const sidebar = useRecoilValue(toggleSidebarMenu);
  const setSizeValue = useSetRecoilState(screenSize);
  const [valueHideSidebar, setHideSidebar] = useRecoilState(toggleSidebarMenu);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const windowSize = useWindowSize();
  const setTheme = useSetRecoilState(themesSetting);

  const handleToggleMenuSidebar = () => {
    setHideSidebar({
      menuSidebarCollapsed: !valueHideSidebar.menuSidebarCollapsed
    });
  };

  useEffect(() => {
    if (!isUserValidated()) {
      router.replace("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    removeWindowClass("sidebar-closed");
    removeWindowClass("sidebar-collapse");
    removeWindowClass("sidebar-open");

    startTransition(() => {
      const size = calculateWindowSize(windowSize.width);
      if (screen.screenSize !== size) {
        setSizeValue({ screenSize: size });
      }

      if (sidebar.menuSidebarCollapsed && screen.screenSize === "lg") {
        addWindowClass("sidebar-collapse");
      } else if (sidebar.menuSidebarCollapsed && screen.screenSize === "xs") {
        addWindowClass("sidebar-open");
      } else if (!sidebar.menuSidebarCollapsed && screen.screenSize !== "lg") {
        addWindowClass("sidebar-closed");
        addWindowClass("sidebar-collapse");
      }

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    });
  }, [windowSize, sidebar.menuSidebarCollapsed, screen.screenSize, setSizeValue]);

  RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

  if (loading) {
    return <LoadingApp />;
  }

  return (
    <Suspense fallback={<LoadingApp />}>
      <div className="wrapper">
        {theme.header && <Header />}
        {theme.sidebar && <Sidebar />}
        {theme.content && children}
        {/* {theme.footer && <Footer />} */}

        <div
          id="sidebar-overlay"
          role="presentation"
          onClick={handleToggleMenuSidebar}
          onKeyDown={() => {}}
        />
      </div>
    </Suspense>
  );
};

export default Layout;
