import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import "./sidebar.css";

const SidebarNav = styled.nav`
  background: #15171c;
  overflow: auto;
  width: 250px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = () => {
  console.log("sidebar");
  return (
    <div className="main">
      <IconContext.Provider value={{ color: "#fff" }}>
        <SidebarNav>
          <SidebarWrap>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
        <div className="mainn">
          <Outlet />
        </div>
      </IconContext.Provider>
    </div>
  );
};

export default Sidebar;
