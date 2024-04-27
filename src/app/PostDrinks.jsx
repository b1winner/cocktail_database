import Link from "next/link";

async function getData() {

    //  intentionally slow down method
    await new Promise(resolve => setTimeout(resolve, 2000));

    const fetchResult = await fetch('www.thecocktaildb.com/api/json/v1/1/search.php?f=a');
    const data = await fetchResult.json();
    return data;
}

export default async function PostDrinks() {

    const data = await getData();
    console.log(data)
    let drinks = data.map((drink) => {
        return (<Link className="collection-item" key={drink.id} href={`/drinks/${drink.id}`}>{drink.title}</Link>)
    });
    let postData = drinks && drinks.length > 0 ? (<div className="collection">{drinks}</div>) : <h1>No Drinks Found</h1>;

    return (
        <>
            {postData}
        </>
    );
}