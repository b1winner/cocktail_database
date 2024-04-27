import Link from "next/link";

const NotFound = () => {
    return (
        <div>
            <h1>Post Not Found</h1>
            <p>We don't have the post</p>
            <Link href={'/'}>Click here to return home.</Link>
        </div>
    );
}

export default NotFound;