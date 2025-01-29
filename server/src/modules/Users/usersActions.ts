import { DatabaseModule } from "@faker-js/faker/.";
import type { NextFunction, Request, RequestHandler, Response } from "express";
import usersRepository from "./usersRepository";

type usersprops = {
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

interface LoginRequestBody {
  email: string;
  password: string;
}

interface UserLoginData {
  id: number;
  firstname: string;
  email: string;
  password: string;
  role: string;
}

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all items READALL
    const users = await usersRepository.readAll();
    res.json(users);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const browserForLogin = async (
  req: Request, // Typage de req
  res: Response, // Typage de res
  next: NextFunction, // Typage de next
): Promise<void> => {
  try {
    const { email, password } = req.body as LoginRequestBody;

    console.info(" email => ", email);
    // Fetch all items READALL
    const userslogin = (await usersRepository.readForLogin(
      email,
    )) as UserLoginData[];

    if (!userslogin || userslogin.length === 0) {
      // Si l'utilisateur n'est pas trouvé, renvoyer une erreur
      res.status(404).json({ message: "Utilisateur non trouvé" });
      return;
    }

    if (userslogin[0].password !== password) {
      res.status(401).json({ message: "Mot de passe incorrect" });
      return;
    }

    res.status(200).json({
      id: userslogin[0].id,
      firstname: userslogin[0].firstname,
      role: userslogin[0].role,
    });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific item based on the provided ID
    const userId = Number(req.params.id);
    const user = await usersRepository.read(userId);
    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    console.info("Données reçues par le front :", req.body);

    // Extract the user data from the request body
    const newUser: Omit<usersprops, "" | "id"> = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      tel_num: req.body.tel_num || null,
      role: req.body.role || "user",
      address: req.body.address || null,
      zipcode: req.body.zipcode || null,
      city: req.body.city || null,
      country: req.body.country || null,
      picture: req.body.picture || null,
      birthdate: req.body.birthdate || null,
      registration_date: new Date().toISOString() || null,
    };

    const bddCheckEmail = await usersRepository.find(newUser.email);
    console.info("controle info bddcheck", bddCheckEmail);
    // 4 données obligatoire
    if (
      !newUser.firstname ||
      !newUser.lastname ||
      !newUser.email ||
      !newUser.password
    ) {
      res.status(400).json({ error: "Tous les champs sont requis." });
    }

    // Create the user
    if (!bddCheckEmail) {
      const insertUser = await usersRepository.create(newUser);
      console.info(
        "Utilisateur créé avec succès et envoi au front",
        insertUser,
      );
      res.status(201).json(insertUser);
    } else {
      console.info("Utilisateur déjà créé");
      res.status(400).json({ error: "Cet email est déjà utilisé." });
    }
  } catch (err) {
    console.error(
      "utilisateur déjà créé ou Erreur dans usersActions.add :",
      err,
    );
    next(err);
  }
};

const remove: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id); // ID de l'utilisateur à supprimer
    const deleted = await usersRepository.delete(id);
    console.info("cons remove try", deleted);

    if (deleted) {
      // Si l'utilisateur a été trouvé et supprimé, renvoyer une réponse sans contenu (status 204)
      console.info("Utilisateur supprimé avec succès", deleted);
      res.sendStatus(204); // Succès sans contenu
    } else {
      console.info("utilisateur n'existe pas");
      res.sendStatus(404); // Utilisateur introuvable
    }
  } catch (err) {
    console.error("console remove error", err);
    next(err);
  }
};

const update: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific item based on the provided ID
    const id = req.body.id;
    console.info("lecture id", id);
    const userData = req.body;
    console.info("console info du userData dans update", userData);
    const userUpdateData = await usersRepository.edit(Number(id), userData);
    console.info("données renvoyés au front", userUpdateData);
    if (userUpdateData == null) {
      res.sendStatus(404);
    } else {
      res.json(userUpdateData);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse, read, add, remove, browserForLogin, update };
