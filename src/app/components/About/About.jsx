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
   
        <div className="hidden sm:flex flex-col md:flex-row items-center md:gap-8">
          {/* Text Content */}
          <div className="flex-1 text-center text-gray-700 dark:text-gray-200">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 uppercase tracking-tight">
              {menuItems[0]}
            </h2>
            <p className="text-lg md:text-xl font-bold leading-relaxed mb-4 text-transparent bg-gradient-to-r from-rose-700 via-pink-600 to-purple-700 bg-clip-text">
              {menuItems[1]}
            </p>
            <p className="text-lg md:text-xl font-bold leading-relaxed mb-4 text-transparent bg-gradient-to-r from-rose-700 via-pink-600 to-purple-700 bg-clip-text">
              {menuItems[2]}
            </p>
            <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-wide">
              {menuItems[3]}
            </p>
          </div>

          {/* Image */}
          <div className="flex-1 flex justify-center mt-8 md:mt-0">
            <div className="relative group w-full max-w-md h-[450px] md:h-[600px] rounded-lg overflow-hidden">
              <Image
                src="/hoom/Propose.avif"
                alt="Romantic marriage proposal photography Barcelona - Professional photographer capturing special moments at iconic Barcelona locations"
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
                alt="Professional photographer in Barcelona - Romantic proposal and engagement photography at iconic Barcelona locations"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
            </div>

            {/* Text Overlay on Mobile */}
            <div
              className="absolute bottom-[5%] left-0 w-full bg-white/95 dark:bg-gray-900/90 p-6 text-center transition-all duration-700"
            >
              <h2 className="text-xl font-extrabold text-gray-900 dark:text-white mb-3 uppercase tracking-tight">
                {menuItems[0]}
              </h2>
              <p className="text-sm font-bold leading-relaxed text-transparent bg-gradient-to-r from-rose-700 via-pink-600 to-purple-700 bg-clip-text">
                {menuItems[1]}
              </p>
              <p className="text-sm font-bold leading-relaxed mt-2 text-transparent bg-gradient-to-r from-rose-700 via-pink-600 to-purple-700 bg-clip-text">
                {menuItems[2]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}