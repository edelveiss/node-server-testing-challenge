const db = require("../dbConfig.js");
module.exports = {
  find,
  findById,

  add,
  update,
  remove,
};
function find() {
  return db("cars");
}

function findById(id) {
  return db("cars").where({ id }).first();
}
async function add(car) {
  const [id] = await db("cars").insert(car, "id");

  return db("cars").where({ id }).first();
  //   return db("cars")
  //     .insert(car)
  //     .then((ids) => {
  //       return findById(ids[0]);
  //     });
}
function remove(id) {
  return db("cars")
    .where("id", id)
    .del()
    .then((delRow) => (delRow > 0 ? id : null));
}
function update(id, changes) {
  return db("cars")
    .where({ id })
    .update(changes)
    .then((count) => (count > 0 ? findById(id) : null));
}
