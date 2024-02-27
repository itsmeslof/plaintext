<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFileRequest;
use App\Http\Resources\FileResource;
use App\Markdown\CustomMarkdownRenderer;
use App\Models\File;
use App\Services\FileService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, FileService $fileService)
    {
        $user = $request->user();

        $files = $fileService->index(
            user: $user,
            queryParams: [
                ...$request->only(
                    'query',
                    'visibility',
                    'order_by',
                ),
                'order_by_column' => 'name',
            ],
        )->paginate(10)->withQueryString();

        return Inertia::render('Files/Index', [
            'files' => FileResource::collection($files)
        ]);
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
        $file = $request->user()->files()->create($validated);

        $request->session()->flash('status', 'File created');

        return redirect()->route('files.show', $file);
    }

    /**
     * Display the specified resource.
     */
    public function show(File $file)
    {
        $this->authorize('view', $file);

        $mdRenderedHtml = null;
        if ($file->extension === '.md') {
            $renderer = new CustomMarkdownRenderer();
            $mdRenderedHtml = $renderer->render(input: $file->contents)->outputHtml;
        }

        return Inertia::render('Files/Show', [
            'file' => new FileResource($file),
            'mdRenderedHtml' => $mdRenderedHtml
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(File $file)
    {
        $this->authorize('edit', $file);

        return Inertia::render('Files/Edit', [
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

        $request->session()->flash('status', 'File saved');

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, File $file)
    {
        $this->authorize('destroy', $file);

        $filenameWithExtension = "{$file->name}{$file->extension}";
        if ($request->get('filename') !== $filenameWithExtension) {
            return back()->withErrors([
                'delete_file' => 'Please confirm the name of the file you want to delete.'
            ]);
        }

        $file->delete();

        $request->session()->flash('status', 'File deleted');

        return to_route('files.index');
    }
}
