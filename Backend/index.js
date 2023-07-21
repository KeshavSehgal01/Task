import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bcrypt from "bcrypt"; // Import the bcrypt module

const app = express();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "task",
});

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.json("This is backend");
});

app.get("/get_users", (req, res) => {
  const q = "SELECT * FROM users";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.put("/update_user/:id", (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;

  const q = "UPDATE users SET ? WHERE id = ?";
  db.query(q, [updatedUser, userId], (err, data) => {
    if (err) return res.json(err);
    return res.json("User Updated Successfully");
  });
});

app.put("/update_password/:id", async (req, res) => {
  const userId = req.params.id;
  const { Password } = req.body;

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(Password, saltRounds);

    const q = "UPDATE users SET `Password` = ? WHERE `id` = ?";
    const values = [hashedPassword, userId];

    db.query(q, values, (err, data) => {
      if (err) return res.json(err);
      return res.json("Password Updated Successfully");
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

app.post("/login", (req, res) => {
  const Email = req.body.Email;
  const Password = req.body.Password;

  db.query(
    "SELECT * FROM users WHERE Email = ? AND Password = ?",
    [Email, Password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        console.log(result);
        res.send({ data: result, isLoggedIn: true });
      } else {
        res.send({ isLoggedIn: false });
      }
    }
  );
});

app.delete("/delete_user/:id", (req, res) => {
  const userId = req.params.id;

  const q = "DELETE FROM users WHERE `id` = ?";
  const values = [userId];

  db.query(q, values, (err, data) => {
    if (err) return res.json(err);
    return res.json("User Deleted Successfully");
  });
});

app.listen(8800, () => {
  console.log("Connected to Backend!");
});
