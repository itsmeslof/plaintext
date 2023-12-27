<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicProfile\FileController;
use App\Http\Controllers\PublicProfileController;
use App\Http\Controllers\RawFileController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::prefix('/u/{user:username}')->as('publicProfile.')->group(function () {
    Route::get('/', [PublicProfileController::class, 'show'])->name('show');
    Route::get('/f/{file}', [FileController::class, 'show'])->name('files.show');
    Route::get('/f/{file}/raw', RawFileController::class)->name('files.raw.show');
});
