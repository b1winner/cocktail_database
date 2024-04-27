import Link from "next/link";

const NotFound = () => {
    return (
        <div>
            <h1>Drink Not Found :(</h1>
            <p>We don't know that one</p>
            <Link href={'/'}>Click here to return home.</Link>
        </div>
    );
}

export default NotFound;