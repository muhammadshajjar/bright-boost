import { useContext } from "react";
import "./Header.css";
import { Avatar, Dropdown } from "antd";
import logo from "../assets/brightbosstlogo.png";
import { Link, useLocation } from "react-router-dom";

import { AuthContext } from "../context/auth-context";
//react icons

import { AiOutlineUser, AiOutlineDown } from "react-icons/ai";
import { GrUserAdmin } from "react-icons/gr";
import { CiLogout } from "react-icons/ci";

const Header = () => {
  const { token, logout, role } = useContext(AuthContext);

  const { pathname } = useLocation();

  const USERITEMS = [
    {
      key: "1",
      label: <Link to="/admin">Admin</Link>,
      icon: <GrUserAdmin />,
    },
    {
      key: "2",
      label: (
        <button
          onClick={() => {
            logout();
            console.log("Clicked on logout!!");
          }}
        >
          Logout
        </button>
      ),
      icon: <CiLogout />,
    },
  ];

  const INTROITEMS = [
    {
      key: "1",
      label: <a href="#">Tutor Profile</a>,
    },
    {
      key: "2",
      label: <a href="#why-us">Why Choose us</a>,
    },
    {
      key: "3",
      label: <a href="#students-comment">Comments From Students</a>,
    },
  ];
  return (
    <header>
      <div className="container header-container">
        <div>
          <a href="#">
            <img className="logo" src={logo} alt="bright bosst logo" />
          </a>
        </div>
        {token && (
          <nav>
            <ul className="header-nav">
              {pathname !== "/admin" && pathname !== "/discussion-fourm" && (
                <>
                  <li>
                    <a href="#">Home</a>
                  </li>
                  <li>
                    <Dropdown
                      menu={{
                        items: INTROITEMS,
                      }}
                      trigger={["hover"]}
                    >
                      <a>
                        Introduction
                        <AiOutlineDown />
                      </a>
                    </Dropdown>
                  </li>

                  <li>
                    <a href="#categories">Categories</a>
                  </li>
                  <li>
                    <a href="#resources">Study Resources</a>
                  </li>
                </>
              )}

              <Dropdown
                menu={{
                  items:
                    role === "admin"
                      ? USERITEMS
                      : USERITEMS.filter((item) => item.key !== "1"),
                }}
                trigger={["click"]}
                className="user-profile"
              >
                <Avatar
                  style={{ backgroundColor: "#ffb84d" }}
                  icon={<AiOutlineUser />}
                  size="large"
                />
              </Dropdown>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
