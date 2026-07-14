import { useLocation } from "react-router-dom";
import { siteLogoUrl } from "@/lib/siteAssets";
import { SITE_NAME } from "@/lib/brand";
import { useQuery } from "@tanstack/react-query";
import { getSiteSettings } from "@/lib/sanityQueries";
import type { NavLink as NavLinkFields } from "@/lib/sanityQueries";
import { ConfigurableNavLink } from "@/components/layout/ConfigurableNavLink";

const defaultQuickLinks = [
  { label: "Programs", to: "/programs" },
  { label: "Career & Volunteer", to: "/careers" },
  { label: "Blog", to: "/blog" },
  { label: "Donate", to: "/donate" },
];

const defaultProgramLinks = [
  { label: "Weekend Qur'an", to: "/programs" },
  { label: "Arabic", to: "/programs" },
  { label: "Islamic Studies", to: "/programs" },
];

const Footer = () => {
  const location = useLocation();
  const { data: siteSettings } = useQuery({
    queryKey: ["siteSettings"],
    queryFn: getSiteSettings,
  });

  const tagline =
    siteSettings?.footerTagline ??
    "A weekend Islamic school nurturing youth through Qur'an, Arabic, and authentic Islamic studies.";
  const rawQuickLinks = (siteSettings?.footerQuickLinks?.length ? siteSettings.footerQuickLinks : defaultQuickLinks) as NavLinkFields[];
  const quickLinks = rawQuickLinks.filter((link) => link.to !== "/contact");
  const programLinks = (siteSettings?.footerProgramLinks?.length ? siteSettings.footerProgramLinks : defaultProgramLinks) as NavLinkFields[];
  const address = siteSettings?.footerAddress ?? "";
  const phone = siteSettings?.footerPhone ?? "";
  const email = siteSettings?.footerEmail ?? "info@tarbiyahacademy.org";
  const socialLinks = siteSettings?.socialLinks ?? [];
  const copyright = siteSettings?.footerCopyright ?? `© ${new Date().getFullYear()} ${SITE_NAME}. All rights reserved.`;
  const copyrightText = copyright.includes('{year}') ? copyright.replace('{year}', String(new Date().getFullYear())) : copyright;

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <img
              src={siteLogoUrl}
              alt={SITE_NAME}
              className="h-12 w-auto"
              width={256}
              height={260}
              loading="lazy"
              decoding="async"
            />
            <p className="text-secondary-foreground/70 text-sm leading-relaxed">
              {tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-secondary-foreground/90">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link, index) => (
                <li key={`${link.label}-${link.to}-${index}`}>
                  <ConfigurableNavLink
                    link={link}
                    context="footer"
                    isActive={location.pathname === link.to}
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-secondary-foreground/90">Programs</h4>
            <ul className="space-y-2.5">
              {programLinks.map((link, index) => (
                <li key={`${link.label}-${link.to}-${index}`}>
                  <ConfigurableNavLink
                    link={link}
                    context="footer"
                    isActive={location.pathname === link.to}
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-secondary-foreground/90">Contact Us</h4>
            <ul className="space-y-3">
              {address ? <li className="text-sm text-secondary-foreground/60">{address}</li> : null}
              {phone ? <li className="text-sm text-secondary-foreground/60">{phone}</li> : null}
              {email ? <li className="text-sm text-secondary-foreground/60">{email}</li> : null}
            </ul>
            {socialLinks.length > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {socialLinks.map((s) => {
                  return (
                    <a
                      key={s.platform + s.url}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border border-secondary-foreground/25 px-2.5 py-1 text-xs uppercase tracking-wide text-secondary-foreground/70 transition-colors hover:text-secondary-foreground"
                      aria-label={s.platform}
                    >
                      {s.platform}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-secondary-foreground/50 md:mt-12">
          {copyrightText}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
