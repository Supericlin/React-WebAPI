"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const koa_router_1 = __importDefault(require("koa-router"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const articlesmodel = __importStar(require("../models/articles"));
const auth_1 = require("../controllers/auth");
const validation_1 = require("../controllers/validation");
const router = new koa_router_1.default({ prefix: '/api/v1/articles' });
exports.router = router;
const getAll = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    let articles = yield articlesmodel.getAll();
    if (articles.length) {
        ctx.body = articles;
    }
    else {
        ctx.body = {};
    }
    yield next();
});
const getById = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    let id = ctx.params.id;
    let article = yield articlesmodel.getById(id);
    if (article.length) {
        // Lab 8 updated: Only delegated user can read the articles: 
        if (ctx.state.user.id == article[0].authorid) {
            ctx.body = article[0];
        }
        else {
            ctx.status = 401;
            ctx.body = { msg: 'You are not authorized' };
        }
        // Update completed
    }
    else {
        ctx.status = 404;
    }
    yield next();
});
const createArticle = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = ctx.request.body;
    // Lab 8 updated: Only delegated user can add the articles
    // Need update the body with the authorid (id) 
    // Note: JSON does not include the authorid
    if (ctx.state.user.id) {
        Object.defineProperty(body, "authorid", { value: ctx.state.user.id, writable: false, enumerable: true, configurable: true });
        let result = yield articlesmodel.add(body);
        if (result.status == 201) {
            ctx.status = 201;
            ctx.body = body;
        }
        else {
            ctx.status = 500;
            ctx.body = { err: "Insert data failed" };
        }
    }
    else {
        ctx.status = 401;
        ctx.body = { msg: 'You are not authorized' };
    }
    yield next();
});
const updateArticle = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Lab 8 updated: Only delegated user can update the articles: 
    // No action if the user is not correct
    let article = yield articlesmodel.getById(ctx.params.id);
    if (article.length) {
        if (ctx.state.user.id == article[0].authorid) {
            const body = ctx.request.body;
            let result = yield articlesmodel.update(parseInt(ctx.params.id), body);
            switch (result.status) {
                case 201:
                    ctx.status = 201;
                    ctx.body = { description: 'Data update succesfully' };
                    break;
                case 404:
                    ctx.status = 404;
                    ctx.body = { description: 'ID not found and no data updated' };
                    break;
                default:
                    ctx.status = 500;
                    ctx.body = { err: "Update data failed" };
                    break;
            }
        }
    }
    else {
        ctx.status = 404;
    }
    yield next();
});
const deleteArticle = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Lab 8 updated: Only delegated user can update the articles: 
    // No action if the user is not correct
    let article = yield articlesmodel.getById(ctx.params.id);
    if (article.length) {
        if (ctx.state.user.id == article[0].authorid) {
            yield articlesmodel.deleteArticle(parseInt(ctx.params.id));
            ctx.status = 200;
            ctx.body = { status: 'operation successfully' };
        }
        else {
            ctx.status = 401;
            ctx.body = { msg: 'You are not authorized' };
        }
    }
    else {
        ctx.status = 404;
        ctx.body = { msg: 'Article not found' };
    }
    yield next();
});
router.get('/', getAll);
router.get('/:id([0-9]{1,})', auth_1.basicAuth, getById);
router.post('/', auth_1.basicAuth, (0, koa_bodyparser_1.default)(), validation_1.validateArticle, createArticle);
router.put('/:id([0-9]{1,})', auth_1.basicAuth, (0, koa_bodyparser_1.default)(), validation_1.validateArticle, updateArticle);
router.delete('/:id([0-9]{1,})', auth_1.basicAuth, deleteArticle);
