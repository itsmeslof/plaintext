# Introduction

Plaintext is a self-hosted plain text file management and sharing tool written in laravel 10, Inertia.js with React, and Tailwind.

Plaintext supports rendering files as raw text and markdown with full support for the [Commonmark](https://spec.commonmark.org/0.30/) and [GitHub Flavored](https://github.github.com/gfm/) markdown specs.

## Features

- Private, self-hosted tool
- Enable/disable account registration
- Manual account creation for admins to add new users
- Public and Private user profiles
- Public, Private and Unlisted file sharing
- Plain text and markdown rendering support

## Installation

> Plaintext was built on `PHP 8.1.10` and `Laravel ^10.10`

1. Clone the repo

    ```sh
    git clone https://github.com/itsmeslof/plaintext.git
    ```

2. Install Composer packages

    ```sh
    composer install
    ```

3. Install NPM packages

    ```sh
    npm install
    ```

4. Build resources

    ```sh
    npm run build
    ```

5. Configure your `.env` file

    > :warning: Don't forget to configure your mail server for user registration and account verification and recovery actions

6. Run migrations

    ```sh
    php artisan migrate --force
    ```

7. Run the setup command

    ```sh
    php artisan plaintext:setup
    ```

After running the setup command, you can login with the default credentials:

| Email             | Password |
| ----------------- | -------- |
| <admin@example.com> | password |

:warning: **You should change the default credentials immediately**

> The default settings include user registration **disabled**, and the project home page **enabled**. You can change these settings in the admin area.

## Security Vulnerabilities

If you discover a security vulnerability please send an e-mail to [slof@hey.com](mailto:slof@hey.com). All security vulnerabilities will be promptly addressed.

## License

Plaintext is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
