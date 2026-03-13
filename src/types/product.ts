export interface IHeroProduct {
  title: string;
  subtitle: string;
  backgroundImage: string;
}

export interface ISpecification {
  label: string;
  value: number;
}

export interface ISpecifications {
  floorPlanImage: string;
  floorPlanLabel: string;
  area: string;
  specs: ISpecification[];
}

export interface IProductDescription {
  image: string;
  paragraph: string;
}

export interface IStackedImage {
  url: string;
  alt?: string;
}

export interface IStackedImages {
  images: IStackedImage[];
}

export interface IExplore {
  title: string;
  subtitle: string;
}

export interface IProductContent {
  hero: IHeroProduct;
  specifications: ISpecifications;
  description: IProductDescription;
  stackedImages: IStackedImages;
  explore: IExplore;
}

