export interface AddonItem {
  id: string;
  slug: string;
  title: string;
  author: string;
  category: string;
  verifiedBy: string;
  fileSize: string;
  youtubeVideoId?: string;
  downloadUrl: string;
  description: string[];
}
