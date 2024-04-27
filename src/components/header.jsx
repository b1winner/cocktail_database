import Link from "next/link";

export const Header = () => {
    return (
        <header>
            <nav>
                <div className="nav-wrapper">
                    <Link href={'/'} className="brand-logo">Logo</Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><Link href="/">Index</Link></li>
                        <li><Link href="/users">Users Page</Link></li>
                        <li><Link href="/posts">Posts Page</Link></li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}