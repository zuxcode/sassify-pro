#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = void 0;
const chalk_1 = __importDefault(require("chalk"));
exports.test = console.log(chalk_1.default.bgBlue('Hello'));
console.log(process.argv['3']);
exports.default = {
    body: 'fef',
    bod: 'fef',
};
