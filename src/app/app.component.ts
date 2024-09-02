import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Recipe } from './models/recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'recipe-app-v1';
  recipes: Recipe[] = [];
  constructor(private recipeService: RecipeService) {
}

ngOnInit() {
  this.recipes = this.recipeService.getRecipes();
  this.recipeService.getRecipes();
  console.log(this.recipes);
}

}
