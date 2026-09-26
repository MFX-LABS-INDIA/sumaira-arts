import type { ReactNode } from "react";
import { footerNav, socialLinks } from "@/data/navigation";
import { site } from "@/constants/site";
import { Container } from "@/components/ui/Container";
import { FacebookIcon, InstagramIcon, PinterestIcon, YoutubeIcon } from "@/components/ui/Icons";
import { SmartLink } from "@/components/ui/Link";
import { Logo } from "./Logo";

const socialIcons: Record<string, ReactNode> = {
  Instagram: <InstagramIcon className="h-5 w-5" />,
  Facebook: <FacebookIcon className="h-5 w-5" />,
  Pinterest: <PinterestIcon className="h-5 w-5" />,
  YouTube: <YoutubeIcon className="h-5 w-5" />,
};

const columnTitle = "text-label font-medium uppercase tracking-eyebrow text-white";

export function Footer() {
  return (
    <footer id="contact" className="scroll-mt-19 border-t border-white/10 bg-deep text-soft">
      <Container className="py-16 md:py-20">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Logo tone="dark" />
            <p className="mt-7 max-w-sm text-sm leading-relaxed">{site.statement}</p>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:col-span-8">
            {footerNav.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h3 className={columnTitle}>{group.title}</h3>
                <ul className="mt-6 space-y-3.5 text-sm">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <SmartLink href={link.href} className="text-light transition-colors hover:text-white">
                        {link.label}
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-8 text-sm sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <ul className="flex items-center gap-5">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a href={social.href} aria-label={social.label} className="text-light transition-colors hover:text-white">
                  {socialIcons[social.label]}
                </a>
              </li>
            ))}
          </ul>
          <ul className="flex gap-6">
            <li>
              <a href="#" className="text-light transition-colors hover:text-white">
                Privacy
              </a>
            </li>
            <li>
              <a href="#" className="text-light transition-colors hover:text-white">
                Terms
              </a>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
