import Link from "next/link";

async function getData() {

    //  intentionally slow down method
    //await new Promise(resolve => setTimeout(resolve, 2000));

    const fetchResult = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a')
    const data = await fetchResult.json();
    return data;
}
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

export default async function PostDrinks() {

    const data = await getAllData();
    console.log(data)
    let drinks = data.map((drink) => {
        return (<Link className="collection-item" key={drink.idDrink} href={`/drinks/${drink.idDrink}`}>{drink.strDrink}</Link>)
    });
    let postData = drinks && drinks.length > 0 ? (<div className="collection">{drinks}</div>) : <h1>No Drinks Found</h1>;

    return (
        <>
            {postData}
        </>
    );
}