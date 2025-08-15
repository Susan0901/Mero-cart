<?php

use App\Console\Commands\ClearRoleTableData;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
    $this->command(ClearRoleTableData::class);
})->purpose('Display an inspiring quote');
