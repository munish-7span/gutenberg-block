
<?php

/**
 * Add Additional Support To your Theme
 *
 * @return void
 */
function mytheme_setup() {
    add_theme_support( 'align-wide' );
    add_theme_support('align-full');
    add_theme_support('widgets');
}
add_action( 'after_setup_theme', 'mytheme_setup' );

/**
 * Enqueue Theme Style Sheet
 *
 * @return void
 */
function enqueue_theme_style(){
    wp_enqueue_style(
        'parent-style',
        get_template_directory_uri() .'/style.css',
        array(),
        time(),
    );
}
add_action('wp_enqueue_scripts', 'enqueue_theme_style');


/**
 * Add Custom Block file (Develop with JS)
 */
require_once( get_stylesheet_directory(  ) .'/blocks/custom-block-functions.php');


// Add Social Url Field to The Author
add_filter( 'user_contactmethods', 'wpse_user_contactmethods', 10, 1 );
function wpse_user_contactmethods( $contact_methods ) {
    $contact_methods['facebook'] = __( 'Facebook URL', 'text_domain' );
    $contact_methods['twitter']  = __( 'Twitter URL', 'text_domain' );
    $contact_methods['linkedin'] = __( 'LinkedIn URL', 'text_domain' );
    $contact_methods['youtube']  = __( 'YouTube URL', 'text_domain' );
    return $contact_methods;
}

// Create a Shortcode Which Return the Social Url 
// Use : [author_social field="facebook"]
function author_social_url_shortcode($atts) {
	$atts = shortcode_atts([
		'field' => '',
	], $atts);

	if (empty($atts['field'])) return '';

	// Get author ID from current post
	$author_id = get_post_field('post_author', get_the_ID());
	if (!$author_id) return '';

	// Get field value
	$value = get_user_meta($author_id, $atts['field'], true);
	return esc_url($value);
}
add_shortcode('author_social', 'author_social_url_shortcode');