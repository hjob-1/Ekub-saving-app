import React from 'react';
import { Link } from 'react-router';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-8 px-4" aria-label="Footer">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4">About Equb</h3>
            <p className="text-gray-300">
              A modern platform for managing traditional rotating savings
              groups, bringing trust and transparency to the age-old practice.
            </p>
          </div>

          {/* Quick Links */}
          <nav aria-label="Quick links">
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/about"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/how-it-works"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faq"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          {/* Contact Info */}
          <address>
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <FaMapMarkerAlt className="mr-2" aria-hidden="true" />
                  <span className="text-gray-300">Addis Ababa, Ethiopia</span>
                </li>
                <li className="flex items-center">
                  <FaPhone className="mr-2" aria-hidden="true" />
                  <a
                    href="tel:+1647564****"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    +647 564 ****
                  </a>
                </li>
                <li className="flex items-center">
                  <FaEnvelope className="mr-2" aria-hidden="true" />
                  <a
                    href="mailto:info@ekubapp.com"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    info@ekubapp.com
                  </a>
                </li>
              </ul>
            </div>
          </address>

          {/* Social Media & Newsletter */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4 mb-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white text-2xl transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white text-2xl transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white text-2xl transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white text-2xl transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-semibold mb-2">
                Subscribe to our newsletter
              </h4>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 text-gray-800 rounded-l focus:outline-none w-full"
                  aria-label="Email for newsletter subscription"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-4  text-center text-gray-400">
          <p>&copy; {currentYear} Equb Application. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
