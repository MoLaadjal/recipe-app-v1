import { Injectable } from '@angular/core';
import { Recipe } from './models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipes: Recipe[] = [
    {
      id: 1,
      name: 'Spaghetti Bolognese',
      ingredients: [
        '200g de spaghetti',
        '100g de viande hachée',
        '1 oignon',
        '2 gousses d’ail',
        '400g de tomates pelées',
        '2 cuillères à soupe d’huile d’olive',
        'Sel et poivre',
        'Parmesan râpé'
      ],
      instructions: '1. Faites cuire les spaghetti selon les instructions sur le paquet. ' +
                    '2. Dans une poêle, faites revenir l’oignon et l’ail finement hachés dans l’huile d’olive. ' +
                    '3. Ajoutez la viande hachée et faites-la cuire jusqu’à ce qu’elle soit dorée. ' +
                    '4. Ajoutez les tomates pelées et laissez mijoter pendant 15 minutes. ' +
                    '5. Assaisonnez avec du sel et du poivre. ' +
                    '6. Servez les spaghetti avec la sauce bolognese et saupoudrez de parmesan râpé.',
      prepTime: 30,
      imageUrl: 'https://www.example.com/images/spaghetti-bolognese.jpg'
    },
    {
      id: 2,
      name: 'Salade César',
      ingredients: [
        '1 laitue romaine',
        '100g de croûtons',
        '50g de parmesan râpé',
        '2 filets de poulet',
        '4 cuillères à soupe de sauce César',
        '1 cuillère à soupe d’huile d’olive',
        'Sel et poivre'
      ],
      instructions: '1. Faites griller les filets de poulet dans une poêle avec de l’huile d’olive, du sel et du poivre. ' +
                    '2. Lavez et coupez la laitue romaine. ' +
                    '3. Coupez le poulet en tranches fines. ' +
                    '4. Mélangez la laitue, les croûtons, le poulet et le parmesan dans un saladier. ' +
                    '5. Ajoutez la sauce César et mélangez bien. ' +
                    '6. Servez immédiatement.',
      prepTime: 20,
      imageUrl: 'https://www.example.com/images/salade-cesar.jpg'
    },
    {
      id: 3,
      name: 'Poulet Curry Coco',
      ingredients: [
        '4 filets de poulet',
        '1 oignon',
        '2 gousses d’ail',
        '400ml de lait de coco',
        '2 cuillères à soupe de curry en poudre',
        '2 cuillères à soupe d’huile de coco',
        'Sel et poivre',
        'Riz basmati'
      ],
      instructions: '1. Faites cuire le riz basmati selon les instructions sur le paquet. ' +
                    '2. Dans une poêle, faites revenir l’oignon et l’ail finement hachés dans l’huile de coco. ' +
                    '3. Ajoutez les filets de poulet coupés en dés et faites-les dorer. ' +
                    '4. Ajoutez le curry en poudre et mélangez bien. ' +
                    '5. Versez le lait de coco et laissez mijoter à feu doux pendant 20 minutes. ' +
                    '6. Assaisonnez avec du sel et du poivre. ' +
                    '7. Servez le poulet curry coco avec le riz basmati.',
      prepTime: 40,
      imageUrl: 'https://www.example.com/images/poulet-curry-coco.jpg'
    },
    {
      id: 4,
      name: 'Tarte aux Pommes',
      ingredients: [
        '1 pâte brisée',
        '4 pommes',
        '50g de sucre',
        '50g de beurre',
        '1 cuillère à soupe de cannelle',
        '1 cuillère à soupe de jus de citron'
      ],
      instructions: '1. Préchauffez le four à 180°C. ' +
                    '2. Étalez la pâte brisée dans un moule à tarte. ' +
                    '3. Épluchez et coupez les pommes en fines tranches. ' +
                    '4. Disposez les tranches de pommes sur la pâte. ' +
                    '5. Saupoudrez de sucre et de cannelle. ' +
                    '6. Ajoutez quelques noisettes de beurre sur les pommes. ' +
                    '7. Enfournez pendant 30 minutes jusqu’à ce que les pommes soient dorées. ' +
                    '8. Arrosez de jus de citron avant de servir.',
      prepTime: 45,
      imageUrl: 'https://www.example.com/images/tarte-aux-pommes.jpg'
    }
  ];

  constructor() {
    this.loadRecipesFromLocalStorage();
  }

  getRecipes() {
    return this.recipes
  }

  getRecipeById(id: number) {
    return this.recipes.find(recipe => recipe.id === id)
  }

  saveRecipe(recipe: Recipe): void {
    const existingRecipeIndex = this.recipes.findIndex(r => r.id === recipe.id);

    if (existingRecipeIndex > -1) {
      // Mise à jour de la recette existante
      this.recipes[existingRecipeIndex] = recipe;
    } else {
      // Ajout d'une nouvelle recette
      recipe.id = this.generateUniqueId(); // Génère un nouvel ID unique
      this.recipes.push(recipe);
    }

    this.saveRecipesToLocalStorage();
  }

  deleteRecipe(id: number): void {
    this.recipes = this.recipes.filter(recipe => recipe.id !== id);
    this.saveRecipesToLocalStorage();
  }
  private generateUniqueId(): number {
    return this.recipes.length > 0 ? Math.max(...this.recipes.map(r => r.id)) + 1 : 1;
  }

  private saveRecipesToLocalStorage(): void {
    localStorage.setItem('recipes', JSON.stringify(this.recipes));
  }

  private loadRecipesFromLocalStorage(): void {
    const recipesData = localStorage.getItem('recipes');
    if (recipesData) {
      this.recipes = JSON.parse(recipesData);
    }
  }
}


