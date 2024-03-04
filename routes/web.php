<?php

use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
    $registrationEnabled = admin_settings()->get('enable_user_registration', false);

    if (!admin_settings()->get('show_home_page')) {
        return to_route('dashboard');
    }

    return Inertia::render('Home', [
        'registrationEnabled' => (bool)$registrationEnabled
    ]);
})->name('home');

Route::middleware('auth')->get('/dashboard', DashboardController::class)->name('dashboard');

require __DIR__ . '/web/files.php';
require __DIR__ . '/web/profile.php';
require __DIR__ . '/web/admin.php';
require __DIR__ . '/auth.php';
