<?php

namespace App\Http\Controllers;

use App\Http\Resources\PublicUserResource;
use App\Models\User;
use App\ResourceVisibility;
use Inertia\Inertia;

class PublicProfileController extends Controller
{
    public function show(User $user)
    {
        abort_if(
            $user->profile_visibility === ResourceVisibility::PRIVATE,
            404
        );

        return Inertia::render('PublicProfile/Show', [
            'publicUser' => new PublicUserResource($user->load('publicFiles')),
        ]);
    }
}
