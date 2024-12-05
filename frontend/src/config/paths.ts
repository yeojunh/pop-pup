export const paths = {
  home: {
    path: "/",
    getHref: () => "/",
  },
  app: {
    root: {
      path: "/app",
      getHref: () => "/app",
    },
    dogs: {
      path: "/dogs",
      getHref: () => "/app/dogs",
    },
    cats: {
      path: "/cats",
      getHref: () => "/app/cats",
    },
    small_animals: {
      path: "/small_animals",
      getHref: () => "/app/small_animals",
    },
    farm_animals: {
      path: "/farm_animals",
      getHref: () => "/app/farm_animals",
    },
    cold_blooded_animals: {
      path: "/other_animals",
      getHref: () => "/app/other_animals",
    },
    animal: {
      path: "/animal/:id",
      getHref: (id: string) => `/app/animal/${id}`,
    },
    profile: {
      path: "profile",
      getHref: () => "/app/profile",
    },
  },
} as const;
