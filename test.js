const dummyStore = {
  name: "ABC",
  address: "dhanmondi 11/a",
  city: null,
  telephone: null,
  email: "info@abc.com",
  lat: 25.123,
  lng: 55.321,
};
const cleanStore = Object.fromEntries(
  Object.entries(dummyStore).filter(([_, v]) => v != null && v !== "")
);

console.log(cleanStore);
