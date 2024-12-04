import { Animal } from "./api";

export function initializeAnimal(): Animal {
    return {
        id: "0000",
        name: "",
        description: "",
        pet_type: "",
        age: 0,
        weight: 0,
        colour: [],
        breed: [],
        sex: "",
        location: "",
        images: [],
        since: new Date(),
        date_created: new Date(),
        url: "",
        compatibility: {
            adoption_pending: "",
            bonded: "",
            featured_pet: "",
            house_trained: "",
            in_foster: "",
            indoor_only: "",
            indoor_outdoor: "",
            lived_with_kids: "",
            longterm_resident: "",
            ok_with_cats: "",
            ok_with_dogs: "",
            ok_with_livestock: "",
            special_needs: "",
            staff_pick: "",
        },
    };
}