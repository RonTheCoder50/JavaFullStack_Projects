import { useTheme } from "@/pages/theme";

// function HeroCard({ name, value }) {
//     const { theme } = useTheme();
//     return (
//         <div
//             className="
//                 w-full max-w-[85%]
//                 sm:max-w-[300px]
//                 min-h-[220px]
//                 mx-auto
//                 rounded-3xl
//                 border border-gray-200
//                 shadow-sm
//                 hover:shadow-lg
//                 hover:-translate-y-1
//                 hover:border-sky-300
//                 transition-all duration-300
//                 flex flex-col items-center justify-center
//                 gap-8
//                 px-6 py-8
//             "
//         >
//             <div className="space-y-2 text-center flex flex-col gap-4">
//                 <h2
//                     className={`
//                         text-base sm:text-lg
//                         font-medium
//                         tracking-wide
//                          ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}
//                     `}
//                 >
//                     {name}
//                 </h2>

//                 <div className="w-[75%] h-0.75 bg-sky-400 rounded-full mx-auto" />
//             </div>

//             <p
//                 className={`
//                     text-3xl sm:text-4xl
//                     font-bold
//                     tracking-tight
//                     ${theme === 'light' ? 'text-gray-800' : 'text-gray-300'}
//                 `}
//             >
//                 {value}
//             </p>
//         </div>
//     );
// }

export default HeroCard;

function HeroCard({ name, value }) {
  const { theme } = useTheme();

  return (
    <div
      className={`
        w-full
        rounded-3xl
        border
        p-5
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-xl
        ${
          theme === "light"
            ? "border-gray-200 bg-white"
            : "border-zinc-700 bg-zinc-900"
        }
      `}
    >
      <div className="flex flex-col gap-6">
        <div>
          <h2
            className={`
              text-sm uppercase tracking-wider
              ${theme === "light" ? "text-gray-500" : "text-gray-400"}
            `}
          >
            {name}
          </h2>

          <p
            className={`
              mt-2
              text-2xl md:text-4xl font-bold
              ${theme === "light" ? "text-gray-900" : "text-white"}
            `}
          >
            {value}
            {name.trim().toLowerCase().replaceAll(" ", "") === "avgatsscore"
              ? "%"
              : ""}
          </p>
        </div>

        {name.trim().toLowerCase() !== "current plan" ? (
          <div>
            <div
              className={`
                h-3 rounded-full overflow-hidden
                ${theme === "light" ? "bg-gray-100" : "bg-zinc-800"}
                `}
            >
              <div
                className="h-full bg-sky-500 rounded-full transition-all duration-700"
                style={{ width: `${value}%` }}
              />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
