import { socialLinks } from "../../utils/socialLinks";

const SocialLinks = () => (
  <div className="grid grid-cols-2 gap-4 pt-8 sm:flex sm:gap-4 sm:pt-8 mb:gap-12 xl:gap-12">
    {socialLinks.map((link) => (
      <a
        key={link.name}
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 focus:text-blue-700 dark:focus:text-blue-300 underline font-bold text-base transition"
      >
        {link.name}
      </a>
    ))}
  </div>
);

export default SocialLinks;
