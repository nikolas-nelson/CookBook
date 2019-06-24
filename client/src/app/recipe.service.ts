import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, Subject} from "rxjs";

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

  addRecipe(recipe) {
    return this.http.post(`${this.url}/recipe`, recipe);
  }

  getCategories() {
    return this.http.get(`${this.url}/categories`);
  }

  addCategory(category) {
    return this.http.post(`${this.url}/category`, category);
  }

  editCategory(category) {
    return this.http.put(`${this.url}/category/${category.id}`, category);
  }

  deleteCategory(categoryId) {
    return this.http.delete(`${this.url}/category/${categoryId}`);
  }

  getCuisines() {
    return this.http.get(`${this.url}/cuisines`);
  }

  getCourses() {
    return this.http.get(`${this.url}/courses`);
  }

  addCourse(course) {
    return this.http.post(`${this.url}/course`, course);
  }

  editCourse(course) {
    return this.http.put(`${this.url}/course/${course.id}`, course);
  }

  deleteCourse(courseId) {
    return this.http.delete(`${this.url}/course/${courseId}`);
  }

  getAllergens() {
    return this.http.get(`${this.url}/allergens`);
  }

  addAllergen(allergen) {
    return this.http.post(`${this.url}/allergen`, allergen);
  }

  editAllergen(allergen) {
    return this.http.put(`${this.url}/allergen/${allergen.id}`, allergen);
  }

  deleteAllergen(allergenId) {
    return this.http.delete(`${this.url}/allergen/${allergenId}`);
  }

  getRecipesByFilter(filter) {
    return this.http.post(`${this.url}/findbyfilter`, filter);
  }

   getRecipesBySearch(filter) {
    return this.http.post(`${this.url}/search`, filter);
  }
  addRating(rating) {
    return this.http.post(`${this.url}/upvote`, rating)
  }

  addComment(comment) {
    return this.http.post(`${this.url}/comment`, comment)
  }

  uploadImage(image) {
    const uploadData = new FormData();
    uploadData.append('image', image, image.name);
    return this.http.post(`${this.url}/img_upload`, uploadData)
  }
}
