<?php

namespace App\Markdown;

class MarkdownParseResult
{
    public function __construct(
        public string $outputHtml = "",
    ) {
    }
}
