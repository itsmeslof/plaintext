<?php

namespace Database\Factories;

use App\ResourceVisibility;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'username' => fake()->userName(),
            'email' => fake()->unique()->safeEmail(),
            'password' => static::$password ??= Hash::make('password'),
            'profile_visibility' => fake()->randomElement([
                ResourceVisibility::PRIVATE,
                ResourceVisibility::PUBLIC
            ]),
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

    /**
     * Marks the model as an administrator.
     */
    public function asAdmin(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_admin' => true,
            'email_verified_at' => now(),
        ]);
    }
}
