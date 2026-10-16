// Add approved construction photography here. Empty slots intentionally render
// a designed placeholder, never a rendering presented as a completed project.
export type GuidePhoto = {
  src: string | null;
  alt: string;
  caption: string;
  brief: string;
};
export const guidePhotos: Record<string, GuidePhoto> = {
  workshop: {
    src: null,
    alt: 'Fast Struct steel fabrication in progress',
    caption: 'Inside the build',
    brief:
      'Wide factory view showing the team and steel framing. Landscape, 1600 × 1000 px.',
  },
  framing: {
    src: null,
    alt: 'Steel framing during construction',
    caption: 'Structure taking shape',
    brief:
      'Close view of an actual framing assembly. Landscape, 1200 × 900 px.',
  },
  site: {
    src: null,
    alt: 'Site preparation for a Fast Struct project',
    caption: 'Preparing the site',
    brief:
      'Approved project photo showing foundation or site work. Landscape, 1200 × 900 px.',
  },
  detail: {
    src: null,
    alt: 'Construction detail during a Fast Struct build',
    caption: 'A closer look at the work',
    brief:
      'Actual connection, wall assembly or installation detail. Landscape, 1200 × 900 px.',
  },
  process: {
    src: null,
    alt: 'Fast Struct team reviewing a construction plan',
    caption: 'Planning before production',
    brief: 'Team reviewing plans at the factory. Landscape, 1600 × 1000 px.',
  },
};
