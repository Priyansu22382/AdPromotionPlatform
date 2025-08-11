const express = require("express");
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });
  next();
};

const isCompany = (req, res, next) => {
  if (req.user.role !== "company") return res.status(403).json({ message: "Access denied" });
  next();
};

const isCabDriver = (req, res, next) => {
  if (req.user.role !== "cab-driver") return res.status(403).json({ message: "Access denied" });
  next();
};

module.exports={isAdmin, isCompany, isCabDriver};