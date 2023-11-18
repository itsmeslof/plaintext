<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke(Request $request)
    {
        $user = $request->user();


        return Inertia::render('Dashboard', [
            'recentFiles' => $user->files
        ]);
    }
}
