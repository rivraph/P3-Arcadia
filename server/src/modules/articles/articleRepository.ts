import databaseClient from "../../../database/client";

import type { Rows } from "../../../database/client";

type articleProps = {
  id: number;
  article_name: string;
  description: string;
};

class articleRepository {
  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await databaseClient.query<Rows>("select * from articles");

    // Return the array of games
    console.info("lecture du tableau article => ", rows);
    return rows as articleProps[];
  }
}

export default new articleRepository();
