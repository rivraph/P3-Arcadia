import type { Rows } from "../../../database/client";
import databaseClient from "../../../database/client";

class scoresRepository {
  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT s.id, s.users_id, s.user_points, u.firstname FROM scores AS s JOIN users AS u ON s.id = ?",
      [id], // L'ID est passé ici dans la requête SQL
    );
    console.info("valeur lu dans scoresRepo et renvoyé à scoresAction", rows);
    return rows;
  }

  async edit(id: number) {
    const query = `
      UPDATE users SET
        firstname = ?,
        lastname = ?,
        email = ?,
        password = ?,
        tel_num = ?,
        address = ?,
        zipcode = ?,
        city = ?,
        country = ?,
        picture = ?,
        birthdate = ?
      WHERE id = ?`;

    console.info("test arrivé userData dans edit => ");
    const [rows] = await databaseClient.query<Rows>(query);
    console.info("résultat modifié renvoyé à userActions =>", rows);

    return this.read(id);
  }
}

export default new scoresRepository();
