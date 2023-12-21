<?php

namespace App\Filters;

use Illuminate\Contracts\Database\Eloquent\Builder;

class FilterPipeline
{
    public function __construct(public Builder $builder)
    {
    }

    /**
     * Calls the provided filter classes.
     *
     * @param array $filters
     *
     * @return void
     */
    public function run(...$filters): void
    {
        foreach ($filters as $filter) {
            if (!method_exists($filter, 'apply')) return;

            $filter->apply($this->builder);
        }
    }
}
