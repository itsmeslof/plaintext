<?php

namespace App\Http\Controllers\PublicProfile;

use App\Http\Controllers\Controller;
use App\Http\Resources\FileResource;
use App\Models\File;
use App\Models\User;
use App\ResourceVisibility;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RawFileController extends Controller
{
    public function __invoke(Request $request, User $user, File $file)
    {
        abort_unless(
            in_array(
                $file->visibility,
                [ResourceVisibility::PUBLIC, ResourceVisibility::UNLISTED]
            ),
            404
        );

        return Inertia::render('Files/Raw', [
            'file' => new FileResource($file)
        ]);
    }
}
