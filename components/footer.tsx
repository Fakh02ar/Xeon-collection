import Link from "next/link"
import { Instagram, Twitter, Facebook, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-lg mb-4">Xeon Collection</h3>
            <p className="text-sm text-background/80">Premium quality clothing for the modern lifestyle.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop?category=T-Shirts" className="text-background/80 hover:text-background transition">
                  T-Shirts
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Hoodies" className="text-background/80 hover:text-background transition">
                  Hoodies
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=Cotton Shirts"
                  className="text-background/80 hover:text-background transition"
                >
                  Cotton Shirts
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-background/80 hover:text-background transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/" className="text-background/80 hover:text-background transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/" className="text-background/80 hover:text-background transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:opacity-80 transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:opacity-80 transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:opacity-80 transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:opacity-80 transition">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8">
          <p className="text-center text-sm text-background/80">© 2026 Xeon Collection. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
