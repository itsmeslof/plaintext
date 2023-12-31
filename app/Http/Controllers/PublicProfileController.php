<?php

namespace App\Http\Controllers;

use App\Http\Resources\FileResource;
use App\Http\Resources\PublicUserResource;
use App\Models\User;
use App\ResourceVisibility;
use App\Services\FileService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicProfileController extends Controller
{
    public function show(Request $request, User $user, FileService $fileService)
    {
        abort_unless(
            $user->profile_visibility === ResourceVisibility::PUBLIC,
            404
        );

        $publicFiles = $fileService->indexPublic(
            user: $user,
            queryParams: [
                ...$request->only(
                    'query',
                    'visibility',
                    'order_by',
                ),
                'order_by_column' => 'name',
            ]
        )->paginate(10)->withQueryString();

        return Inertia::render('PublicProfile/Show', [
            'publicUser' => new PublicUserResource($user),
            'publicFiles' => FileResource::collection($publicFiles)
        ]);
    }
}
