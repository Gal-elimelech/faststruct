export interface IHeroSection {
  title: string;
  animatedWords: string[];
  subtitle: string;
  heroImage: string;
}

export interface IIntro {
  text: string;
  introImage: string;
}

export interface IFeatureItem {
  title: string;
  text: string;
  iconClass: string;
  imageUrl: string;
}

export interface IConstructionCategory {
  title: string;
  items: string[];
  image: string;
}

export interface IWhyModularPanelized {
  modular: IConstructionCategory;
  panelized: IConstructionCategory;
  combinedApproach: IConstructionCategory;
}

export interface IExperienceMetric {
  title: string;
  text: string;
}

export interface IFAQItem {
  question: string;
  answer: string;
}

export interface IFAQ {
  title: string;
  items: IFAQItem[];
}

export interface ITestimonial {
  quote: string;
  author: string;
}

export interface ITestimonialsSection {
  testimonials: ITestimonial[];
  backgroundImage?: string;
}

export interface ICTA {
  title: string;
  subtitle: string;
}

export interface IHomeContent {
  heroSection: IHeroSection;
  intro: IIntro;
  features: IFeatureItem[];
  whyModularPanelized: IWhyModularPanelized;
  experienceMetrics: IExperienceMetric[];
  faq: IFAQ;
  cta: ICTA;
  testimonials: ITestimonial[];
  testimonialsBackgroundImage: string;
  metadataImage: string;
}
