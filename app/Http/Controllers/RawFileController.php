<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\FileResource;
use App\Models\File;
use Inertia\Inertia;

class RawFileController extends Controller
{
    public function __invoke(File $file)
    {
        $this->authorize('view', $file);

        return Inertia::render('Files/Raw', [
            'file' => new FileResource($file)
        ]);
    }
}
