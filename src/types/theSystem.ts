export interface IHeroSystem {
  title: string;
  subtitle: string;
  backgroundImageDesktop: string;
  backgroundImageMobile: string;
}

export interface IConstructionRoute {
  title: string;
  description: string;
  imageUrl: string;
  bulletPoints: string[];
}

export interface ITwoPaths {
  title: string;
  subtitle: string;
  modular: IConstructionRoute;
  panelized: IConstructionRoute;
}

export interface INineCoreSystem {
  title: string;
  subtitle: string;
}

export interface IScalableSolution {
  icon: string;
  subtitle: string;
  title: string;
  description: string;
}

export interface IScalableSolutions {
  title: string;
  subtitle: string;
  solutions: IScalableSolution[];
}

export interface ICustomizationOption {
  title: string;
  description: string;
  imageUrl: string;
}

export interface ICustomization {
  title: string;
  subtitle: string;
  options: ICustomizationOption[];
}

export interface ITheSystemContent {
  hero: IHeroSystem;
  twoPaths: ITwoPaths;
  nineCoreSystem: INineCoreSystem;
  scalableSolutions: IScalableSolutions;
  customization: ICustomization;
}
