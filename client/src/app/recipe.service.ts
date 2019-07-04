import {Injectable} from '@angular/core';
import {HttpClient,} from '@angular/common/http';
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) {
  }

  getRecipes() {
    return this.http.get(`${environment.apiUrl}/recipes`);
  }

  getRecipesCuisine(cuisineName) {
    return this.http.post(`${environment.apiUrl}/recipecuisine`, cuisineName);
  }

  getRecipesCategory(categoryName) {
    return this.http.post(`${environment.apiUrl}/recipecategory`, categoryName);
  }

  getRecipesCourses(coursesName) {
    return this.http.post(`${environment.apiUrl}/recipecourses`, coursesName);
  }

  getTopRecipes() {
    return this.http.get(`${environment.apiUrl}/toprecipes`);
  }

  getRecipe(id) {
    return this.http.get(`${environment.apiUrl}/recipe/` + id);
  }

  addRecipe(recipe) {
    return this.http.post(`${environment.apiUrl}/recipe`, recipe);
  }

   editRecipe(recipe) {
    return this.http.put(`${environment.apiUrl}/recipe/${recipe.id}`, recipe);
  }

  deleteRecipe(recipeId) {
    return this.http.delete(`${environment.apiUrl}/recipe/${recipeId}`);
  }

  getCategories() {
    return this.http.get(`${environment.apiUrl}/categories`);
  }

  addCategory(category) {
    return this.http.post(`${environment.apiUrl}/category`, category);
  }

  editCategory(category) {
    return this.http.put(`${environment.apiUrl}/category/${category.id}`, category);
  }

  deleteCategory(categoryId) {
    return this.http.delete(`${environment.apiUrl}/category/${categoryId}`);
  }

  getCuisines() {
    return this.http.get(`${environment.apiUrl}/cuisines`);
  }

  getCourses() {
    return this.http.get(`${environment.apiUrl}/courses`);
  }

  addCourse(course) {
    return this.http.post(`${environment.apiUrl}/course`, course);
  }

  editCourse(course) {
    return this.http.put(`${environment.apiUrl}/course/${course.id}`, course);
  }

  deleteCourse(courseId) {
    return this.http.delete(`${environment.apiUrl}/course/${courseId}`);
  }

  getAllergens() {
    return this.http.get(`${environment.apiUrl}/allergens`);
  }

  addAllergen(allergen) {
    return this.http.post(`${environment.apiUrl}/allergen`, allergen);
  }

  editAllergen(allergen) {
    return this.http.put(`${environment.apiUrl}/allergen/${allergen.id}`, allergen);
  }

  deleteAllergen(allergenId) {
    return this.http.delete(`${environment.apiUrl}/allergen/${allergenId}`);
  }

  getRecipesByFilter(filter) {
    return this.http.post(`${environment.apiUrl}/findbyfilter`, filter);
  }

  getRecipesBySearch(filter) {
    return this.http.post(`${environment.apiUrl}/search`, filter);
  }

  addRating(rating) {
    return this.http.post(`${environment.apiUrl}/upvote`, rating)
  }

  addComment(comment) {
    return this.http.post(`${environment.apiUrl}/comment`, comment)
  }

  editComment(comment) {
    return this.http.put(`${environment.apiUrl}/comment/${comment.id}`, comment);
  }

  deleteComment(commentId) {
    return this.http.delete(`${environment.apiUrl}/comment/${commentId}`);
  }

  register(user) {
    return this.http.post(`${environment.apiUrl}/register`, user)
  }

  uploadImage(image) {
    const uploadData = new FormData();
    uploadData.append('image', image, image.name);
    return this.http.post(`${environment.apiUrl}/img_upload`, uploadData)
  }
}
