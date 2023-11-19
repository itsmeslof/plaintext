<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFileRequest;
use App\Http\Resources\FileResource;
use App\Markdown\CustomMarkdownRenderer;
use App\Models\File;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Files/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFileRequest $request)
    {
        $validated = $request->validated();
        $file = $request->user->files()->create($validated);

        return redirect()->route('files.show', $file);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, File $file)
    {
        $this->authorize('view', $file);

        $html = '';
        if ($file->extension === '.md') {
            $parseResult = (new CustomMarkdownRenderer())->render($file->contents);
            $html = $parseResult->outputHtml;
        }

        return Inertia::render("Files/Show", [
            'file' => new FileResource($file),
            'mdRenderedHtml' => $html
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(File $file)
    {
        $this->authorize('edit', $file);

        return Inertia::render("Files/Edit", [
            'file' => new FileResource($file)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreFileRequest $request, File $file)
    {
        $this->authorize('edit', $file);

        $validated = $request->validated();
        $file->update($validated);

        return back()->with('status', 'File saved.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(File $file)
    {
        //
    }
}
