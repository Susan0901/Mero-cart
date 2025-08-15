<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            ['id' => 1, 'name' => 'Admin', 'description' => 'This is an admin'],
            ['id' => 2, 'name' => 'User', 'description' => 'This is a regular user'],
        ];

        foreach ($roles as $role) {
            $baseSlug = Str::slug($role['name']);
            $slug = $baseSlug;
            $count = 0;

            while (Role::where('slug', $slug)->exists()) {
                $slug = $baseSlug . '-' . $count++;
            }

            Role::create([
                'id' => $role['id'],
                'name' => $role['name'],
                'slug' => $slug,
                'description' => $role['description'],
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]);
        }
    }
}
