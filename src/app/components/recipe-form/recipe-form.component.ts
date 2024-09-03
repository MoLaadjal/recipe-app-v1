import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { RecipeService } from '../../recipe.service';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule]  // Import ReactiveFormsModule directly
})
export class RecipeFormComponent {
  recipeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.recipeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      ingredients: this.fb.array([this.fb.control('', Validators.required)]),
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
      const newRecipe = this.recipeForm.value;
      console.log('Recipe submitted:', newRecipe);
    }
  }
}
