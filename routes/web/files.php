<?php

use App\Http\Controllers\FileController;
use App\Http\Controllers\RawFileController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->prefix('files')->as('files.')->group(function () {
    Route::get('/', [FileController::class, 'index'])->name('index');
    Route::get('/create', [FileController::class, 'create'])->name('create');
    Route::get('/{file}/edit', [FileController::class, 'edit'])->name('edit');
    Route::get('/{file}', [FileController::class, 'show'])->name('show');
    Route::get('/{file}/raw', RawFileController::class)->name('raw.show');
    Route::patch('/{file}', [FileController::class, 'update'])->name('update');
    Route::post('/', [FileController::class, 'store'])->name('store');

    Route::delete('/{file}', [FileController::class, 'destroy'])->name('destroy');
});
