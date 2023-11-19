<?php

namespace App;

class HashIdOptions
{
    public function __construct(
        public string $connection,
        public array $values
    ) {
    }
}
