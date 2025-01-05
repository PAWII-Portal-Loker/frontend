import Link from "next/link";
import moment from "moment";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import clsx from "clsx";
import {
  CONTAINER_CLASSES,
  getThemeClassNames,
  TEXT_CLASSES,
} from "@utils/classNames";

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
    <footer
      className={clsx(
        "text-center mt-auto",
        getThemeClassNames(TEXT_CLASSES, CONTAINER_CLASSES)
      )}
    >
      <div className="px-4 py-3 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <p>© {moment().format("YYYY")} PortalLoker. All rights reserved</p>
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
