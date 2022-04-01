// CategoriesRepositories
// here is where goes all operations in the database related to categories

const db = require('../../database');

class CategoriesRepository {
  // List all categories
  async findAll() {
    const rows = await db.query('SELECT * FROM categories ORDER BY name');
    return rows;
  }

  // find category by id, useful for look if a category exists

  async findById(id) {
    const row = await db.query('SELECT * FROM categories WHERE id = $1', [id]);
    return row;
  }

  // Create a new category

  async create({ name }) {
    const [row] = await db.query(`
      INSERT INTO categories(name)
      VALUES($1)
      RETURNING *
    `, [name]);
    return row;
  }

  // Update category

  async update({ name, id }) {
    const [row] = await db.query(`
      UPDATE categories
      SET name = $1
      WHERE id = $2
    `, [name, id]);

    return row;
  }

  // Delete category

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM categories WHERE id = $1', [id]);
    return deleteOp;
  }
}

module.exports = new CategoriesRepository();
