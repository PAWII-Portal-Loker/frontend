import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const socialLinks = [
  { href: "#", icon: <FaFacebook size={40} color="#3b5998" /> },
  { href: "#", icon: <FaTwitter size={40} color="#00acee" /> },
  { href: "#", icon: <FaInstagram size={40} color="#c13584" /> },
];

type SocialLinkProps = {
  href: string;
  icon: React.ReactNode;
};

const SocialLink = ({ href, icon }: SocialLinkProps) => (
  <li>
    <Link href={href}>{icon}</Link>
  </li>
);

const Footer = () => {
  return (
    <footer className="bg-slate-600 text-gray-100 text-center">
      <div className="px-4 py-3 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <p>© {new Date().getFullYear()} PortalLoker. All rights reserved</p>
        <ul className="flex gap-8 justify-center">
          {socialLinks.map((link, index) => (
            <SocialLink key={index} {...link} />
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
