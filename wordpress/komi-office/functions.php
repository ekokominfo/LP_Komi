<?php
if (!defined('ABSPATH')) { exit; }
function komi_asset($name) { return get_theme_file_uri('/assets/' . $name); }
add_action('after_setup_theme', function () {
    add_theme_support('title-tag'); add_theme_support('post-thumbnails');
    add_theme_support('automatic-feed-links'); add_theme_support('responsive-embeds');
    add_theme_support('html5', array('search-form', 'gallery', 'caption', 'style', 'script'));
    register_nav_menus(array('primary' => 'Navigasi utama'));
    add_theme_support('editor-styles');
});
add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style('komi', komi_asset('office.css'), array(), '1.0.0');
    wp_enqueue_style('komi-wp', get_theme_file_uri('/wordpress.css'), array('komi'), '1.0.0');
    wp_enqueue_script('komi', komi_asset('office.js'), array(), '1.0.0', true);
});
add_filter('script_loader_tag', function ($tag, $handle) {
    return $handle === 'komi' ? str_replace('<script ', '<script type="module" ', $tag) : $tag;
}, 10, 2);
function komi_page($key) {
    $id = absint(get_theme_mod('komi_' . $key, 0));
    $slugs = array('sambutan'=>'sambutan-kepala-dinas','profil'=>'tentang-kami','aplikasi-informatika'=>'bidang-aplikasi-informatika','informasi-publik'=>'bidang-pengelolaan-informasi-publik','komunikasi-publik'=>'bidang-layanan-komunikasi-publik','statistik-persandian'=>'bidang-statistik-dan-persandian','sekretariat'=>'bagian-sekretariat');
    $page = $id ? get_post($id) : (isset($slugs[$key]) ? get_page_by_path($slugs[$key]) : null);
    return $page && $page->post_status === 'publish' && $page->post_type === 'page' && !post_password_required($page) ? $page : null;
}
function komi_content($key) {
    $page = komi_page($key); if (!$page) { return; }
    global $post; $previous = $post; $post = $page; setup_postdata($post);
    if (did_action('elementor/loaded') && class_exists('\Elementor\Plugin') && \Elementor\Plugin::$instance->db->is_built_with_elementor($page->ID)) {
        echo \Elementor\Plugin::$instance->frontend->get_builder_content_for_display($page->ID, true);
    } else {
        echo apply_filters('the_content', $post->post_content);
    }
    $post = $previous; if ($post) { setup_postdata($post); } else { wp_reset_postdata(); }
}
function komi_posts($category = 0) {
    $args = array('posts_per_page'=>3,'post_status'=>'publish','ignore_sticky_posts'=>true);
    if ($category) { $args['cat'] = absint($category); }
    $query = new WP_Query($args);
    if (!$query->have_posts()) { echo '<p>Belum ada informasi yang ditampilkan.</p>'; }
    while ($query->have_posts()) { $query->the_post(); ?>
        <article class="wp-news"><small><?php echo esc_html(get_the_date()); ?></small><h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3><?php the_excerpt(); ?></article>
    <?php } wp_reset_postdata();
}
add_action('customize_register', function ($customizer) {
    $customizer->add_section('komi_content', array('title'=>'Komi: Konten beranda','priority'=>30));
    foreach (array('sambutan'=>'Sambutan Kadis','profil'=>'Profil dinas','layanan'=>'Layanan','unduhan'=>'Dokumen dan unduhan','partisipasi'=>'Survei dan buku tamu','kontak'=>'Kontak dan peta','aplikasi-informatika'=>'Bidang Aplikasi Informatika','informasi-publik'=>'Bidang Informasi Publik','komunikasi-publik'=>'Bidang Komunikasi Publik','statistik-persandian'=>'Bidang Statistik dan Persandian','sekretariat'=>'Sekretariat') as $key=>$label) {
        $customizer->add_setting('komi_'.$key, array('sanitize_callback'=>'absint'));
        $customizer->add_control('komi_'.$key, array('section'=>'komi_content','type'=>'dropdown-pages','label'=>$label));
    }
    $categories = array(0=>'Tidak dipilih'); foreach (get_categories(array('hide_empty'=>false)) as $cat) { $categories[$cat->term_id]=$cat->name; }
    foreach (array('berita'=>'Kategori berita (kosong = semua pos)','agenda'=>'Kategori agenda') as $key=>$label) {
        $customizer->add_setting('komi_'.$key, array('sanitize_callback'=>'absint'));
        $customizer->add_control('komi_'.$key, array('section'=>'komi_content','type'=>'select','choices'=>$categories,'label'=>$label));
    }
    $customizer->add_setting('komi_portrait', array('sanitize_callback'=>'esc_url_raw'));
    $customizer->add_control(new WP_Customize_Image_Control($customizer, 'komi_portrait', array('section'=>'komi_content','label'=>'Foto Kadis (default: foto arsip)')));
});
