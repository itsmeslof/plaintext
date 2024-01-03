<?php

namespace App\Filters;

use Illuminate\Contracts\Database\Eloquent\Builder;

class AccountRoleFilter
{
    private $handlers = [];

    public function __construct(public ?string $role)
    {
        $this->handlers = [
            'user' => fn (Builder $builder) => $builder->where('is_admin', false),
            'admin' => fn (Builder $builder) => $builder->where('is_admin', true),
            '__fail' => fn (Builder $builder) => $builder->whereRaw('FALSE'),
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
        if (!$this->role || $this->role === 'all') return;

        $fallbackHandler = $this->handlers['__fail'];
        $handler = $this->handlers[$this->role] ?? $fallbackHandler;

        $handler($builder);
    }
}
