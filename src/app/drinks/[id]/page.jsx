import BackButton from "../../../components/BackButton";
import {notFound} from "next/navigation";

//  needs to return:
//  [{id: 1}, {id: 2}, {id: 3}, ...
async function getAllData() {
    const urls = [
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a',
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=b',
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=c',
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=d',
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=e',
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=f',
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=g',
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=h',
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=i',
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=j',
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=k',
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=l',
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=m',
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=n',
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=o',
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=p',
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=q',
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=r',
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=s',
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=t',
        //'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=u', // no drinks
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=v',
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=w',
        //'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=x', // no drinks
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=y',
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=z'
    ];

    const fetchPromises = urls.map(url => fetch(url));
    const responses = await Promise.all(fetchPromises);
    const dataArrays = await Promise.all(responses.map(response => response.json()));
    // Combine all the JSON data into one array
    const combinedData = dataArrays.reduce((accumulator, currentData) => {
        return accumulator.concat(currentData.drinks);
    }, []);

    return combinedData;
}
export async function generateStaticParams() {
    //const fetchResult = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a');
    const posts = await getAllData();
    return posts.map(post => {
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