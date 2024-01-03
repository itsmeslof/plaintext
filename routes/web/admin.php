<?php

use App\Http\Controllers\Admin\SettingsController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'auth.admin'])->prefix('admin')->as('admin.')->group(function () {
    Route::get('/settings', [SettingsController::class, 'show'])->name('settings.show');
    Route::patch('/settings', [SettingsController::class, 'update'])->name('settings.update');

    Route::get('/users', [UserController::class, 'index'])->name('users.index');
});
