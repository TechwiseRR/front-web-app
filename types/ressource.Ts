export type RessourceStatus = "published" | "pending" | "refused" | "draft";

export type Ressource = {
  id: number;
  title: string;
  content: string;
  publicationDate: string;
  status: RessourceStatus;
  validationDate: string | null;
  upvotes: number;
  downvotes: number;
  category_id: number;
  author_id: number;
  validator_id: number | null;
  author: { id: number; name: string };
  validator?: { id: number; name: string };
  category?: { id: number; name: string };
};
