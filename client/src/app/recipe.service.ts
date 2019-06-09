import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  url = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) {
  }

  getRecipes() {
    return this.http.get(`${this.url}/recipes`);
  }

  getRecipe(id) {
    return this.http.get(`${this.url}/recipe/` + id);
  }

  getCategories() {
    return this.http.get(`${this.url}/categories`);
  }

  getCuisines() {
    return this.http.get(`${this.url}/cuisines`);
  }

  getCourses() {
    return this.http.get(`${this.url}/courses`);
  }

  getAllergens() {
    return this.http.get(`${this.url}/allergens`);
  }

  addAllergen(allergen) {
    return this.http.post(`${this.url}/allergen`, allergen);
  }

  editAllergen(allergen) {
    return this.http.put(`${this.url}/allergen`, allergen);
  }

  deleteAllergen(allergenId) {
    return this.http.delete(`${this.url}/allergen/${allergenId}`);
  }

}
