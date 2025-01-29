import type { RowDataPacket } from "mysql2";
import type { Result, Rows } from "../../../database/client";
import databaseClient from "../../../database/client";

type usersprops = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
  tel_num?: string | null;
  address?: string | null;
  zipcode?: string | null;
  city?: string | null;
  country?: string | null;
  picture?: string | null;
  birthdate?: string | null;
  registration_date?: string | null;
};

class usersRepository {
  async create(u: Omit<usersprops, "" | "id">): Promise<usersprops> {
    const [result] = await databaseClient.query<Result>(
      "insert into users (firstname, lastname, email, password, tel_num, role, address, zipcode, city, country, picture, birthdate, registration_date) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        u.firstname,
        u.lastname,
        u.email,
        u.password,
        u.tel_num,
        u.role,
        u.address,
        u.zipcode,
        u.city,
        u.country,
        u.picture,
        u.birthdate,
        u.registration_date,
      ],
    );

    console.info("nouveau user enregistré", result);

    const [sendRole] = await databaseClient.query<RowDataPacket[]>(
      "SELECT * FROM users WHERE id = LAST_INSERT_ID()",
      [u.role],
    );

    return sendRole[0] as usersprops;
  }

  async find(email: string): Promise<usersprops[]> {
    // Execute the SQL SELECT query to retrieve a specific email
    const [rows] = await databaseClient.query<Rows>(
      "select * from users where email = ?",
      [email],
    );
    console.info("lecture de email dans usersRepo", email);
    console.info(
      "Controle BDD si utilisateur non existant renvoi undefined",
      rows[0],
    );
    return rows[0] as usersprops[];
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from users");
    return rows as usersprops[];
  }

  async readForLogin(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT id, firstname, email, password, role FROM users WHERE email = ?",
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

    return rows as usersprops[] | undefined;
  }

  async edit(id: number, userData: Partial<usersprops>) {
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

    const values = [
      userData.firstname,
      userData.lastname,
      userData.email,
      userData.password,
      userData.tel_num,
      userData.address,
      userData.zipcode,
      userData.city,
      userData.country,
      userData.picture,
      userData.birthdate,
      userData.id,
    ];

    console.info("test arrivé userData dans edit => ", values);
    const [rows] = await databaseClient.query<Rows>(query, values);
    console.info("résultat modifié renvoyé à userActions =>", rows);

    return this.read(id);
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
