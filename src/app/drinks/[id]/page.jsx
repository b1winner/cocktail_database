import BackButton from "../../../components/BackButton";
import {notFound} from "next/navigation";

//  needs to return:
//  [{id: 1}, {id: 2}, {id: 3}, ...

export async function generateStaticParams() {
    const fetchResult = await fetch('www.thecocktaildb.com/api/json/v1/1/search.php?f=a');
    const posts = await fetchResult.json();
    return posts.map(post => {
        return {
            params: {
                id: post.id.toString()
            }
        }
    });

}

async function getPost(id) {
    const fetchResult = await fetch(`www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`, {
        next: {
            revalidate: 3600    // seconds
        }
    });
    console.log(fetchResult)
    if (!fetchResult) {
        notFound();
    }

    const data = await fetchResult.json();
    if (!data || !data.id) {
        notFound();
    }
    return data;
}

export default async function PostDetails({params}) {

    console.log("in post")
    const post = await getPost(params.id);

    return (
        <div>
            <h1>Post Details</h1>
            <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                    <span className="card-title">{post.title}</span>
                    <p>{post.body}</p>
                </div>
            </div>
            <BackButton></BackButton>
        </div>
    );
}