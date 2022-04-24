export const EachRovers = (rover, store, updateStore) => {
  console.log(rover);
  if (rover) {
    console.log(rover);
    getRoverPhoto(rover, store, updateStore);

    return `
    <h1>this is ${rover}</h1>
  `;
  }
};

const getRoverPhoto = async (rover, store, updateStore) => {
  const photos = await fetch(`http://localhost:3000/rover?name=${rover}`).then(
    (res) => res.json()
  );
  if (store.photos !== photos) updateStore(store, { photos });
};
