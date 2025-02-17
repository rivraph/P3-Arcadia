import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type games = {
  id: number;
  game_name: string;
};

class ItemRepository {
  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await databaseClient.query<Rows>("select * from games");

    // Return the array of games
    console.info("lecture du tableau games => ", rows);
    return rows as games[];
  }
}

export default new ItemRepository();
