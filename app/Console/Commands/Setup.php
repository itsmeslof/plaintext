<?php

namespace App\Console\Commands;

use App\Models\User;
use Exception;
use Illuminate\Console\Command;

class Setup extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'plaintext:setup';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Setup the default admin account and site settings file.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $status = Command::SUCCESS;

        try {
            $this->createAdminAccount();
            $this->createSettingsFile();

            $this->info('[Setup] Setup exited successfully.');
        } catch (Exception $e) {
            $status = Command::INVALID;

            $this->error('[Setup] There was an error running the Setup command:');
            $this->error($e->getMessage());
        }
        
        return $status;
    }

    /**
     * Create an admin account if one does not already exist.
     */
    private function createAdminAccount()
    {
        if (User::where('is_admin', true)->first()) {
            $this->info('[Setup] An admin account already exists, skipping.');
            return;
        }

        User::factory()->asAdmin()->create([
            'username' => 'admin',
            'email' => 'admin@example.com',
        ]);

        $this->info('[Setup] Admin account created with the following credentials:');

        $header = ['Email', 'Password'];
        $body = [
            ['admin@example.com', 'password']
        ];

        $this->table($header, $body);

        $this->warn('[Setup] You should login and change these credentials immediately.');
    }

    /**
     * Create the settings.json file if one does not exist.
     */
    private function createSettingsFile()
    {
        $settingsFilePath = storage_path('app\\settings.json');

        if (file_exists($settingsFilePath)) {
            $this->info('[Setup] Settings file already exists, skipping.');
            return;
        }

        $defaultSettings = [
            'enable_user_registration' => (string)(int)false,
            'show_home_page' => (string)(int)true,
        ];

        admin_settings()->put($defaultSettings);

        $route = route('admin.settings.show');

        $this->info("[Setup] Default settings file created at '{$settingsFilePath}'.");
        $this->info("[Setup] You can edit these settings by logging in as an admin and visiting '{$route}'.");
    }
}
