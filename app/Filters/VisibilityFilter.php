<?php

namespace App\Filters;

use Illuminate\Contracts\Database\Eloquent\Builder;

class VisibilityFilter
{
    public function __construct(public string|null $visibility)
    {
    }

    /**
     * Applies the filter on the provided query builder.
     *
     * @param \Illuminate\Contracts\Database\Eloquent\Builder $builder
     *
     * @return void
     */
    public function apply(Builder $builder): void
    {
        if ($this->visibility && $this->visibility !== 'all') {
            $builder->where('visibility', $this->visibility);
        }
    }
}
