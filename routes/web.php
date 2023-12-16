<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect()->route('dashboard');
});

Route::middleware('auth')->get('/dashboard', DashboardController::class)->name('dashboard');

Route::middleware('auth')->prefix('files')->as('files.')->group(function () {
    Route::get('/create', [FileController::class, 'create'])->name('create');
    Route::get('/{file}', [FileController::class, 'show'])->name('show');
    Route::get('/{file}/edit', [FileController::class, 'edit'])->name('edit');
    Route::patch('/{file}', [FileController::class, 'update'])->name('update');
    Route::post('/', [FileController::class, 'store'])->name('store');
    Route::get('/', [FileController::class, 'index'])->name('index');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
