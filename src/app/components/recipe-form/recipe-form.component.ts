import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RecipeService } from '../../recipe.service';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css'],
})
export class RecipeFormComponent {
  recipeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private router: Router
  ) {
    this.recipeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      ingredients: this.fb.array([
        this.fb.control('', Validators.required)
      ]),
      instructions: ['', [Validators.required, Validators.minLength(10)]],
      prepTime: ['', [Validators.required, Validators.min(1)]]
    });
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  addIngredient() {
    this.ingredients.push(this.fb.control('', Validators.required));
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  onSubmit(): void {
    if (this.recipeForm.valid) {
      const newRecipe: Recipe = {
        ...this.recipeForm.value,
        id: Date.now(),  // Génère un ID unique
      };
      this.recipeService.saveRecipe(newRecipe);
      this.router.navigate(['/']); // Redirige vers la page d'accueil ou une autre page
    }
  }
}
