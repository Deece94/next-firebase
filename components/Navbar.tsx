import Link from "next/link";
import Image from "next/image"

export default function Navbar()
{
    const user = false;
    const username = false;

    return(
        <nav className="navbar navbar-expand bg-primary sticky-top mb-2">
            <div className="container-fluid">
                <ul className="navbar-nav">
                    <li className="nav-item mx-2">
                        <Link href="/">
                            <button className="btn btn-dark">FEED</button>
                        </Link>
                    </li>
                </ul>

                <ul className=" navbar-nav pull-right">
                    {/** signed in */}
                    {username && (
                        <>
                            <li className="nav-item mx-2">
                                <Link href="/admin">
                                    <button className="btn btn-outline-light">Write Posts</button>
                                </Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link href={`/${username}`}>
                                    <Image src={user?.photoURL} alt="user image" />
                                </Link>
                            </li>
                        </>
                    )}

                    {/** not signed in */}
                    {!username && (
                        <li className="nav-item mx-2">
                            <Link href="/enter">
                                <button className="btn btn-outline-light">Log in</button>
                            </Link>
                        </li>
                    )}


                </ul>
            </div>
           
        </nav>
    )
}
