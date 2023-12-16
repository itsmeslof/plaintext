<?php

namespace App\Models;

use App\HashIdOptions;
use App\ResourceVisibility;
use App\Traits\HasHashId;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class File extends Model
{
    use HasFactory, HasHashId;

    protected $fillable = ['name', 'extension', 'contents', 'visibility'];

    public function getHashIdOptions(): HashIdOptions
    {
        return new HashIdOptions(
            connection: 'main',
            values: [
                $this->id,
                $this->user_id
            ]
        );
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function getRouteKeyName(): string
    {
        return 'hashid';
    }

    public function scopePublic(Builder $query): void
    {
        $query->where('visibility', ResourceVisibility::PUBLIC);
    }
}
