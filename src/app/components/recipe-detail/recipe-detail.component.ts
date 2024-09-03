import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../recipe.service';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe | undefined;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.recipe = this.recipeService.getRecipeById(id);
  }

  confirmDelete(): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette recette ?')) {
      if (this.recipe) {
        this.recipeService.deleteRecipe(this.recipe.id);
        this.router.navigate(['/']);  // Rediriger vers la liste des recettes après suppression
      }
    }
  }
}
