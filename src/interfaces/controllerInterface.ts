import { Router } from "express";

interface controller {
  path: string,
  router: Router,
}

export default controller;