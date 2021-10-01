"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const task_service_1 = require("../../tasks/task.service");
const task_1 = require("../../tasks/task");
let CategoryService = class CategoryService {
    constructor(categoryModel, taskModel) {
        this.categoryModel = categoryModel;
        this.taskModel = taskModel;
    }
    async getAllCategories() {
        return await this.categoryModel.find().exec();
    }
    async getCategoryByName(name) {
        return await this.categoryModel.findOne({ name: name }).exec();
    }
    async createCategory(category) {
        const createdCategory = new this.categoryModel(category);
        return await createdCategory.save();
    }
    async updateCategoryByName(name, newCategory) {
        await this.taskModel.updateMany({ category: name }, { category: newCategory.name }).exec();
        await this.categoryModel.updateOne({ name: name }, { name: newCategory.name }).exec();
        return this.getCategoryByName(newCategory.name);
    }
    async deleteCategoryByName(name) {
        await this.taskModel.updateMany({ category: name }, { category: "" }).exec();
        return await this.categoryModel.deleteOne({ name: name }).exec();
    }
};
CategoryService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Category')),
    __param(1, mongoose_1.InjectModel('Task')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map