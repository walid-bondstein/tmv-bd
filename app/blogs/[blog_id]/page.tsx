import BlogArticle from '@/components/blogs/BlogSkeleton';
import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import blogs from '@/public/locales/blogsJSON/blogs.json';

// Make metadata dynamic per-blog without making the page CSR.
export async function generateMetadata({ params }: { params: { blog_id: string } }) {
    const { blog_id } = await params;
    const blogData = blogs.find(blog => blog.url === blog_id);

    if (!blogData) {
        return {
            title: 'Feature Not Found',
            description: 'The blog you are looking for does not exist.',
            openGraph: {
                title: 'Feature Not Found',
                description: 'The blog you are looking for does not exist.',
                type: 'website',
            },
        };
    }

    return {
        title: blogData.title,
        keywords: blogData.keyWords.join(', '),
        description: blogData.description ?? 'Monitor your vehicles with precise GPS tracking. Real-time fleet monitoring with advanced analytics, reporting, and management tools.',
        openGraph: {
            title: blogData.title,
            description: blogData.description ?? 'Monitor your vehicles with precise GPS tracking and advanced fleet management tools.',
            type: 'website',
        },
    };
}

export default async function Page({ params }: { params: { blog_id: string } }) {
    const { blog_id } = await params;
    const blogData = blogs.find(blog => blog.url === blog_id);
    if (!blogData) {
        return <div>
            <Header />
            <main className="component-container mx-auto my-32 text-center">
                <h1 className="text-3xl font-bold mb-4">Feature Not Found</h1>
                <p className="text-lg text-muted-foreground">The blog you are looking for does not exist.</p>
            </main>
            <Footer />
        </div>
    };
    return <div>
        <Header />
        <BlogArticle data={{
            ...blogData,
            sidebar: {
                ...blogData.sidebar,
                tableOfContents: blogData.sections.map(section => ({
                    label: section.title,
                    id: section.id
                })),
            },
            relatedArticles: blogs.filter(blog => blog.url !== blog_id).slice(0, 3).map((item) => ({
                id: item.url,
                category: item.badge,
                title: item.title,
                image: item.featuredImage.src,
                publishedAgo: 'string'
            }))
        }} />
        <Footer />
    </div>
}