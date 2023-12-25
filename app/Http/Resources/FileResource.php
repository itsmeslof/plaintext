<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'name' => $this->name,
            'extension' => $this->extension,
            'contents' => $this->contents,
            'hashid' => $this->hashid,
            'visibility' => $this->visibility,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'created_at_humanized' => $this->created_at->diffForHumans(),
            'updated_at_humanized' => $this->updated_at->diffForHumans(),
            'size' => strlen($this->contents),
        ];
    }
}
