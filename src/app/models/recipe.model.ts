export interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string;
  prepTime: number; // en minutes
  imageUrl?: string;
}
