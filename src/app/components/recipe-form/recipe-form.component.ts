import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  editingRecipeId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.recipeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      ingredients: this.fb.array([]),
      instructions: ['', [Validators.required, Validators.minLength(10)]],
      prepTime: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.editingRecipeId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadForm();
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

  private loadForm(): void {
    if (this.editingRecipeId) {
      const recipe = this.recipeService.getRecipeById(this.editingRecipeId);
      if (recipe) {
        this.recipeForm.patchValue({
          name: recipe.name,
          instructions: recipe.instructions,
          prepTime: recipe.prepTime
        });
        recipe.ingredients.forEach(ingredient => {
          this.ingredients.push(this.fb.control(ingredient, Validators.required));
        });
      }
    } else {
      this.addIngredient();  // Ajouter un champ d'ingrédient par défaut
    }
  }

  onSubmit(): void {
    if (this.recipeForm.valid) {
      const recipeData = this.recipeForm.value;
      if (this.editingRecipeId) {
        recipeData.id = this.editingRecipeId;
      }
      this.recipeService.saveRecipe(recipeData);
      this.router.navigate(['/']);  // Rediriger vers la liste des recettes après soumission
    }
  }
}
