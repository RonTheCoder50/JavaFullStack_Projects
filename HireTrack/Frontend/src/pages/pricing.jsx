import { useState } from "react";
import { useTheme } from "./theme";
import { Button } from "@base-ui/react/button";

export default function PricingPage({ navigateToMain }) {
  const free = [
    "~ upto 5/day resume analyses",
    "~ visible history reports",
    "~ get instant AI feeback",
  ];

  const pro = ["", "", ""];

  const custom = ["", "", "", ""];

  return (
    <section
      className="
        w-full 
        min-h-screen 
        flex 
        flex-col 
        lg:flex-row
        gap-8 
        lg:gap-4
        mx-auto
        items-center 
        mt-10
        md:mt-36
        lg:mt-10
        p-2
      "
    >
      <PriceComponent plan={"Free"} content={free} navigate={navigateToMain} />
      {/* <PriceComponent plan={"Pro"} content={pro} />
      <PriceComponent plan={"Custom"} content={custom} /> */}
    </section>
  );
}

function PriceComponent({ plan, content, navigate }) {
  const { theme } = useTheme();
  const [toggle, setToggle] = useState(true);

  const p = plan.toLowerCase().trim();
  const monthPay = p === "pro" ? 1.99 : 4.99;
  const yearPay = p === "pro" ? 9.99 : 13.99;

  return (
    <div
      className={`
                  rounded-md
                  w-full
                  max-w-[90%]
                  sm:max-w-[350px]
                  border
                  mx-auto
                  flex
                  flex-col
                  gap-6
                  ${theme === "dark" ? "border-zinc-700" : "border-sky-400"}
              `}
    >
      <h1
        className={`
            py-3 
            px-5 
            text-base 
            sm:text-xl 
            font-semibold
            tracking-wide 
            border-b 
            text-center
            rounded-t-md
            border-gray-700
            bg-zinc-800
            ${theme === "light" ? "text-white" : ""}
          `}
      >
        {plan} Plan
      </h1>

      <div className="flex items-center justify-between gap-3 p-3 mx-2">
        <div>
          <span className="text-5xl font-bold">
            {p === "free" ? 0 : toggle ? monthPay : yearPay}
          </span>
          <span className="text-md font-medium ml-1">$</span>
          <span>/-</span>
        </div>

        {p !== "free" && (
          <div className="flex items-center text-base tracking-wide border rounded-md">
            <Button
              onClick={() => {
                if (toggle) return;
                setToggle(true);
              }}
              className={`
                  w-20
                  py-1 px-2
                  rounded-l-md
                  ${toggle ? "bg-gray-600" : "hover:bg-white/10"}
                `}
            >
              Monthly
            </Button>

            <Button
              onClick={() => {
                if (!toggle) return;
                setToggle(false);
              }}
              className={`
                  w-20
                  py-1 px-2
                  rounded-r-md
                  ${!toggle ? "bg-gray-500" : "hover:bg-white/10"}
                `}
            >
              Yearly
            </Button>
          </div>
        )}
      </div>

      <hr />

      <ul
        className={`
            flex 
            flex-col 
            gap-4 
            p-4 
            text-base 
            tracking-wide
            ${theme === "light" ? "text-black/90" : "text-white/75"}
          `}
      >
        {content?.map((txt, index) => (
          <li key={index}>{txt}</li>
        ))}
      </ul>

      <hr className="mt-4" />

      {p === "free" ? (
        <div className=" flex justify-center items-center mb-3">
          <Button
            onClick={() => navigate()}
            className={`
                w-[85%]
                p-2
                border
                rounded-lg
                transition-all
                delay-75
                duration-300
                ease-linear
                hover:bg-zinc-800
                ${theme === "light" ? "hover:text-white/80" : "hover:text-gray-100"}
              `}
          >
            Current Plan
          </Button>
        </div>
      ) : (
        <div className=" flex justify-center items-center mb-3">
          <Button
            className={`
                w-[85%]
                p-2
                border
                border-yellow-500
                text-yellow-200
                hover:bg-yellow-600
                hover:text-white
                rounded-lg
                transition-all
                delay-75
                duration-200
                ease-in-out
              `}
          >
            Upgrade
          </Button>
        </div>
      )}
    </div>
  );
}
