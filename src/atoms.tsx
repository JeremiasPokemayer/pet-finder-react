import { atomWithStorage } from "jotai/utils";

export const userAtom = atomWithStorage("user", {
  userId: null,
  fullName: null,
  email: null,
  location: null,
  userLat: null,
  userLng: null,
  password: null,
  token: null,
});

export const petAtom = atomWithStorage("pet", {
  fullName: null,
  location: null,
  petLat: null,
  petLng: null,
  imageUrlData: null,
});

export const petsArrayAtom = atomWithStorage("arrayPets", []);

export const reportAtom = atomWithStorage("reportAtom", {
  reportName: null,
  reportPhone: null,
  location: null,
  userId: null,
});
