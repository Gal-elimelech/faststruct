import { IModule } from './modules';
import { IAboutContent } from './about';
import { IHomeContent } from './home';
import { IProductContent } from './product';
import { IContactContent } from './contact';
import { IModulesPageContent } from './modulesPage';
import { IProcess } from './process';
import { ITheSystemContent } from './theSystem';
import { ILandingContent, ILandingFireContent } from './landing';
import { IPrivacyPolicyContent } from './privacyPolicy';
import { IConsentContent } from './consent';

export interface IContentMap {
  home: IHomeContent;
  modules: IModule[];
  about: IAboutContent;
  product: IProductContent;
  contact: IContactContent;
  modulesPage: IModulesPageContent;
  process: IProcess;
  theSystem: ITheSystemContent;
  landingAdu: ILandingContent;
  landingModular: ILandingContent;
  landingNonCombustible: ILandingFireContent;
  privacyPolicy: IPrivacyPolicyContent;
  consent: IConsentContent;
}

export type ContentKey = keyof IContentMap;

export type Language = 'en';
