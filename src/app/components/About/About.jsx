import Head from 'next/head';
import Image from "next/image";
import { useLanguage } from "../../Functions/useLanguage";

export default function About() {
  const { translateList } = useLanguage();
  const menuItems = translateList("home", "about");

  return (
    <section
      className="bg-white dark:bg-gray-900 py-12 px-6 sm:px-12"
      id="about"
    >
      <Head>
        <title>About - Your Photography Name</title>
        <meta
          name="description"
          content="Learn about your local Barcelona photographer specializing in romantic couples, engagement, proposal, and more."
        />
      </Head>
      <div className="max-w-7xl mx-auto relative">
        {/* Layout for Tablets and Desktops */}
        <div className="hidden sm:flex flex-col md:flex-row items-center md:gap-8">
          {/* Text Content */}
          <div className="flex-1 text-center text-gray-600 dark:text-gray-300">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 uppercase">
              {menuItems[0]}
            </h2>
            <p className="text-lg md:text-xl leading-relaxed mb-4">
              {menuItems[1]}
            </p>
            <p className="text-lg md:text-xl leading-relaxed mb-4">
              {menuItems[2]}
            </p>
            <p className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white uppercase">
              {menuItems[3]}
            </p>
          </div>

          {/* Image */}
          <div className="flex-1 flex justify-center mt-8 md:mt-0">
            <div className="relative group w-full max-w-md h-[450px] md:h-[600px] rounded-lg overflow-hidden">
              <Image
                src="/hoom/Propose.avif"
                alt="About Image"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
            </div>
          </div>
        </div>

        {/* Layout for Mobile */}
        <div className="relative sm:hidden flex justify-center">
          <div className="relative w-full">
            {/* Image */}
            <div className="relative group w-full h-[450px] rounded-lg overflow-hidden">
              <Image
                src="/hoom/Propose.avif"
                alt="About Image"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
            </div>

            {/* Text Overlay on Mobile */}
            <div
              className="absolute bottom-[5%] left-0 w-full bg-white/90 dark:bg-gray-900/80 p-6 text-center transition-all duration-700"
            >
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2 uppercase">
                {menuItems[0]}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {menuItems[1]}
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mt-2">
                {menuItems[2]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}