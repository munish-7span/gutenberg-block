
<?php
/** */

function mytheme_setup() {
    add_theme_support( 'align-wide' );
    // add_theme_support('full');
    add_theme_support('widgets');
}
add_action( 'after_setup_theme', 'mytheme_setup' );


/**
 * Add Custom Block file (Develop with JS)
 */
require_once( get_stylesheet_directory(  ) .'/blocks/custom-block-functions.php');
