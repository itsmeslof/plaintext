<?php

namespace App\Filters;

use Illuminate\Contracts\Database\Eloquent\Builder;

class SearchQueryFilter
{
    public function __construct(public string|null $searchQuery, public string $column)
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
        if ($this->searchQuery) {
            $builder->where($this->column, 'LIKE', "%{$this->searchQuery}%");
        }
    }
}
