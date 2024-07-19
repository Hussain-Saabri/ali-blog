import Format from '../../layout/format';
import Author from '../../components/_child/author';
import Image from 'next/image';
import Ralated from '../../components/_child/ralated';
import getPost from '../../lib/helper';
import useFetcher from '../../lib/fetcher';
import Spinner from '../../components/_child/spinner';
import ErrorComponent from '../../components/_child/error';
import { useRouter } from 'next/router';
import { SWRConfig } from 'swr';

export default function Page({ fallback }) {
    const router = useRouter();
    const { postId } = router.query;
    const { data, isLoading, isError } = useFetcher(`/api/posts/${postId}`);

    if (isLoading) return <Spinner />;
    if (isError) return <ErrorComponent />;

    return (
        <SWRConfig value={{ fallback }}>
            <Article {...data} />
        </SWRConfig>
    );
}

function Article({ title, img, subtitle, description, author }) {
    return (
        <Format>
            <section className='container mx-auto md:px-2 py-16 w-1/2'>
                <div className='flex justify-center'>
                    {author ? <Author {...author} /> : null}
                </div>
                <div className="post py-10">
                    <h1 className='font-bold text-4xl text-center pb-5'>{title || 'No Title'}</h1>
                    <p className='text-gray-500 text-xl text-center'>{subtitle || 'No Title'}</p>
                    <div className="py-10">
                        <Image src={img || '/'} width={900} height={600} alt={title || 'No Title'} />
                    </div>
                    <div className="content text-gray-600 text-lg flex flex-col gap-4">
                        {description || 'No Description'}
                    </div>
                </div>
                <Ralated />
            </section>
        </Format>
    );
}

export async function getStaticProps({ params }) {
    const post = await getPost(params.postId);
    if (!post) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            fallback: {
                [`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${params.postId}`]: post,
            },
        },
    };
}

export async function getStaticPaths() {
    const posts = await getPost();
    const paths = posts.map((post) => ({
        params: { postId: post.id.toString() },
    }));

    return {
        paths,
        fallback: false,
    };
}
