export class Recipe {
  allergens: Array<Allergens>;
  categories: Array<Category>;
  comments: Array<Comment>;
  cook_time: number;
  courses: Array<Course>;
  cuisine: Cuisine;
  cuisine_id: number;
  description: string;
  id: number;
  image_path: string;
  ingredients: Array<Ingredient>;
  level: string;
  name: string;
  prep_time: number;
  rating: string;
  source: string;
  steps: Array<Step>;
  time_added: Date;
  total_time: number;
  user: User;
}

export class Allergens {
  id: number;
  name: string;
}

export class Category {
  id: number;
  name: string;
  description: string;
}

export class Course {
  id: number;
  name: string;
}

export class Cuisine {
  id: number;
  name: string;
  description: string;
}

export class Ingredient {
  id: number;
  amount: string;
  ingredient: string;
  measurement: string;
}

export class User {
  id: number;
  name: string;
}

export class Step {
  id: number;
  instructions: string;
  step_number: number;
}

export class Comment {
comment: string;
email: string;
id: number;
name: string;
recipes_id: number;
user_id: number;
}
