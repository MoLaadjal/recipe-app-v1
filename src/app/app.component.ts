import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Recipe } from './models/recipe.model';
import { RecipeService } from './recipe.service';
import { RecipeListComponent } from "./components/recipe-list/recipe-list.component";
import { HeaderComponent } from "./components/header/header.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RecipeListComponent,
    HeaderComponent,
    FormsModule, // Add this line
    ReactiveFormsModule // Add this line
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Fix typo: styleUrl -> styleUrls
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
