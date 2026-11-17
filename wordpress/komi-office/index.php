<?php get_header(); ?>
<main id="content" class="section wp-page"><div class="wp-content">
<?php if (is_search()) { ?><h1>Hasil pencarian: <?php echo esc_html(get_search_query()); ?></h1><?php } elseif (is_archive()) { the_archive_title('<h1>', '</h1>'); }
if (have_posts()) { while (have_posts()) { the_post(); ?>
<article <?php post_class(); ?> id="post-<?php the_ID(); ?>">
<?php if (is_singular()) { the_title('<h1>', '</h1>'); the_content(); wp_link_pages(); } else { ?>
<h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2><?php the_excerpt(); } ?>
</article>
<?php } the_posts_pagination(); } else { ?><h1>Konten belum ditemukan</h1><p>Silakan gunakan pencarian atau kembali ke beranda.</p><?php get_search_form(); } ?>
</div></main><?php get_footer(); ?>
