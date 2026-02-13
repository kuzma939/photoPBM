/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.pick-best-moment.com', 
  generateRobotsTxt: true, 
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/api/*', '/admin/*', '/_next/*'],
  
  // Add additional paths for better crawling
  additionalPaths: async (config) => {
    const paths = [
      // Main pages
      await config.transform(config, '/', { 
        changefreq: 'daily', 
        priority: 1.0 
      }),
      await config.transform(config, '/contact', { 
        changefreq: 'monthly', 
        priority: 0.9 
      }),
      await config.transform(config, '/Gallery', { 
        changefreq: 'weekly', 
        priority: 0.9 
      }),
      await config.transform(config, '/favorite-spots', { 
        changefreq: 'weekly', 
        priority: 0.9 
      }),
      await config.transform(config, '/Conditions', { 
        changefreq: 'monthly', 
        priority: 0.5 
      }),
    ];

    // Add individual location pages
    const locations = [
      'gothic-quarter',
      'ciutadella-park',
      'sagrada-familia',
      'manjuic',
    ];

    for (const location of locations) {
      paths.push(
        await config.transform(config, `/favorite-spots/${location}`, {
          changefreq: 'weekly',
          priority: 0.8,
        })
      );
    }

    return paths;
  },

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://www.pick-best-moment.com/sitemap.xml',
    ],
  },

  // Generate alternate language versions
  alternateRefs: [
    {
      href: 'https://www.pick-best-moment.com',
      hreflang: 'en',
    },
    {
      href: 'https://www.pick-best-moment.com/es',
      hreflang: 'es',
    },
    {
      href: 'https://www.pick-best-moment.com/fr',
      hreflang: 'fr',
    },
    {
      href: 'https://www.pick-best-moment.com/uk',
      hreflang: 'uk',
    },
    {
      href: 'https://www.pick-best-moment.com',
      hreflang: 'x-default',
    },
  ],
};
