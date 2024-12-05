<?php

use App\Http\Controllers\TodoController;
use Illuminate\Support\Facades\Route;

// API routes protected by Sanctum authentication
// Route::middleware('auth:sanctum')->group(function () {
// });

    Route::get('/todos', [TodoController::class, 'index']);
    Route::post('/todos', [TodoController::class, 'store']);
    Route::get('/todos/{id}', [TodoController::class, 'show']);
    Route::put('/todos/{id}', [TodoController::class, 'update']);
    Route::delete('/todos/{id}', action: [TodoController::class, 'destroy']);

