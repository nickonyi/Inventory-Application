import { body } from "express-validator";

export const validateGame = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required!")
    .isLength({ min: 1, max: 50 })
    .withMessage("Title is between 1 and 50 characters"),
  body("released")
    .trim()
    .notEmpty()
    .withMessage("Release year is required")
    .isInt({ min: 1950, max: 2050 })
    .withMessage("Release year must between 1950 and 2050")
    .toInt(),
];

export const validateName = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name should not be empty")
    .isLength({ min: 1, max: 50 })
    .withMessage("Name is between 1 and 50 characters"),
];
