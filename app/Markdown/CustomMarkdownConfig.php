<?php

namespace App\Markdown;

class CustomMarkdownConfig
{
    public static function options(): array
    {
        return [
            'max_nesting_level' => 10,
            'html_input' => 'escape',
            'external_link' => [
                'internal_hosts' => ['/.*\.test$/'], // *.test
                'open_in_new_window' => true,
                'html_class' => 'external-link',
                'nofollow' => '',
                'noopener' => 'external',
                'noreferrer' => 'external',
            ],
            'heading_permalink' => [
                'html_class' => 'heading-permalink',
                'heading_class' => 'heading-permalink-container',
                'id_prefix' => 'content',
                'fragment_prefix' => 'content',
                'insert' => 'after',
                'min_heading_level' => 1,
                'max_heading_level' => 6,
                'title' => 'Permalink',
                'symbol' => '¶',
                'aria_hidden' => true,
            ],
            'footnote' => [
                'backref_class'      => 'footnote-backref',
                'backref_symbol'     => '↩',
                'container_add_hr'   => true,
                'container_class'    => 'footnotes',
                'ref_class'          => 'footnote-ref',
                'ref_id_prefix'      => 'fnref:',
                'footnote_class'     => 'footnote',
                'footnote_id_prefix' => 'fn:',
            ],
        ];
    }
}
