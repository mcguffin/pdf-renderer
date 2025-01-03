<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit65b1472d8cbf9e43c0dbfec981564be1
{
    public static $prefixLengthsPsr4 = array (
        'M' => 
        array (
            'McGuffin\\Plugin\\' => 16,
            'McGuffin\\Core\\' => 14,
            'McGuffin\\Asset\\' => 15,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'McGuffin\\Plugin\\' => 
        array (
            0 => __DIR__ . '/..' . '/mcguffin/wp-skeleton-plugin/src',
        ),
        'McGuffin\\Core\\' => 
        array (
            0 => __DIR__ . '/..' . '/mcguffin/wp-skeleton-core/src',
        ),
        'McGuffin\\Asset\\' => 
        array (
            0 => __DIR__ . '/..' . '/mcguffin/wp-skeleton-asset/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit65b1472d8cbf9e43c0dbfec981564be1::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit65b1472d8cbf9e43c0dbfec981564be1::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit65b1472d8cbf9e43c0dbfec981564be1::$classMap;

        }, null, ClassLoader::class);
    }
}
