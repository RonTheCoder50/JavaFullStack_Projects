import { useState } from "react";
import { FiMoon } from "react-icons/fi";
import {
  MdOutlineWbSunny,
  MdOutlineClear,
  MdOutlineDashboard,
  MdOutlineHistory,
  MdOutlinePriceCheck,
} from "react-icons/md";

import { RxHamburgerMenu } from "react-icons/rx";
import { FaRegUser } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { useTheme } from "./theme";

export default function UserNavbar({ status, handleStatus }) {
  const { theme, toggleTheme } = useTheme();
  const [sideToggle, isSideToggle] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  function toggleSideBar() {
    isSideToggle(!sideToggle);
  }

  return (
    <>
      <nav
        className={`
                md:hidden
                w-full 
                max-w-[90%] 
                xl:max-w-[80%] 
                mx-auto 
                flex 
                items-center 
                justify-between 
                rounded-lg 
                m-4 
                py-4 
                text-base 
                shadow-md 
                border 
                px-7 
                ${theme === "light" ? "bg-white" : "bg-slate-800"}
            `}
      >
        <h1 className="tracking-normal font-medium">HireTrack</h1>

        <RxHamburgerMenu
          onClick={() => {
            toggleSideBar();
          }}
          size={26}
          className="hover:shadow-sm p-1 rounded-lg"
        />

        {sideToggle && (
          <div
            className={`
                        absolute 
                        h-full 
                        w-[95%] 
                        top-2 
                        right-5 
                        p-2 
                        flex flex-col 
                        gap-4 
                        shadow-md/30
                        ${theme === "light" ? "bg-gray-100/90" : "bg-zinc-900"}
                    `}
          >
            <MdOutlineClear
              onClick={() => toggleSideBar()}
              size={28}
              className="m-2 hover:shadow-sm p-1 rounded-full"
            />

            <div
              onClick={() => toggleSideBar()}
              className="flex flex-col items-center gap-2 md:gap-8 lg:gap-12 xl:gap-14"
            >
              <Box
                value={"Dashboard"}
                page={"dashboard"}
                Icon={MdOutlineDashboard}
                onSmash={handleStatus}
              />

              <Box
                value={"History"}
                page={"history"}
                Icon={MdOutlineHistory}
                onSmash={handleStatus}
              />

              <Box
                value={"Pricing"}
                page={"pricing"}
                Icon={MdOutlinePriceCheck}
                onSmash={handleStatus}
              />

              <Box
                value={"Profile"}
                page={"profile"}
                Icon={FaRegUser}
                onSmash={handleStatus}
              />

              <Box
                value={theme === "light" ? "Light" : "Dark"}
                Icon={theme === "light" ? MdOutlineWbSunny : FiMoon}
                onSmash={toggleTheme}
              />
            </div>
          </div>
        )}
      </nav>

      <nav
        className={`
                hidden 
                md:flex
                w-full 
                max-w-[90%] 
                xl:max-w-[80%] 
                mx-auto 
                items-center 
                justify-between 
                rounded-lg 
                m-4 
                py-4 
                text-base 
                shadow-md 
                border 
                px-7
                fixed
                ${theme === "light" ? "bg-white" : "bg-zinc-800"}
            `}
      >
        <h1 className="tracking-normal font-medium">HireTrack</h1>

        <div
          onClick={(e) => handleStatus(e.target.value)}
          className="flex items-center gap-6 md:gap-8 lg:gap-12 xl:gap-14"
        >
          <NavBox value={"Dashboard"} status={status} />

          <NavBox value={"History"} status={status} />

          <NavBox value={"Pricing"} status={status} />
        </div>

        <div className="flex items-center gap-4 lg:gap:6 text-sm md:text-base">
          <button
            onClick={() =>
              navigate("/profile", {
                state: {
                  userdata: user,
                },
              })
            }
            className="w-8 h-8 flex justify-center items-center rounded-full border hover:shadow-sm cursor-default hover:border-sky-400"
          >
            {user?.username.charAt(0)}
          </button>

          <div
            className="flex justify-center items-center border w-8 h-8 rounded-full hover:border-sky-500"
            onClick={() => toggleTheme()}
          >
            {theme === "light" ? (
              <FiMoon size={16} />
            ) : (
              <MdOutlineWbSunny size={16} />
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

function NavBox({ value, status }) {
  const { theme } = useTheme();

  return (
    <button
      value={value.toLowerCase()}
      className={`
            ${
              theme === "light" && status === value.toLowerCase()
                ? "bg-sky-200/90 border-gray-300"
                : theme === "dark" && status === value.toLowerCase()
                  ? "bg-slate-700"
                  : theme === "light"
                    ? "bg-white border-gray-400"
                    : "bg-zinc-800 border-gray-500"
            }
            border
            hover:shadow-sm
          shadow-sky-400
            rounded-md py-1
            px-2.5 hover:translate-y-1 
            transition-all 
            delay-75
            duration-200 
            ease-linear text-sm
            md:text-base 
            tracking-wide
            cursor-default
            w-28
            text-center
        `}
    >
      {value}
    </button>
  );
}

function Box({ value, page, Icon, onSmash }) {
  const { theme } = useTheme();
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        if (page === "profile") navigate("/profile");
        onSmash(page);
      }}
      className={`
                py-2 
                px-4 
                w-full 
                shadow-sm 
                flex 
                items-center 
                gap-2 
                rounded-sm
                ${
                  theme === "light"
                    ? "bg-white hover:bg-gray-50"
                    : "bg-zinc-800 hover:bg-zinc-950"
                }
            `}
    >
      <Icon />
      <span>{value}</span>
    </div>
  );
}
