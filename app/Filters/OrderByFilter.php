<?php

namespace App\Filters;

use Illuminate\Contracts\Database\Eloquent\Builder;

class OrderByFilter
{
    private array $handlers = [];

    public function __construct(public string|null $orderBy)
    {
        $this->handlers = [
            'newest' => fn (Builder $builder) => $builder->latest(),
            'oldest' => fn (Builder $builder) => $builder->oldest(),
            'atoz' => fn (Builder $builder) => $builder->orderBy('name', 'asc'),
            'ztoa' => fn (Builder $builder) => $builder->orderBy('name', 'desc'),
        ];
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
        if (!$this->orderBy) return;

        $handler = $this->handlers[$this->orderBy] ?? null;

        if ($handler) $handler(...)($builder);
    }
}
