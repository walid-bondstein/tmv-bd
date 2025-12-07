import Link from "next/link"
import { ArticleData } from "../features/types"

export default function BlogArticle({
    data
}: { data: ArticleData }) {
    return (
        <div className="bg-amber-50 min-h-screen">


            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Article Content */}
                    <div className="lg:col-span-2">
                        {/* Badge & Title */}
                        <div className="mb-6">
                            <span className="inline-block bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full mb-4">
                                {data.badge}
                            </span>
                            <h1 className="text-4xl font-bold text-black mb-4 leading-tight">
                                {data.title}
                            </h1>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span className="font-semibold text-black">By {data.author.name}</span>
                                <span>{data.readTime} min read</span>
                                <span>{data.publishDate}</span>
                            </div>
                        </div>

                        {/* Featured Image */}
                        <div className="mb-8 rounded-lg overflow-hidden">
                            <img
                                src={data.featuredImage.src || "/placeholder.svg"}
                                alt={data.featuredImage.alt}
                                className="w-full h-auto"
                            />
                        </div>

                        {/* Intro Text */}
                        <p className="text-gray-700 mb-8 leading-relaxed">{data.intro}</p>

                        {/* Key Takeaway Box */}
                        <div className="bg-yellow-100 border-l-4 border-yellow-400 p-6 mb-8">
                            <h3 className="font-bold text-lg mb-4">{data.keyTakeaway.title}</h3>
                            <ul className="space-y-2">
                                {data.keyTakeaway.items.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-sm">
                                        <span className="text-yellow-500 font-bold">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Article Sections */}
                        <div className="space-y-8">
                            {data.sections.map((section) => (
                                <div key={section.id} id={section.id}>
                                    <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                                    <p className="text-gray-700 mb-4 leading-relaxed">{section.content}</p>
                                    {section.items && (
                                        <ul className="space-y-2 mb-4 ml-4">
                                            {section.items.map((item, idx) => (
                                                <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                                                    <span className="text-yellow-500 font-bold">⬤</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="space-y-3 rounded-lg p-6 mb-8 sticky top-4">
                            {/* CTA Box */}
                            <div className="bg-white rounded-lg p-6 mb-8">
                                <h3 className="text-lg font-bold mb-2">{data.sidebar.cta.title}</h3>
                                <p className="text-sm text-gray-600 mb-4">{data.sidebar.cta.description}</p>
                                <Link href={data.sidebar.cta.link}>
                                    <button className="w-full cursor-pointer bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded">
                                        {data.sidebar.cta.buttonText}
                                    </button>
                                </Link>
                            </div>
                            {/* Table of Contents */}
                            <div className="bg-white rounded-lg p-6">
                                <h3 className="font-bold text-lg mb-4">Table of Contents</h3>
                                <ul className="space-y-2">
                                    {data.sidebar.tableOfContents.map((item) => (
                                        <li key={item.id}>
                                            <Link href={`/blogs/${data.url}/#${item.id}`} className="text-sm text-gray-700 hover:text-gray-900">
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Related Articles */}
            <section className="max-w-7xl mx-auto px-4 py-12">
                <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {data.relatedArticles.map((article) => (
                        <Link key={article.id} href={`/blogs/${article.id}`}>
                            <div key={article.id} className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition">
                                <img src={article.image || "/placeholder.svg"} alt={article.title} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <span className="text-xs font-bold text-yellow-500">{article.category}</span>
                                    <h3 className="font-bold text-sm mt-2 mb-2 line-clamp-1">{article.title}</h3>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Footer */}

        </div>
    )
}
