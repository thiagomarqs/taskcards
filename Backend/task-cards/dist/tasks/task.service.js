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
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const category_1 = require("../categories/category/category");
let TaskService = class TaskService {
    constructor(taskModel) {
        this.taskModel = taskModel;
    }
    async getAll() {
        return await this.taskModel.find().exec();
    }
    async getById(id) {
        return await this.taskModel.findById(id).exec();
    }
    async getByCategory(category) {
        return await this.taskModel.find({ category: category }).exec();
    }
    async createTask(task) {
        const createdTask = new this.taskModel(task);
        return await createdTask.save();
    }
    async updateTask(id, task) {
        await this.taskModel.updateOne({ _id: id }, task).exec();
        return this.getById(id);
    }
    async deleteTask(id) {
        return await this.taskModel.deleteOne({ _id: id }).exec();
    }
};
TaskService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Task')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TaskService);
exports.TaskService = TaskService;
//# sourceMappingURL=task.service.js.map