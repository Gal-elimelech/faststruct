export interface IPrivacyPolicySection {
  title: string;
  paragraphs: string[];
  listItems?: string[];
}

export interface IPrivacyPolicyContent {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: IPrivacyPolicySection[];
}
