<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class DeleteUserController extends Controller
{
    public function __invoke(Request $request, User $user)
    {
        $this->authorize('destroy', $user);

        $actingUser = $request->user();

        if ($actingUser->id === $user->id) {
            return back()->withErrors([
                'delete_user' => 'You can not delete yourself.',
            ]);
        }

        if ($request->get('username') !== $user->username) {
            return back()->withErrors([
                'delete_user' => 'Please confirm the username of the user you want to delete.'
            ]);
        }

        $user->delete();

        $request->session()->flash('status', 'User deleted');

        return to_route('admin.users.index');
    }
}
