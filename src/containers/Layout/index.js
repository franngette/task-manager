import Header from "../../components/Header";
import SidebarMenu from "../../components/SidebarMenu";
import style from "./style.module.scss";

const Layout = ({ children, title }) => {
  return (
    <div className={style.wrapper}>
      <SidebarMenu />
      <div className={style.container}>
        <Header />
        <div className={style.children}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
