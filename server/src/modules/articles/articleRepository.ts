import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

type articleProps = {
  id: number;
  article_name: string;
  description: string;
};

class articleRepository {
  async readAll() {
    // Execute the SQL SELECT query to retrieve all articles from the "articles table
    const [rows] = await databaseClient.query<Rows>("select * from articles");

    // Return the array of articles;
    return rows as articleProps[];
  }
}

export default new articleRepository();
