<?php

namespace App\Filters;

use Illuminate\Contracts\Database\Eloquent\Builder;

class SearchQueryFilter
{
    public function __construct(
        public ?string $searchQuery,
        public array $columns,
    ) {
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
        $firstColumn = array_shift($this->columns);
        if ($this->searchQuery && $firstColumn) {
            $builder->where($firstColumn, 'LIKE', "%{$this->searchQuery}%");

            foreach ($this->columns as $column) {
                $builder->orWhere($column, 'LIKE', "%{$this->searchQuery}%");
            }
        }
    }
}
