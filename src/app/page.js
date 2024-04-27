import PostDrinks from "../app/PostDrinks";
import {Suspense} from "react";
import Loading from "../app/loading";


export default function PostsPage() {
    return (
        <div>
            <h1>Drinks</h1>
            <Suspense fallback={<Loading></Loading>}>
                <PostDrinks></PostDrinks>
            </Suspense>
        </div>
    );
}