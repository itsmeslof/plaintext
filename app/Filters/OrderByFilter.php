<?php

namespace App\Filters;

use Illuminate\Contracts\Database\Eloquent\Builder;

class OrderByFilter
{
    private array $handlers = [];

    public function __construct(public string|null $orderBy, public string $default)
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
        $defaultHandler = $this->handlers[$this->default] ?? null;
        $handler = $this->handlers[$this->orderBy] ?? $defaultHandler;

        if ($handler) $handler(...)($builder);
    }
}
