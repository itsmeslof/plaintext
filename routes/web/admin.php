<?php

use App\Http\Controllers\Admin\DeleteUserController;
use App\Http\Controllers\Admin\SettingsController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\VerifyUserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'auth.admin'])->prefix('admin')->as('admin.')->group(function () {
    Route::get('/settings', [SettingsController::class, 'show'])->name('settings.show');
    Route::patch('/settings', [SettingsController::class, 'update'])->name('settings.update');

    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::get('/users/{user:username}', [UserController::class, 'show'])->name('users.show');
    Route::post('/users/{user:username}/verify', VerifyUserController::class)->name('users.verify');
    Route::delete('/users/{user:username}', DeleteUserController::class)->name('users.destroy');
});
