<?php

namespace App\Http\Controllers\PublicProfile;

use App\Http\Controllers\Controller;
use App\Http\Resources\FileResource;
use App\Http\Resources\PublicUserResource;
use App\Markdown\CustomMarkdownRenderer;
use App\Models\File;
use App\Models\User;
use App\ResourceVisibility;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FileController extends Controller
{
    /**
     * Display the specified resource.
     */
    public function show(Request $request, User $user, File $file)
    {
        abort_unless(
            in_array(
                $file->visibility,
                [ResourceVisibility::PUBLIC, ResourceVisibility::UNLISTED]
            ),
            404
        );

        $html = '';
        if ($file->extension === '.md') {
            $parseResult = (new CustomMarkdownRenderer())->render($file->contents);
            $html = $parseResult->outputHtml;
        }

        return Inertia::render("PublicProfile/Files/Show", [
            'publicUser' => new PublicUserResource($user),
            'file' => new FileResource($file),
            'mdRenderedHtml' => $html
        ]);
    }
}
