export interface ICTA {
  text: string;
  link: string;
}

export interface ILandingHero {
  title: string;
  subtitle: string;
  licenses: { label: string; number: string }[];
  cta: ICTA;
  phoneCta: ICTA;
  googleReviewBadge: string;
  backgroundImage: string;
}

export interface IValuePropItem {
  title: string;
  text: string;
}

export interface IValueProp {
  title: string;
  texts: string[];
  features: {
    title: string;
    items: IValuePropItem[];
  };
}

import type { LeadCaptureFormFieldKey } from '@/schemas/contact';

export interface IFormFieldConfig {
  /** Binds this CMS row to the Zod/RHF field name (not inferred from array order). */
  fieldKey: LeadCaptureFormFieldKey;
  label: string;
  placeholder: string;
  type: string;
}

export interface IFormConfig {
  title: string;
  subtitle: string;
  fields: IFormFieldConfig[];
  buttonText: string;
}

export interface ICompanyOverviewItem {
  icon: string;
  title: string;
}

export interface ICompanyOverview {
  title: string;
  texts: string[];
  items: ICompanyOverviewItem[];
  cta: ICTA;
}

export interface IServiceItem {
  title: string;
  description: string;
}

export interface IServicesOverview {
  title: string;
  subtitle: string;
  items: IServiceItem[];
}

export interface IConstructionPath {
  title: string;
  description: string;
  bulletPoints: string[];
}

export interface IConstructionMethods {
  title: string;
  subtitle: string;
  paths: IConstructionPath[];
  cta: ICTA;
}

export interface IProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface IProcessTimeline {
  title: string;
  steps: IProcessStep[];
}

export interface IDifferentiator {
  title: string;
  text: string;
}

export interface IDifferentiators {
  title: string;
  items: IDifferentiator[];
  cta: ICTA;
}

export interface IGalleryItem {
  url: string;
  alt: string;
}

export interface ILocationMainAddress {
  label: string;
  street: string;
  cityStateZip: string;
  mapQuery: string;
}

export interface ILocationPhone {
  display: string;
  tel: string;
}

export interface ILocation {
  title: string;
  mainAddress: ILocationMainAddress;
  phone: ILocationPhone;
  serviceAreas: string[];
}

export interface IFooter {
  title: string;
  subtitle: string;
  licenses: { label: string; number: string }[];
  cta: ICTA;
  phoneCta: ICTA;
  address: string;
}

export interface ILandingContent {
  metadataImage: string;
  heroSection: ILandingHero;
  valueProp: IValueProp;
  leadCapture: IFormConfig;
  companyOverview: ICompanyOverview;
  servicesOverview: IServicesOverview;
  constructionMethods: IConstructionMethods;
  processTimeline: IProcessTimeline;
  differentiators: IDifferentiators;
  testimonials: {
    quote: string;
    author: string;
    location: string;
    rating: number;
  }[];
  gallery: IGalleryItem[];
  location: ILocation;
  footer: IFooter;
}
