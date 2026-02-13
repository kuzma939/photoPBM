import { useLanguage } from "../../Functions/useLanguage";

const Map = () => {
  const { translateList } = useLanguage();
  const mapItems = translateList("home", "map");
  
  return (
    <section className="bg-gray-100 dark:bg-black text-white py-8 px-4">
      <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-4 text-black dark:text-white tracking-tight">
        {mapItems[0]}
      </h2>
      <p className="text-center text-gray-900 dark:text-white font-bold text-base sm:text-lg mb-6 max-w-2xl mx-auto">
        {mapItems[1]}
      </p>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2992.359156936485!2d2.158985215612444!3d41.38879027926298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a2f3f4cbb1cd%3A0x5c6c6b4ea1e6c5a1!2sPla%C3%A7a%20de%20Catalunya%2C%20Barcelona!5e0!3m2!1sen!2ses!4v1686566670000!5m2!1sen!2ses"
        className="w-full h-64 sm:h-72 border-0 rounded-lg shadow-md"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </section>
  );
};

export default Map;
