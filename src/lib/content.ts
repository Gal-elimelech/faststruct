import type { ContentKey, IContentMap, Language } from '@/types/content';
import { IModule } from '@/types/modules';
import type { IHomeContent } from '@/types/home';
import type { IAboutContent } from '@/types/about';
import type { IContactContent } from '@/types/contact';
import type { IModulesPageContent } from '@/types/modulesPage';
import type { IProcess } from '@/types/process';
import type { ITheSystemContent } from '@/types/theSystem';
import type { IProductContent } from '@/types/product';

// Static imports of all content JSON files
import homeContentEn from '@/content/en/home.json';
import modulesContentEn from '@/content/en/modules.json';
import aboutContentEn from '@/content/en/about.json';
import contactContentEn from '@/content/en/contact.json';
import modulesPageContentEn from '@/content/en/modulesPage.json';
import processContentEn from '@/content/en/process.json';
import theSystemContentEn from '@/content/en/theSystem.json';

// Content map: maps [language][page] to content
// Note: 'product' is included in IContentMap but not used in the codebase.
// Using a placeholder to satisfy the type requirement.
const contentMap: Record<Language, IContentMap> = {
  en: {
    home: homeContentEn as IHomeContent,
    modules: modulesContentEn as IModule[],
    about: aboutContentEn as IAboutContent,
    product: {} as IProductContent, // Placeholder - not used in codebase
    contact: contactContentEn as IContactContent,
    modulesPage: modulesPageContentEn as IModulesPageContent,
    process: processContentEn as IProcess,
    theSystem: theSystemContentEn as ITheSystemContent,
  },
};

/**
 * Get content for a specific page and language.
 * Now uses static imports instead of file system reads for better performance and SSG support.
 * @param page - The page key
 * @param lang - The language (defaults to 'en')
 * @returns The content for the specified page and language
 */
export async function getContent<K extends ContentKey>(
  page: K,
  lang: Language = 'en'
): Promise<IContentMap[K]> {
  // Fallback to 'en' if language not found
  const language = contentMap[lang] ? lang : 'en';
  const content = contentMap[language][page];

  if (!content) {
    console.warn(
      `[getContent] Missing content for page="${page}" lang="${language}". Falling back to "en".`
    );
    // Fallback to English
    return contentMap.en[page] as IContentMap[K];
  }

  return content as IContentMap[K];
}

/**
 * Get all modules sorted by area (descending).
 * @param lang - The language (defaults to 'en')
 * @returns Sorted array of modules
 */
export const getModules = async (lang: Language = 'en'): Promise<IModule[]> => {
  return (await getContent('modules', lang)).sort(
    (a, b) => b.specs.areaSqft - a.specs.areaSqft
  );
};
