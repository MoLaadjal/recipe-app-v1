import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';  // Importer ActivatedRoute et Router
import { RecipeService } from '../../recipe.service';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class RecipeFormComponent implements OnInit {
  recipeForm: FormGroup;
  editingRecipeId: number | null = null;  // Pour stocker l'ID de la recette en cours d'édition

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private route: ActivatedRoute,  // Injecter ActivatedRoute pour obtenir l'ID de l'URL
    private router: Router  // Injecter Router pour la redirection après soumission
  ) {
    this.recipeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      ingredients: this.fb.array([]),  // Initialiser avec un tableau vide
      instructions: ['', [Validators.required, Validators.minLength(10)]],
      prepTime: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.editingRecipeId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.editingRecipeId) {
      const recipe = this.recipeService.getRecipeById(this.editingRecipeId);
      if (recipe) {
        this.loadRecipeIntoForm(recipe);
      }
    } else {
      this.addIngredient();  // Ajouter un champ d'ingrédient par défaut si c'est une nouvelle recette
    }
  }

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  addIngredient() {
    this.ingredients.push(this.fb.control('', Validators.required));
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  loadRecipeIntoForm(recipe: Recipe): void {
    this.recipeForm.patchValue({
      name: recipe.name,
      instructions: recipe.instructions,
      prepTime: recipe.prepTime
    });
    recipe.ingredients.forEach(ingredient => {
      this.ingredients.push(this.fb.control(ingredient, Validators.required));
    });
  }

  onSubmit(): void {
    if (this.recipeForm.valid) {
      const updatedRecipe = this.recipeForm.value;
      if (this.editingRecipeId) {
        updatedRecipe.id = this.editingRecipeId;
        this.recipeService.saveRecipe(updatedRecipe);
      } else {
        this.recipeService.saveRecipe(updatedRecipe);
      }
      this.router.navigate(['/']);  // Rediriger vers la liste des recettes après soumission
    }
  }
}
