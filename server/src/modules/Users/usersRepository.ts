import type { RowDataPacket } from "mysql2";
import type { Result, Rows } from "../../../database/client";
import databaseClient from "../../../database/client";

type usersprops = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  tel_num: string | null;
  role: string;
};

class usersRepository {
  async create(u: Omit<usersprops, "id" | "">) {
    const [result] = await databaseClient.query<Result>(
      "insert into users (firstname, lastname, email, password, tel_num, role) values (?, ?, ?, ?, ?, ?)",
      [u.firstname, u.lastname, u.email, u.password, u.tel_num, u.role],
    );
    const [sendRole] = await databaseClient.query<RowDataPacket[]>(
      "SELECT role from users where role = ?",
      [u.role],
    );

    return sendRole[0];
  }

  async readByEmailWithPassword(email: string) {
    // Execute the SQL SELECT query to retrieve a specific user by its email
    const [rows] = await databaseClient.query<Rows>(
      "select * from users where email = ?",
      [email],
    );

    // Return the first row of the result, which represents the user
    return rows[0] as usersprops;
  }

  async find(email: string): Promise<usersprops[]> {
    // Execute the SQL SELECT query to retrieve a specific email
    const [rows] = await databaseClient.query<Rows>(
      "select * from users where email = ?",
      [email],
    );

    return rows[0] as usersprops[];
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from users");
    return rows as usersprops[];
  }

  async readForLogin(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT email, password, role FROM users WHERE email = ?",
      [email], // L'email est passé ici dans la requête SQL
    );
    console.info("rows infos => ", rows);
    return rows as usersprops[] | undefined;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM users WHERE id = ?",
      [id], // L'ID est passé ici dans la requête SQL
    );

    console.info("user id", rows);

    return rows as usersprops[] | undefined;
  }

  async delete(id: number) {
    try {
      const [rows] = await databaseClient.query<Rows>(
        "DELETE FROM users WHERE id = ?",
        [id],
      );

      console.info("console rows", rows);
      return rows as usersprops[] | undefined;
    } catch (error) {
      console.error(
        "Erreur lors de la suppression dans usersRepository.delete :",
        error,
      );
      throw error;
    }
  }
}

export default new usersRepository();
