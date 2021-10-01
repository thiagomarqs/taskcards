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
exports.TasksController = void 0;
const common_1 = require("@nestjs/common");
const category_1 = require("../categories/category/category");
const task_1 = require("./task");
const task_service_1 = require("./task.service");
let TasksController = class TasksController {
    constructor(taskService) {
        this.taskService = taskService;
    }
    async getAll() {
        return this.taskService.getAll();
    }
    async getById(id) {
        return this.taskService.getById(id);
    }
    async getByCategory(category) {
        return this.taskService.getByCategory(category);
    }
    async createTask(task) {
        return this.taskService.createTask(task);
    }
    async updateTask(id, task) {
        task.id = id;
        return this.taskService.updateTask(id, task);
    }
    async deleteTask(id) {
        this.taskService.deleteTask(id);
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "getAll", null);
__decorate([
    common_1.Get('/id/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "getById", null);
__decorate([
    common_1.Get(':category'),
    __param(0, common_1.Param('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "getByCategory", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [task_1.Task]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "createTask", null);
__decorate([
    common_1.Put('/id/:id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, task_1.Task]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "updateTask", null);
__decorate([
    common_1.Delete('/id/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "deleteTask", null);
TasksController = __decorate([
    common_1.Controller('tasks'),
    __metadata("design:paramtypes", [task_service_1.TaskService])
], TasksController);
exports.TasksController = TasksController;
//# sourceMappingURL=tasks.controller.js.map