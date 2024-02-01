<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class VerifyUserController extends Controller
{
    public function __invoke(Request $request, User $user)
    {
        $this->authorize('verify', $user);

        if ($user->markEmailAsVerified()) {
            $request->session()->flash('status', 'User verified');
            return back();
        }

        return back()->withErrors([
            'verify_user' => 'There was an error verifying the user\'s email.',
        ]);
    }
}
