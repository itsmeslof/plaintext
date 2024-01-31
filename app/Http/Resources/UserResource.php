<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'username' => $this->username,
            'email' => $this->email,
            'profile_visibility' => $this->profile_visibility,
            'email_verified_at' => $this->email_verified_at,
            'is_admin' => $this->is_admin,
            'files' => FileResource::collection($this->whenLoaded('files')),
            'created_at' => $this->created_at,
            'created_at_fmt' => $this->created_at->toFormattedDateString(),
        ];
    }
}
