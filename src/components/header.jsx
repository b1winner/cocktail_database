import Link from "next/link";

export const Header = () => {
    return (
        <header>
            <nav>
                <div className="nav-wrapper">
                    <Link href={'/'} className="brand-logo">Drink Finder</Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><Link href="/">Home</Link></li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}