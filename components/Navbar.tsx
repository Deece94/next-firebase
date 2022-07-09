import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { useContext } from "react";
import { UserContext } from "../lib/context";

export default function Navbar() {
  const { user, username } = useContext(UserContext);

  return (
    <nav className="navbar navbar-expand bg-primary sticky-top mb-2">
      <div className="container-fluid">
        <ul className="navbar-nav">
          <li className="nav-item mx-2">
            <Link href="/">
              <button className="btn btn-dark my-auto">FEED</button>
            </Link>
          </li>
        </ul>

        <ul className="navbar-nav pull-right">
          {/** signed in */}
          {username && (
            <>
              <li className="nav-item mx-2 my-auto">
                <Link href="/admin">
                  <button className="btn btn-outline-light">Write Posts</button>
                </Link>
              </li>
              <li>
                <Link href={`/${username}`}>
                  <img
                    className="rounded-circle"
                    src={user.photoURL}
                    alt="logo"
                    height="50"
                    width="50"
                  />
                </Link>
              </li>
            </>
          )}

          {/** not signed in */}
          {!username && (
            <li className="nav-item mx-2">
              <Link href="/enter">
                <button
                  className="btn btn-outline-light"
                  onClick={() => toast.success("Logged in")}
                >
                  Log in
                </button>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
