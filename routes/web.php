<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicProfile\FileController as PublicProfileFileController;
use App\Http\Controllers\RawFileController;
use App\Http\Controllers\PublicProfileController;
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
    return 'Home';
    // return redirect()->route('dashboard');
})->name('home');

Route::middleware('auth')->get('/dashboard', DashboardController::class)->name('dashboard');

require __DIR__ . '/web/files.php';
require __DIR__ . '/web/profile.php';
require __DIR__ . '/auth.php';
