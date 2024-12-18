export type Animal = {
  id: string;
  name: string;
  description: string;
  pet_type: string;
  age: string;
  weight: number;
  colour: string[];
  breed: string[];
  sex: string;
  location: string;
  images: string[];
  since: Date;
  date_created: Date;
  url: string;
  compatibility: Compatibility;
};

export type Compatibility = {
  adoption_pending: string;
  bonded: string;
  featured_pet: string;
  house_trained: string;
  in_foster: string;
  indoor_only: string;
  indoor_outdoor: string;
  lived_with_kids: string;
  longterm_resident: string;
  ok_with_cats: string;
  ok_with_dogs: string;
  ok_with_livestock: string;
  special_needs: string;
  staff_pick: string;
};

export type Recommendation = {
  id: string;
  name: string;
  description: string;
  pet_type: string;
  age: number;
  weight: number;
  colour: string[];
  breed: string[];
};