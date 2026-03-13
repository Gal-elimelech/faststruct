export interface IContactHero {
  title: string;
  subtitle: string;
}

export interface IContactFormField {
  label: string;
  placeholder: string;
}

export interface IContactFormFields {
  name: IContactFormField;
  email: IContactFormField;
  phone: IContactFormField;
  address: IContactFormField;
  message: IContactFormField;
}

export interface IContactForm {
  title: string;
  description: string;
  fields: IContactFormFields;
  submitButton: string;
  submittingButton: string;
}

export interface IContactAddress {
  street: string;
  city: string;
}

export interface IContactPhone {
  display: string;
  link: string;
}

export interface IContactInfo {
  address: IContactAddress;
  email: string;
  phone: IContactPhone;
  license: string[];
}

export interface ISocialLink {
  name: string;
  url: string;
}

export interface IContactSocial {
  title: string;
  links: ISocialLink[];
}

export interface IContactContent {
  hero: IContactHero;
  form: IContactForm;
  info: IContactInfo;
  social: IContactSocial;
  metadataImage: string;
}
