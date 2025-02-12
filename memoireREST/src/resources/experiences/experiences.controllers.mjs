import { pool } from "../../db/connect.mjs";
import { createCustomError } from "../../errors/customErrors.js";
import { tryCatchWrapper } from "../../middlewares/tryCatchWrapper.mjs";

/**
 * @description Create experience
 * @route POST /experience
 */
export const createExperience = tryCatchWrapper(async function (req, res, next) {
    const { username, title, rating, description, img } = req.body;

    if (!username || !title || rating === undefined) {
        return next(createCustomError("Username, title, and rating are required", 400));
    }

    const parsedRating = parseInt(rating, 10);
    if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
        return next(createCustomError("Rating must be a number between 1 and 5", 400));
    }

    const safeDescription = description || null;
    const safeImg = img || null;

    let sql = "INSERT INTO Experiences (username, title, rating, description, img) VALUES (?, ?, ?, ?, ?)";

    console.log('SQL Query:', sql);
    console.log('Query Parameters:', [username, title, parsedRating, safeDescription, safeImg]);

    await pool.query(sql, [username, title, parsedRating, safeDescription, safeImg]);

    return res.status(201).json({ message: "Experience has been created" });
});

/**
 * @returns Experience object or null if not found
 */
async function getExperience(id) {
    let sql = "SELECT * FROM Experiences WHERE id = ?";
    const [rows] = await pool.query(sql, [id]);
    return rows.length ? rows[0] : null;
}

/**
 * @description Get All Experiences
 * @route GET /experiences
 */
export const getAllExperiences = tryCatchWrapper(async function (req, res, next) {
    let sql = "SELECT * FROM Experiences ORDER BY id DESC";
    const [rows] = await pool.query(sql);

    if (!rows.length) {
        return res.status(204).json({ message: "No experiences found" });
    }

    return res.status(200).json({ experiences: rows });
});

/**
 * @description Get Single experience
 * @route GET /experiences/:id
 */
export const getSingleExperience = tryCatchWrapper(async function (req, res, next) {
    const { id } = req.params;

    if (!id) {
        return next(createCustomError("Experience ID is required", 400));
    }

    const experience = await getExperience(id);
    if (!experience) {
        return next(createCustomError("Experience not found", 404));
    }

    return res.status(200).json(experience);
});

/**
 * @description Update experience
 * @route PATCH /experiences/:id
 */
export const updateExperience = tryCatchWrapper(async function (req, res, next) {
    const { id } = req.params;
    const { title, rating, description } = req.body;

    if (!id || !title || rating === undefined) {
        return next(createCustomError("Title, rating, and ID are required", 400));
    }

    const parsedRating = parseInt(rating, 10);
    if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
        return next(createCustomError("Rating must be a number between 1 and 5", 400));
    }

    const experience = await getExperience(id);
    if (!experience) {
        return next(createCustomError("Experience not found", 404));
    }

    let sql = "UPDATE Experiences SET title = ?, rating = ?, description = ?, last_updated = NOW() WHERE id = ?";
    await pool.query(sql, [title, parsedRating, description || null, id]);

    return res.status(200).json({ message: "Experience has been updated" });
});

/**
 * @description Delete experience
 * @route DELETE /experiences/:id
 */
export const deleteExperience = tryCatchWrapper(async function (req, res, next) {
    const { id } = req.params;

    if (!id) {
        return next(createCustomError("Experience ID is required", 400));
    }

    const experience = await getExperience(id);
    if (!experience) {
        return next(createCustomError("Experience not found", 404));
    }

    let sql = "DELETE FROM Experiences WHERE id = ?";
    await pool.query(sql, [id]);

    return res.status(200).json({ message: "Experience has been deleted" });
});
