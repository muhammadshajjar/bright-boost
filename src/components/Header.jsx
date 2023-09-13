import { useContext } from "react";
import "./Header.css";
import { Avatar, Dropdown } from "antd";
import logo from "../assets/brightbosstlogo.png";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth-context";
//react icons

import { AiOutlineUser, AiOutlineDown } from "react-icons/ai";
import { GrUserAdmin } from "react-icons/gr";
import { CiLogout } from "react-icons/ci";

const Header = () => {
  const { token, logout } = useContext(AuthContext);

  const USERITEMS = [
    {
      key: "1",
      label: <Link to="/admin">Admin</Link>,
      icon: <GrUserAdmin />,
    },
    {
      key: "2",
      label: <button onClick={() => logout()}>Logout</button>,
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
      label: <a href="#">Why Choose us</a>,
    },
    {
      key: "3",
      label: <a href="#">Comments From Students</a>,
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
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <Dropdown
                  menu={{
                    items: INTROITEMS,
                  }}
                >
                  <a>
                    Introduction
                    <AiOutlineDown />
                  </a>
                </Dropdown>
              </li>

              <li>
                <a href="#">Categories</a>
              </li>
              <li>
                <a href="#">Study Resources</a>
              </li>

              <Dropdown
                menu={{
                  items: USERITEMS,
                }}
                trigger={["click"]}
                className="profile"
              >
                <Avatar
                  style={{ backgroundColor: " #fac370" }}
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