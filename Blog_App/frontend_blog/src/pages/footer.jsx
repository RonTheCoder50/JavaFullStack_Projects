export default function FooterSection() {
  return (
    <section className="w-full mt-8 mb-2">
      <hr className="w-full max-w-[95%] mx-auto" />

      <div className="pl-6 mt-4 sm:pl-20 flex flex-col sm:flex-row items-center gap-6 sm:gap-8 p-2">
        <div className="hover:underline underline-offset-2 transition-all delay-75 duration-300 ease-linear">
          <a href="https://github.com/RonTheCoder50/JavaFullStack_Projects/tree/main/Blog_App">
            Github
          </a>
        </div>

        <p>Made by ron with &#10084;</p>
      </div>
    </section>
  );
}
