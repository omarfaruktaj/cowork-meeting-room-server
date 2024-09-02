import express from "express";
import cors from "cors";
import morgan from "morgan";

const middlewares = [cors(), express.json(), morgan("tiny")];

export default middlewares;
