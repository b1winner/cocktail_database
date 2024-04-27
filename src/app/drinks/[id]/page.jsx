import BackButton from "../../../components/BackButton";
import {notFound} from "next/navigation";

//  needs to return:
//  [{id: 1}, {id: 2}, {id: 3}, ...

export async function generateStaticParams() {
    const fetchResult = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a');
    const posts = await fetchResult.json();
    return posts.drinks.map(post => {
        return {
            params: {
                id: post.idDrink.toString()
            }
        }
    });

}

async function getPost(id) {
    const fetchResult = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`, {
        next: {
            revalidate: 3600    // seconds
        }
    });
    console.log(fetchResult)
    if (!fetchResult) {
        console.log("not found 1");
        notFound();
    }

    const data = await fetchResult.json();
    console.log(data)
    if (!data) {
        console.log("not found 2");
        notFound();
    }
   return data.drinks[0];
}

export default async function PostDetails({params}) {

    console.log("in post")
    const post = await getPost(params.id);
    console.log("IN POST", post)
    console.log(post.strDrink)
    return (
        <div>
            <h1>Post Details</h1>
            <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                    <h1>{post.strDrink}</h1>
                    <img src={post.strDrinkThumb} alt="drink" width={'250px'}></img>
                    <h3>Specs</h3>
                    <p>Type: {post.strCategory} {post.strIBA}</p>
                    <p>Alcoholic: {post.strAlcoholic}</p>
                    <p>Glass Type: {post.strGlass}</p>
                    <h3>Ingredients</h3>
                    <p>{post.strIngredient1} {post.strMeasure1}</p>
                    <p>{post.strIngredient2} {post.strMeasure2}</p>
                    <p>{post.strIngredient3} {post.strMeasure3}</p>
                    <p>{post.strIngredient4} {post.strMeasure4}</p>
                    <p>{post.strIngredient5} {post.strMeasure5}</p>
                    <p>{post.strIngredient6} {post.strMeasure6}</p>
                    <p>{post.strIngredient7} {post.strMeasure7}</p>
                    <p>{post.strIngredient8} {post.strMeasure8}</p>
                    <p>{post.strIngredient9} {post.strMeasure9}</p>
                    <p>{post.strIngredient10} {post.strMeasure10}</p>
                    <p>{post.strIngredient11} {post.strMeasure11}</p>
                    <p>{post.strIngredient12} {post.strMeasure12}</p>
                    <h3>Instructions</h3>
                    <p>{post.strInstructions}</p>

                </div>
            </div>
            <BackButton></BackButton>
        </div>
    );
}