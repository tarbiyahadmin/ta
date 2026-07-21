import { sanityClient } from './sanity';

// Reusable GROQ fragments
const imageProjection = `{ _type, asset->{ _id, url }, hotspot, crop, alt }`;

// --- Types (aligned with Sanity schemas) ---
export interface NavLink {
  label: string;
  to: string;
  displayAsButton?: boolean;
  openInNewTab?: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface SiteSettings {
  navLinks?: NavLink[];
  footerTagline?: string;
  footerQuickLinks?: NavLink[];
  footerProgramLinks?: NavLink[];
  footerAddress?: string;
  footerPhone?: string;
  footerEmail?: string;
  socialLinks?: SocialLink[];
  footerCopyright?: string;
}

export interface HomeProgramCategory {
  title: string;
  description: string;
  to?: string;
  categorySlug?: string;
}

export interface WhyChooseUsItem {
  title: string;
  description: string;
}

export interface FormPageRef {
  slug?: string;
}

export interface CtaButton {
  label: string;
  variant?: 'primary' | 'accent';
  /** Internal site path (e.g. /programs). Preferred for marketing CTAs. */
  to?: string | null;
  formPage?: FormPageRef | null;
}

export interface Hadith {
  arabic?: string;
  english?: string;
  reference?: string;
}

export interface Homepage {
  heroEyebrow?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroCtaButtons?: CtaButton[];
  programsSectionTitle?: string;
  programsSectionSubtitle?: string;
  programCategories?: HomeProgramCategory[];
  featuredPrograms?: { _id: string; slug?: string; title?: string; category?: { slug?: string }; shortDescription?: string; mainImage?: { asset?: { url: string }; _type?: string } }[];
  viewAllProgramsLabel?: string;
  whyChooseUsSectionTitle?: string;
  whyChooseUsSectionSubtitle?: string;
  whyChooseUsItems?: WhyChooseUsItem[];
  testimonialsSectionTitle?: string;
  testimonials?: { quote?: string; name?: string; role?: string }[];
  ctaTitle?: string;
  ctaSubtitle?: string;
  ctaButtons?: CtaButton[];
  footerNote?: string;
  editorialPhotos?: { asset?: { url: string }; _type?: string }[];
}

export interface ProgramCategory {
  _id: string;
  slug: string;
  title: string;
  description?: string;
  sortOrder?: number;
}

export interface ProgramFAQ {
  q?: string;
  a?: string;
}

export interface ProgramInfoCard {
  title: string;
  text: string;
}

export interface LabeledValueRow {
  label?: string;
  value?: string;
}

export interface ScheduleTableColumn {
  heading?: string;
}

export interface ScheduleTableCell {
  value?: string;
}

export interface ScheduleTableDataRow {
  cells?: ScheduleTableCell[];
}

export interface ScheduleTableSection {
  title?: string;
  columns?: ScheduleTableColumn[];
  dataRows?: ScheduleTableDataRow[];
  /** @deprecated Prefer columns + dataRows */
  rows?: LabeledValueRow[];
}

export interface ProgramOption {
  title?: string;
  /** Dedicated fee display */
  fee?: string;
  details?: LabeledValueRow[];
  scheduleTables?: ScheduleTableSection[];
  /** @deprecated Prefer title */
  label?: string;
  /** @deprecated Prefer details rows */
  format?: string;
  frequency?: string;
  duration?: string;
  note?: string;
  /** @deprecated Prefer fee */
  monthlyFee?: string;
  price?: string;
}

export interface ScheduleBlockBase {
  _type: string;
  _key?: string;
  blockTitle?: string;
}

export interface ScheduleBlockProgramOptions extends ScheduleBlockBase {
  _type: 'scheduleBlockProgramOptions';
  intro?: string;
  richText?: unknown[];
  options?: ProgramOption[];
}

export type ScheduleBlock = ScheduleBlockProgramOptions;

export interface ProgramLocation {
  address?: string;
  city?: string;
  province?: string;
  postalCode?: string;
}

export interface SpecialOffer {
  title: string;
  description?: string;
}

export interface FormPageDoc {
  _id: string;
  title: string;
  slug: string;
  intro?: unknown[];
  embedFormUrl?: string;
  seo?: SeoData;
}

export interface ThankYouPageDoc {
  title?: string;
  subtitle?: string;
  body?: unknown[];
  primaryCtaLabel?: string;
  primaryCtaPath?: string;
  seo?: SeoData;
}

export interface Program {
  _id: string;
  slug: string;
  title: string;
  heroText?: string;
  category?: { _id: string; title: string; slug?: string };
  mainImage?: { asset?: { url: string }; _type?: string; alt?: string };
  shortDescription?: string;
  format?: string;
  ages?: string;
  overview?: string;
  infoCards?: ProgramInfoCard[];
  location?: ProgramLocation;
  scheduleBlocks?: ScheduleBlock[];
  curriculum?: string[];
  specialOffers?: SpecialOffer[];
  registrationFormPage?: FormPageRef | null;
  bookMeetFormPage?: FormPageRef | null;
  faqs?: ProgramFAQ[];
  seo?: SeoData;
}

export interface ProgramForListing extends Program {
  category?: { _id: string; title: string; slug: string };
}

export interface ProgramsPage {
  title?: string;
  subtitle?: string;
  introContent?: unknown[];
  seo?: SeoData;
}

export interface BlogPostListItem {
  _id: string;
  slug: string;
  title: string;
  excerpt?: string;
  publishedAt?: string;
  mainImage?: { asset?: { url: string } };
}

export interface BlogPostFull extends BlogPostListItem {
  category?: string;
  author?: string;
  body?: unknown[];
  seo?: SeoData;
}

export interface BlogPage {
  title?: string;
  subtitle?: string;
  introContent?: unknown[];
  seo?: SeoData;
}

export interface CareerRole {
  _id: string;
  title: string;
  type: string;
  location?: string;
  description?: string;
  infoCards?: ProgramInfoCard[];
  responsibilities?: string[];
  requirements?: string[];
  scheduleBlocks?: ScheduleBlock[];
  applicationFormPage?: FormPageRef | null;
}

export interface CareersPage {
  title?: string;
  subtitle?: string;
  whyWorkAtAcademy?: string;
  applyFormTitle?: string;
  introContent?: unknown[];
  seo?: SeoData;
}

export interface DonateTrustBullet {
  title?: string;
  desc?: string;
}

export interface DonateWaysSupportItem {
  title?: string;
  description?: string;
  image?: { asset?: { url: string }; _type?: string };
  cta?: CtaButton | null;
}

export interface DonatePage {
  title?: string;
  subtitle?: string;
  introContent?: unknown[];
  introImage?: { asset?: { url: string }; _type?: string };
  introCtaButtons?: CtaButton[];
  waysToSupportTitle?: string;
  waysToSupportItems?: DonateWaysSupportItem[];
  scholarshipTitle?: string;
  scholarshipSubtitle?: string;
  scholarshipContent?: unknown[];
  scholarshipImages?: { asset?: { url: string }; _type?: string }[];
  scholarshipCtaButtons?: CtaButton[];
  trustTitle?: string;
  hadith?: Hadith;
  hadithTitle?: string;
  hadithCtaButtons?: CtaButton[];
  trustBullets?: DonateTrustBullet[];
  trustCtaButtons?: CtaButton[];
  closingCtaTitle?: string;
  closingCtaSubtitle?: string;
  closingCtaImage?: { asset?: { url: string }; _type?: string };
  closingCtaButtons?: CtaButton[];
  seo?: SeoData;
}

export interface AboutTeacher {
  name: string;
  role?: string;
  oneLineDescription?: string;
  photo?: { asset?: { url: string } };
}

export interface AboutGraduate {
  name: string;
  title?: string;
  yearOfGraduation?: string;
  photo?: { asset?: { url: string } };
}

export interface FinancialAidStep {
  title?: string;
  description?: string;
}

export interface FinancialAidPage {
  title?: string;
  slug?: string;
  scholarshipOverviewTitle?: string;
  scholarshipOverviewBody?: string;
  scholarshipOverviewImage?: { asset?: { url: string }; _type?: string };
  howItWorksTitle?: string;
  howItWorksSteps?: FinancialAidStep[];
  howItWorksImage?: { asset?: { url: string }; _type?: string };
  meritNeedTitle?: string;
  meritNeedIntro?: string;
  meritNeedBullets?: string[];
  meritNeedImage?: { asset?: { url: string }; _type?: string };
  meritNeedCta?: CtaButton | null;
  quoteEyebrow?: string;
  quote?: Hadith;
  closingCtaTitle?: string;
  closingCtaSubtitle?: string;
  closingCtaImage?: { asset?: { url: string }; _type?: string };
  closingApplyCta?: CtaButton | null;
  closingDonateCta?: CtaButton | null;
  additionalContent?: unknown[];
  seo?: SeoData;
}

export interface AboutPage {
  title?: string;
  subtitle?: string;
  ourStory?: string;
  ourMission?: string;
  ourVision?: string;
  ourValues?: { title: string; description?: string }[];
  ourApproach?: string;
  instituteText?: string;
  teachers?: AboutTeacher[];
  graduates?: AboutGraduate[];
  additionalContent?: unknown[];
  seo?: SeoData;
}

export interface SeoData {
  seoTitle?: string | null;
  metaDescription?: string | null;
}

// --- GROQ Queries ---
const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  navLinks[]{ label, to, displayAsButton, openInNewTab },
  footerTagline,
  footerQuickLinks[]{ label, to, displayAsButton, openInNewTab },
  footerProgramLinks[]{ label, to, displayAsButton, openInNewTab },
  footerAddress,
  footerPhone,
  footerEmail,
  socialLinks[]{ platform, url },
  footerCopyright
}`;

const HOMEPAGE_QUERY = `*[_type == "homepage"][0]{
  heroEyebrow,
  heroTitle,
  heroSubtitle,
  heroCtaButtons[]{ label, variant, to, formPage->{ "slug": slug.current } },
  programsSectionTitle,
  programsSectionSubtitle,
  "featuredPrograms": featuredPrograms[]->{
    _id,
    "slug": slug.current,
    title,
    shortDescription,
    mainImage ${imageProjection},
    "category": category->{ _id, title, "slug": slug.current }
  },
  viewAllProgramsLabel,
  editorialPhotos[] ${imageProjection},
  whyChooseUsSectionTitle,
  whyChooseUsSectionSubtitle,
  whyChooseUsItems[]{ title, description },
  testimonialsSectionTitle,
  testimonials[]{ quote, name, role },
  ctaTitle,
  ctaSubtitle,
  ctaButtons[]{ label, variant, to, formPage->{ "slug": slug.current } },
  footerNote,
  seo{ seoTitle, metaDescription }
}`;

const PROGRAMS_PAGE_QUERY = `*[_type == "programsPage"][0]{ title, subtitle, introContent, seo{ seoTitle, metaDescription } }`;

const PROGRAM_CATEGORIES_QUERY = `*[_type == "programCategory"] | order(coalesce(sortOrder, 999) asc, title asc){
  _id,
  "slug": slug.current,
  title,
  description,
  sortOrder
}`;

const PROGRAMS_FOR_LISTING_QUERY = `*[_type == "program"]{
  _id,
  "slug": slug.current,
  title,
  shortDescription,
  format,
  ages,
  mainImage ${imageProjection},
  "category": category->{ _id, title, "slug": slug.current, sortOrder },
  "categorySort": coalesce(category->sortOrder, 999)
} | order(categorySort asc, title asc)`;

const PROGRAM_BY_SLUG_QUERY = `*[_type == "program" && slug.current == $slug][0]{
  _id,
  "slug": slug.current,
  title,
  heroText,
  category->{ _id, title, "slug": slug.current },
  mainImage ${imageProjection},
  shortDescription,
  format,
  ages,
  overview,
  infoCards[]{ title, text },
  location{ address, city, province, postalCode },
  scheduleBlocks[_type == "scheduleBlockProgramOptions"]{
    _type,
    _key,
    blockTitle,
    intro,
    options[]{
      title,
      fee,
      details[]{ label, value },
      scheduleTables[]{
        title,
        columns[]{ heading },
        dataRows[]{ cells[]{ value } },
        rows[]{ label, value }
      },
      label,
      format,
      frequency,
      duration,
      note,
      monthlyFee,
      price
    }
  },
  curriculum,
  specialOffers[]{ title, description },
  registrationFormPage->{ "slug": slug.current },
  bookMeetFormPage->{ "slug": slug.current },
  faqs[]{ q, a },
  seo{ seoTitle, metaDescription }
}`;

const BLOG_PAGE_QUERY = `*[_type == "blogPage"][0]{ title, subtitle, introContent, seo{ seoTitle, metaDescription } }`;

const BLOG_POSTS_QUERY = `*[_type == "blogPost"] | order(publishedAt desc){
  _id,
  "slug": slug.current,
  title,
  excerpt,
  publishedAt,
  mainImage ${imageProjection}
}`;

const BLOG_POST_BY_SLUG_QUERY = `*[_type == "blogPost" && slug.current == $slug][0]{
  _id,
  "slug": slug.current,
  title,
  excerpt,
  publishedAt,
  mainImage ${imageProjection},
  category,
  author,
  body,
  seo{ seoTitle, metaDescription }
}`;

const CAREERS_PAGE_QUERY = `*[_type == "careersPage"][0]{
  title,
  subtitle,
  "whyWorkAtAcademy": coalesce(whyWorkAtAcademy, whyWorkAtMqi),
  applyFormTitle,
  introContent,
  seo{ seoTitle, metaDescription }
}`;

const CAREER_ROLES_QUERY = `*[_type == "careerRole"] | order(title asc){
  _id,
  title,
  type,
  location,
  description,
  infoCards[]{ title, text },
  responsibilities,
  requirements,
  scheduleBlocks[_type == "scheduleBlockProgramOptions"]{
    _type,
    _key,
    blockTitle,
    intro,
    options[]{
      title,
      fee,
      details[]{ label, value },
      scheduleTables[]{
        title,
        columns[]{ heading },
        dataRows[]{ cells[]{ value } },
        rows[]{ label, value }
      },
      label,
      format,
      frequency,
      duration,
      note,
      monthlyFee,
      price
    }
  },
  applicationFormPage->{ "slug": slug.current }
}`;

const DONATE_PAGE_QUERY = `*[_type == "donatePage"][0]{
  title,
  subtitle,
  introContent,
  introImage ${imageProjection},
  introCtaButtons[]{ label, variant, to, formPage->{ "slug": slug.current } },
  waysToSupportTitle,
  waysToSupportItems[]{
    title,
    description,
    image ${imageProjection},
    cta{ label, variant, to, formPage->{ "slug": slug.current } }
  },
  scholarshipTitle,
  scholarshipSubtitle,
  scholarshipContent,
  scholarshipImages[] ${imageProjection},
  scholarshipCtaButtons[]{ label, variant, to, formPage->{ "slug": slug.current } },
  trustTitle,
  hadith{ arabic, english, reference },
  hadithTitle,
  hadithCtaButtons[]{ label, variant, to, formPage->{ "slug": slug.current } },
  trustBullets[]{ title, desc },
  trustCtaButtons[]{ label, variant, to, formPage->{ "slug": slug.current } },
  closingCtaTitle,
  closingCtaSubtitle,
  closingCtaImage ${imageProjection},
  closingCtaButtons[]{ label, variant, to, formPage->{ "slug": slug.current } },
  seo{ seoTitle, metaDescription }
}`;

const FINANCIAL_AID_PAGE_QUERY = `*[_type == "financialAidPage"][0]{
  title,
  "slug": slug.current,
  scholarshipOverviewTitle,
  scholarshipOverviewBody,
  scholarshipOverviewImage ${imageProjection},
  howItWorksTitle,
  howItWorksSteps[]{ title, description },
  howItWorksImage ${imageProjection},
  meritNeedTitle,
  meritNeedIntro,
  meritNeedBullets,
  meritNeedImage ${imageProjection},
  meritNeedCta{ label, variant, to, formPage->{ "slug": slug.current } },
  quoteEyebrow,
  quote{ arabic, english, reference },
  closingCtaTitle,
  closingCtaSubtitle,
  closingCtaImage ${imageProjection},
  closingApplyCta{ label, variant, to, formPage->{ "slug": slug.current } },
  closingDonateCta{ label, variant, to, formPage->{ "slug": slug.current } },
  additionalContent,
  seo{ seoTitle, metaDescription }
}`;

const ABOUT_PAGE_QUERY = `*[_type == "aboutPage"][0]{
  title,
  subtitle,
  ourStory,
  ourMission,
  ourVision,
  ourValues[]{ title, description },
  ourApproach,
  instituteText,
  teachers[]{
    name,
    role,
    oneLineDescription,
    photo ${imageProjection}
  },
  graduates[]{
    name,
    title,
    yearOfGraduation,
    photo ${imageProjection}
  },
  additionalContent,
  seo{ seoTitle, metaDescription }
}`;

const FORM_PAGE_BY_SLUG_QUERY = `*[_type == "formPage" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  intro,
  embedFormUrl,
  seo{ seoTitle, metaDescription }
}`;

const THANK_YOU_PAGE_QUERY = `*[_type == "thankYouPage"] | order(_updatedAt desc)[0]{
  title,
  subtitle,
  body,
  primaryCtaLabel,
  primaryCtaPath,
  seo{ seoTitle, metaDescription }
}`;

// --- Fetch functions ---
export async function getSiteSettings(): Promise<SiteSettings | null> {
  return sanityClient.fetch<SiteSettings | null>(SITE_SETTINGS_QUERY);
}

export async function getHomepage(): Promise<Homepage | null> {
  return sanityClient.fetch<Homepage | null>(HOMEPAGE_QUERY);
}

export async function getProgramsPage(): Promise<ProgramsPage | null> {
  return sanityClient.fetch<ProgramsPage | null>(PROGRAMS_PAGE_QUERY);
}

export async function getProgramCategories(): Promise<ProgramCategory[]> {
  return sanityClient.fetch<ProgramCategory[]>(PROGRAM_CATEGORIES_QUERY);
}

export async function getProgramsForListing(): Promise<ProgramForListing[]> {
  return sanityClient.fetch<ProgramForListing[]>(PROGRAMS_FOR_LISTING_QUERY);
}

export async function getProgramBySlug(slug: string): Promise<Program | null> {
  return sanityClient.fetch<Program | null>(PROGRAM_BY_SLUG_QUERY, { slug });
}

export async function getBlogPage(): Promise<BlogPage | null> {
  return sanityClient.fetch<BlogPage | null>(BLOG_PAGE_QUERY);
}

export async function getBlogPosts(): Promise<BlogPostListItem[]> {
  return sanityClient.fetch<BlogPostListItem[]>(BLOG_POSTS_QUERY);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPostFull | null> {
  return sanityClient.fetch<BlogPostFull | null>(BLOG_POST_BY_SLUG_QUERY, { slug });
}

export async function getCareersPage(): Promise<CareersPage | null> {
  return sanityClient.fetch<CareersPage | null>(CAREERS_PAGE_QUERY);
}

export async function getCareerRoles(): Promise<CareerRole[]> {
  return sanityClient.fetch<CareerRole[]>(CAREER_ROLES_QUERY);
}

export async function getDonatePage(): Promise<DonatePage | null> {
  return sanityClient.fetch<DonatePage | null>(DONATE_PAGE_QUERY);
}

export async function getAboutPage(): Promise<AboutPage | null> {
  return sanityClient.fetch<AboutPage | null>(ABOUT_PAGE_QUERY);
}

export async function getFinancialAidPage(): Promise<FinancialAidPage | null> {
  return sanityClient.fetch<FinancialAidPage | null>(FINANCIAL_AID_PAGE_QUERY);
}

export async function getFormPageBySlug(slug: string): Promise<FormPageDoc | null> {
  return sanityClient.fetch<FormPageDoc | null>(FORM_PAGE_BY_SLUG_QUERY, { slug });
}

export async function getThankYouPage(): Promise<ThankYouPageDoc | null> {
  return sanityClient.fetch<ThankYouPageDoc | null>(THANK_YOU_PAGE_QUERY);
}
