import type { ResultSetHeader } from "mysql2";
import type { Rows } from "../../../database/client";
import databaseClient from "../../../database/client";

class scoresRepository {
  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT s.id, s.users_id, s.user_points, u.firstname FROM scores AS s JOIN users AS u ON s.id = ?",
      [id], // L'ID est passé ici dans la requête SQL
    );
    return rows;
  }

  async edit(id: number, newPoints: number) {
    const query = `
      UPDATE scores 
      SET user_points = ?
      WHERE id = ?`;

    console.info("test arrivé userData dans edit => ", query);
    const [result] = await databaseClient.query<ResultSetHeader>(query, [
      newPoints,
      id,
    ]);
    console.info("résultat de la MAJ =>", result);

    if (result.affectedRows === 0) {
      console.warn("Aucune ligne mise à jour, l'ID n'existe peut-être pas.");
      return null;
    }
    return this.read(id);
  }
}

export default new scoresRepository();
